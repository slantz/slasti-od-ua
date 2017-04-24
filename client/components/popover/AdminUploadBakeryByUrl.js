import React, { Component } from 'react'
import ReactCrop from 'react-image-crop'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select';
import AdminCreateIngredientsForm from './AdminCreateIngredientsForm';
import AdminCreateFillingForm from './AdminCreateFillingForm';
import AdminCreateBasisForm from './AdminCreateBasisForm';
import AdminCreateCategoryWeightDecorForm from "./AdminCreateCategoryWeightDecorForm";
import * as AdminActions from '../../actions/AdminActions'
import * as ADMIN_CONSTANTS from '../../constants/Admin'
import * as CORE_CONSTANTS from '../../constants/Core'
import AdminCreateEventForm from "./AdminCreateEventForm";
import { Dialog, Divider, FlatButton } from "material-ui";
import { Col, Grid, Row } from "react-flexbox-grid";
import { ru_RU } from "../../constants/Translations";

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

    showEventNewForm = () => {
        const { AdminActions: { showEventNewForm } } = this.props;
        showEventNewForm();
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
            bake.event = updateBake.currentEvent._id;
            bake.category = updateBake.category;
            bake.name = updateBake.name;
            bake.description = updateBake.description;

            if (updateBake.weight) {
                bake.weight = updateBake.weight;
            } else {
                bake.weight = 0;
            }

            if (updateBake.numberOfPieces) {
                bake.numberOfPieces = updateBake.numberOfPieces;
            } else {
                bake.numberOfPieces = 1;
            }

            if (updateBake.decor) {
                bake.decor = updateBake.decor;
            } else {
                bake.decor = [];
            }

            if (updateBake.description.length) {
                bake.description = updateBake.description;
            } else {
                bake.description = "";
            }

            return bake;
        });

        let request = updatedBakery.reduce((bakeryWithStuff, updatedBake) => {
            bakeryWithStuff.bakeryWithStuff[updatedBake._id] = {
                ["basis"] : updatedBake.basis,
                ["event"] : updatedBake.event,
                ["filling"] : updatedBake.filling,
                ["ingredients"] : updatedBake.ingredients,
                ["category"] : updatedBake.category,
                ["name"] : updatedBake.name,
                ["description"] : updatedBake.description,
                ["decor"] : updatedBake.decor,
                ["weight"] : updatedBake.weight,
                ["numberOfPieces"] : updatedBake.numberOfPieces
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
                event: {
                    currentEvent
                },
                nextFileIndex,
                currentDecor
            },
            form,
            AdminActions: {
                storeImagesAndRedirect,
                clearCurrentStuff,
                hideAllForms
            }
        } = this.props;

        if (!tempCroppedFile) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.CROP_FIRST']);
            return;
        }

        if (currentIngredients.length === 0) {
            return alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SET_AT_LEAST_ONE_INGREDIENT']);
        }
        if (currentFilling.length === 0) {
            return alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SET_AT_LEAST_ONE_FILLING']);
        }
        if (currentBasis.length === 0) {
            return alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SET_AT_LEAST_ONE_BASIS']);
        }
        if (!currentEvent) {
            return alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SET_AT_LEAST_ONE_EVENT']);
        }

        let ingredientsToBeSaved = currentIngredients.filter((ingredient) => ingredient._id === ingredient.type);
        let fillingToBeSaved = currentFilling.filter((filling) => filling._id === filling.composition);
        let basisToBeSaved = currentBasis.filter((basis) => basis._id === basis.type);
        let eventToBeSaved = currentEvent;

        hideAllForms();

        if (ingredientsToBeSaved.length) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SAVE_CUSTOM_INGREDIENT']);
            return this.showIngredientsNewForm();
        }

        if (fillingToBeSaved.length) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SAVE_CUSTOM_FILLING']);
            return this.showFillingNewForm();
        }

        if (basisToBeSaved.length) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SAVE_CUSTOM_BASIS']);
            return this.showBasisNewForm();
        }

        if (eventToBeSaved._id === eventToBeSaved.type) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SAVE_CUSTOM_EVENT']);
            return this.showEventNewForm();
        }

        if (!form
            || !form['admin-create-category-weight-decor']
            || !form['admin-create-category-weight-decor'].values
            || !form['admin-create-category-weight-decor'].values.category) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SET_CATEGORY']);
            return;
        }

        if (!form
            || !form['admin-create-category-weight-decor']
            || !form['admin-create-category-weight-decor'].values
            || !form['admin-create-category-weight-decor'].values.name) {
            alert(ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.NAME']);
            return;
        }

        let modifiedBakery = bakery.map(function(bakeryItem, index){
            if (index === tempCroppedFile.index) {
                let newItem = {
                    fileBlob: tempCroppedFile.file,
                    currentIngredients,
                    currentFilling,
                    currentBasis,
                    currentEvent,
                    category: form['admin-create-category-weight-decor'].values.category,
                    name: form['admin-create-category-weight-decor'].values.name
                };

                if (currentDecor.length > 0) {
                    newItem.decor = currentDecor.map((decor) => decor.value);
                }

                if (form['admin-create-category-weight-decor'].values.weight) {
                    newItem.weight = form['admin-create-category-weight-decor'].values.weight;
                }

                if (form['admin-create-category-weight-decor'].values.numberOfPieces) {
                    newItem.numberOfPieces = form['admin-create-category-weight-decor'].values.numberOfPieces;
                }

                if (form['admin-create-category-weight-decor'].values.description) {
                    newItem.description = form['admin-create-category-weight-decor'].values.description;
                }

                return newItem;
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

    getEvents = () => {
        const { AdminActions: { getEvents } } = this.props;
        return getEvents();
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

    setCurrentEvent = (value) => {
        const { AdminActions: { setCurrentEvent } } = this.props;
        return setCurrentEvent(value);
    };

    setCurrentDecor = (decor) => {
        const { AdminActions: { setNewDecor } } = this.props;
        return setNewDecor(decor);
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

    setCurrentEventForCreationForm = (event) => {
        const { AdminActions: { createNewEvent } } = this.props;
        createNewEvent({
            event: {
                type: event.type
            }
        }).then(() => this.submitAndGoToNextImage());
    };

    getDialogSubmitAndGoToNextButton = (isNextItem) => {
        return (
            <FlatButton
                label={ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SUBMIT'] + (isNextItem ? (" " + ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.AND_GO_TO_NEXT_IMAGE']) : "")}
                primary={true}
                onTouchTap={this.submitAndGoToNextImage}
            />
        );
    };

    getDialogActions = (isNextItem) => {
        return [ this.getDialogSubmitAndGoToNextButton(isNextItem) ];
    };

    componentWillMount() {
        this.getIngredients();
        this.getFilling();
        this.getBasis();
        this.getEvents();
    }

    componentDidMount() {
        let { admin: { bakery: { bakery } } } = this.props;

        if (Array.isArray(bakery) && bakery.length === 0) {
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
                event: {
                    events,
                    currentEvent
                },
                currentDecor,
                currentFileToCrop,
                nextFileIndex,
                ingredients_showCreateNewForm,
                filling_showCreateNewForm,
                basis_showCreateNewForm,
                event_showCreateNewForm
            },
        } = this.props,
            isNextItem = false;

        if (currentFileToCrop) {
            isNextItem = (nextFileIndex < (bakery.length - 1));
        }

        return (
            <Dialog
                title={ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SET_ALL_BAKERY_DATA']}
                actions={this.getDialogActions(isNextItem)}
                modal={true}
                open={true}
                autoScrollBodyContent={true}
                bodyStyle={{'min-height': CORE_CONSTANTS.SIZES.ADMIN_UPLOAD_DIALOG_MIN_HEIGHT}}
            >
                <aside>
                    {currentFileToCrop &&
                        <Grid tagName="article" id="sou-catalog-bulk-images-uploaded" fluid={true}>
                            <Row>
                                <Col xs={12}>
                                    <ReactCrop src={currentFileToCrop.target.result} crop={{aspect: CORE_CONSTANTS.CROP_IMAGE_RATIO}} onComplete={this.cropImage}/>
                                    <canvas id="canvas111" className="i-none"></canvas>
                                </Col>
                            </Row>
                        </Grid>
                    }
                    {currentFileToCrop && <Divider/>}
                    <Grid tagName="article" fluid={true}>
                        <Row>
                            <Col xs={12}>
                                <Select.Creatable
                                    name="select-admin-upload-bakery-ingredients"
                                    value={currentIngredients}
                                    multi={true}
                                    valueKey="_id"
                                    labelKey="type"
                                    options={ingredients}
                                    placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SELECT_AN_INGREDIENT']}
                                    noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                                    onChange={this.setCurrentIngredients}
                                />
                            </Col>
                            <Col xs={12}>
                                <Select.Creatable
                                    name="select-admin-upload-bakery-filling"
                                    value={currentFilling}
                                    multi={true}
                                    valueKey="_id"
                                    labelKey="composition"
                                    options={filling}
                                    placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SELECT_AN_FILLING']}
                                    noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                                    onChange={this.setCurrentFilling}
                                />
                            </Col>
                            <Col xs={12}>
                                <Select.Creatable
                                    name="select-admin-upload-bakery-basis"
                                    value={currentBasis}
                                    multi={true}
                                    valueKey="_id"
                                    labelKey="type"
                                    options={basis}
                                    placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SELECT_AN_BASIS']}
                                    noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                                    onChange={this.setCurrentBasis}
                                />
                            </Col>
                            <Col xs={12}>
                                <Select.Creatable
                                    name="select-admin-upload-bakery-event"
                                    value={currentEvent}
                                    valueKey="_id"
                                    labelKey="type"
                                    options={events}
                                    addLabelText={ru_RU['COMPONENT.POPOVER.ADMIN_UPLOAD_BAKERY_BY_URL.SELECT_AN_EVENT']}
                                    noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                                    onChange={this.setCurrentEvent}
                                />
                            </Col>
                            <Col xs={12} id="admin-add-category-weight-decor-form">
                                <AdminCreateCategoryWeightDecorForm currentDecor={currentDecor}
                                                                    onSetCurrentDecor={this.setCurrentDecor}/>
                            </Col>
                            {ingredients_showCreateNewForm &&
                                <Col xs={12} id="admin-create-new-ingredients-form">
                                    <AdminCreateIngredientsForm onSubmit={this.setCurrentIngredientForCreationForm}/>
                                </Col>
                            }
                            {filling_showCreateNewForm &&
                            <Col xs={12} id="admin-create-new-filling-form">
                                <AdminCreateFillingForm onSubmit={this.setCurrentFillingForCreationForm}/>
                            </Col>
                            }
                            {basis_showCreateNewForm &&
                            <Col xs={12} id="admin-create-new-basis-form">
                                <AdminCreateBasisForm onSubmit={this.setCurrentBasisForCreationForm}/>
                            </Col>
                            }
                            {event_showCreateNewForm &&
                            <Col xs={12} id="admin-create-new-events-form">
                                <AdminCreateEventForm onSubmit={this.setCurrentEventForCreationForm}/>
                            </Col>
                            }
                        </Row>
                    </Grid>
                </aside>
            </Dialog>
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
