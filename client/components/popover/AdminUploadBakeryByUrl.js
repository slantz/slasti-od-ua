import React, { Component } from 'react'
import ReactCrop from 'react-image-crop'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select';
import AdminCreateIngredientsForm from './AdminCreateIngredientsForm';
import AdminCreateFillingForm from './AdminCreateFillingForm';
import AdminCreateBasisForm from './AdminCreateBasisForm';
import * as AdminActions from '../../actions/AdminActions'
import * as ADMIN_CONSTANTS from '../../constants/Admin'

class AdminUploadBakeryByUrl extends Component {
    constructor(props) {
        super(props)
    }

    showIngredientsNewForm = () => {
        const { AdminActions: { showIngredientsNewForm } } = this.props;
        showIngredientsNewForm();
    };

    showFillingNewForm = () => {
        const { AdminActions: { showFillingNewForm } } = this.props;
        showFillingNewForm();
    };

    showBasisNewForm = () => {
        const { AdminActions: { showBasisNewForm } } = this.props;
        showBasisNewForm();
    };

    updateBakeryWithStuff = (images) => {
        const {
            admin: {
                bakery: {
                    bakery
                }
            },
            AdminActions: {
                removeImages,
                bulkUpdateBakery,
                clearCurrentStuff
            }
        } = this.props;

        let updatedBakery = bakery.map((bake) => {
            let updateBake = images.filter((image) => {
                return image.fileBlob.name === bake.originalName;
            })[0];

            bake.ingredients = updateBake.currentIngredients.map((currentIngredient) => currentIngredient._id);
            bake.filling = updateBake.currentFilling.map((currentFilling) => currentFilling._id);
            bake.basis = updateBake.currentBasis.map((currentBasis) => currentBasis._id);

            return bake;
        });

        let request = updatedBakery.reduce((bakeryWithStuff, updatedBake) => {
            bakeryWithStuff.bakeryWithStuff[updatedBake._id] = {
                ["basis"] : updatedBake.basis,
                ["filling"] : updatedBake.filling,
                ["ingredients"] : updatedBake.ingredients,
            };
            return bakeryWithStuff;
        }, {"bakeryWithStuff": {}});

        clearCurrentStuff();
        removeImages();
        bulkUpdateBakery(request);
    };

    bulkUploadImages = (images) => {
        const {
            AdminActions: {
                bulkUploadImages,
            }
        } = this.props;

        let formData = new FormData();

        images.forEach((image) => formData.append(
            ADMIN_CONSTANTS.KEY.API.IMAGES,
            image.fileBlob,
            image.fileBlob.name
        ));

        bulkUploadImages(formData).then(() => {
            this.updateBakeryWithStuff(images);
        });
    };

    submitAndGoToNextImage = () => {
        const {
            admin: {
                bakery: {
                    bakery
                },
                ingredients: {
                    currentIngredients
                },
                filling: {
                    currentFilling
                },
                basis: {
                    currentBasis
                },
                nextFileIndex
            },
            AdminActions: {
                storeImagesAndRedirect,
                clearCurrentStuff,
                hideAllForms
            }
        } = this.props;

        if (!tempCroppedFile) {
            alert('please crop an image first');
            return;
        }

        if (currentIngredients.length === 0) {
            return alert('Set at least one ingredient');
        }
        if (currentFilling.length === 0) {
            return alert('Set at least one filling');
        }
        if (currentBasis.length === 0) {
            return alert('Set at least one basis');
        }

        /**
         * TODO:
         * 1. there can be several ingredients or elements to be saved
         * current algorithm is simple, after form is successfully submitted call this submitAndGoToNextImage
         * method again, next form will be shown if needed, as this requires no arguments
         * after all are passed then submit or redirect
         * 2. form should be prefilled with new values.
         */

        let ingredientsToBeSaved = currentIngredients.filter((ingredient) => ingredient._id === ingredient.type);
        let fillingToBeSaved = currentFilling.filter((filling) => filling._id === filling.composition);
        let basisToBeSaved = currentBasis.filter((basis) => basis._id === basis.type);

        hideAllForms();

        if (ingredientsToBeSaved.length) {
            alert('save custom ingredients');
            return this.showIngredientsNewForm();
        }

        if (fillingToBeSaved.length) {
            alert('save custom filling');
            return this.showFillingNewForm();
        }

        if (basisToBeSaved.length) {
            alert('save custom basis');
            return this.showBasisNewForm();
        }

        let modifiedBakery = bakery.map(function(bakeryItem, index){
            if (index == tempCroppedFile.index) {
                return {
                    fileBlob: tempCroppedFile.file,
                    currentIngredients,
                    currentFilling,
                    currentBasis
                };
            } else {
                return bakeryItem;
            }
        });

        if (bakery[nextFileIndex + 1]) {
            tempCroppedFile = null;
            clearCurrentStuff();
            return storeImagesAndRedirect(modifiedBakery);
        }
        return this.bulkUploadImages(modifiedBakery);
    };

    getImagesFromLocalStorage = () => {
        const { AdminActions: { getImagesFromLocalStorage } } = this.props;
        getImagesFromLocalStorage();
    };

    createIntermediateFileReaderObject = (currentFileToCrop, nextFileIndex) => {
        const { AdminActions: { createIntermediateFileReaderObject } } = this.props;
        let reader = new FileReader();

        reader.readAsDataURL(currentFileToCrop);
        reader.onload = function(e) {
            createIntermediateFileReaderObject(e, nextFileIndex);
        };
    };

    cropImage = (crop, pixelCrop) => {
        let { admin: { bakery: {bakery}, currentFileToCrop } } = this.props;
        var loadedImg = new Image();
        loadedImg.src = currentFileToCrop.target.result;

        loadedImg.onload = function() {
            var imageWidth = loadedImg.naturalWidth;
            var imageHeight = loadedImg.naturalHeight;

            var cropX = (crop.x / 100) * imageWidth;
            var cropY = (crop.y / 100) * imageHeight;

            var cropWidth = (crop.width / 100) * imageWidth;
            var cropHeight = (crop.height / 100) * imageHeight;

            var canvas = document.getElementById('canvas111');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            var ctx = canvas.getContext('2d');



            ctx.drawImage(loadedImg, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            if (HTMLCanvasElement.prototype.toBlob) {
                console.info('It looks like Chrome now supports HTMLCanvasElement.toBlob.. time to uncomment some code!');
            }

            canvas.toBlob(function(blob) {
                bakery.some(function(bakeryItem, index) {
                    if (!bakeryItem.fileBlob) {
                        tempCroppedFile = {
                            file: new File([blob], bakeryItem.name),
                            index: index
                        };
                        return true;
                    }
                });
            });
        }
    };

    getIngredients = () => {
        const { AdminActions: { getIngredients } } = this.props;
        return getIngredients();
    };

    getFilling = () => {
        const { AdminActions: { getFilling } } = this.props;
        return getFilling();
    };

    getBasis = () => {
        const { AdminActions: { getBasis } } = this.props;
        return getBasis();
    };

    setCurrentIngredients = (value) => {
        const { AdminActions: { setCurrentIngredients } } = this.props;
        return setCurrentIngredients(value);
    };

    setCurrentFilling = (value) => {
        const { AdminActions: { setCurrentFilling } } = this.props;
        return setCurrentFilling(value);
    };

    setCurrentBasis = (value) => {
        const { AdminActions: { setCurrentBasis } } = this.props;
        return setCurrentBasis(value);
    };

    setCurrentIngredientForCreationForm = (ingredient) => {
        const { AdminActions: { createNewIngredient } } = this.props;
        createNewIngredient({
            ingredients: [{
                type: ingredient.type,
                taste: ingredient.taste,
                substance: ingredient.substance,
                price: ingredient.price
            }]
        }).then(() => this.submitAndGoToNextImage());
    };

    setCurrentFillingForCreationForm = (filling) => {
        const { AdminActions: { createNewFilling } } = this.props;
        createNewFilling({
            filling: [{
                taste: filling.taste,
                composition: filling.composition
            }]
        }).then(() => this.submitAndGoToNextImage());
    };

    setCurrentBasisForCreationForm = (basis) => {
        const { AdminActions: { createNewBasis } } = this.props;
        createNewBasis({
            basis: [{
                type: basis.type,
                composition: basis.composition
            }]
        }).then(() => this.submitAndGoToNextImage());
    };

    componentWillMount() {
        this.getIngredients();
        this.getFilling();
        this.getBasis();
    }

    componentDidMount() {
        let { admin: { bakery: { bakery } } } = this.props;

        if (Array.isArray(bakery) && bakery.length == 0) {
            this.getImagesFromLocalStorage();
        }
    }

    componentWillReceiveProps(newProps) {
        let { admin: { currentFileToCrop, bakery: { bakery } } } = newProps;

        if (!bakery.length) {
            return;
        }

        if (!currentFileToCrop) {
            let file = null;
            let tempIndex = null;

            if (bakery.length) {
                bakery.some(function(bakeryItem, index) {
                     if (!bakeryItem.fileBlob && !bakeryItem.imgUrl) {
                         file = bakeryItem;
                         tempIndex = index;
                         return true;
                     }
                     return false;
                });
                file && this.createIntermediateFileReaderObject(file, tempIndex);
            }
        }
    }

    render() {
        let {
            admin: {
                bakery: {
                    bakery
                },
                ingredients: {
                    ingredients,
                    currentIngredients
                },
                filling: {
                    filling,
                    currentFilling
                },
                basis: {
                    basis,
                    currentBasis
                },
                currentFileToCrop,
                nextFileIndex,
                ingredients_showCreateNewForm,
                filling_showCreateNewForm,
                basis_showCreateNewForm
            },
        } = this.props,
            isNextItem = false;

        if (currentFileToCrop) {
            isNextItem = (nextFileIndex < (bakery.length - 1));
        }

        return (
            <aside>
                <section id="sou-catalog-bulk-images-uploaded">
                    {currentFileToCrop &&
                        <article style={{'max-width': '500px', 'height': 'auto'}}>
                            <button onClick={this.submitAndGoToNextImage}>Submit {isNextItem && <span>and go to next image</span>}</button>
                            <ReactCrop src={currentFileToCrop.target.result} crop={{aspect: 4/3}} onComplete={this.cropImage}/>
                            <canvas
                                id="canvas111"
                                style={{'max-width': '500px', 'height': 'auto'}}>
                            </canvas>
                        </article>
                    }
                </section>
                <section>
                    <article>
                        <Select.Creatable
                            name="select-admin-upload-bakery-ingredients"
                            value={currentIngredients}
                            multi={true}
                            valueKey="_id"
                            labelKey="type"
                            options={ingredients}
                            onChange={this.setCurrentIngredients}
                        />
                    </article>
                    <article>
                        <Select.Creatable
                            name="select-admin-upload-bakery-filling"
                            value={currentFilling}
                            multi={true}
                            valueKey="_id"
                            labelKey="composition"
                            options={filling}
                            onChange={this.setCurrentFilling}
                        />
                    </article>
                    <article>
                        <Select.Creatable
                            name="select-admin-upload-bakery-basis"
                            value={currentBasis}
                            multi={true}
                            valueKey="_id"
                            labelKey="type"
                            options={basis}
                            onChange={this.setCurrentBasis}
                        />
                    </article>
                </section>
                {ingredients_showCreateNewForm &&
                    <section id="admin-create-new-ingredients-form">
                        <AdminCreateIngredientsForm onSubmit={this.setCurrentIngredientForCreationForm}/>
                    </section>
                }
                {filling_showCreateNewForm &&
                    <section id="admin-create-new-filling-form">
                        <AdminCreateFillingForm onSubmit={this.setCurrentFillingForCreationForm}/>
                    </section>
                }
                {basis_showCreateNewForm &&
                    <section id="admin-create-new-basis-form">
                        <AdminCreateBasisForm onSubmit={this.setCurrentBasisForCreationForm}/>
                    </section>
                }
            </aside>
        )
    }
}

let tempCroppedFile = null;

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        admin: state.admin,
        form: state.form
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUploadBakeryByUrl)
