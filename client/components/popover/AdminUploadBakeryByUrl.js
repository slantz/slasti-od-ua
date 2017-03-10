import React, { Component } from 'react'
import ReactCrop from 'react-image-crop'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import * as ADMIN_CONSTANTS from '../../constants/Admin'

class AdminUploadBakeryByUrl extends Component {
    constructor(props) {
        super(props)
    }

    bulkUploadImages = (images) => {
        const { AdminActions: { bulkUploadImages }} = this.props;
        let formData = new FormData();

        images.forEach((image) => formData.append(
            ADMIN_CONSTANTS.KEY.API.IMAGES,
            image.fileBlob,
            image.fileBlob.name
        ));

        bulkUploadImages(formData);
    };

    submitAndGoToNextImage = () => {
        const { admin: { bakery, nextFileIndex }, AdminActions: { storeImagesAndRedirect, removeImages }} = this.props;
        let modifiedBakery = bakery.map(function(bakeryItem, index){
            if (index == tempCroppedFile.index) {
                return {
                    fileBlob: tempCroppedFile.file
                };
            } else {
                return bakeryItem;
            }
        });
        if (!tempCroppedFile) {
            alert('please crop an image first');
            return;
        }
        if (bakery[nextFileIndex + 1]) {
            return storeImagesAndRedirect(modifiedBakery);
        }
        removeImages();
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
        let { admin: { bakery, currentFileToCrop } } = this.props;
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

    componentDidMount() {
        let { admin: { bakery } } = this.props;

        if (Array.isArray(bakery) && bakery.length == 0) {
            this.getImagesFromLocalStorage();
        }
    }

    componentWillReceiveProps(newProps) {
        let { admin: { currentFileToCrop, bakery } } = newProps;

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
        let { admin: { bakery, currentFileToCrop, nextFileIndex } } = this.props;
        let isNextItem = false;

        if (currentFileToCrop) {
            isNextItem = (nextFileIndex < (bakery.length - 1));
        }

        return (
            <article id="sou-catalog-bulk-images-uploaded">
                {currentFileToCrop && <section style={{'max-width': '500px', 'height': 'auto'}}>
                    <button
                        onClick={this.submitAndGoToNextImage}>Submit {isNextItem && <span>and go to next image</span>}</button>
                    <ReactCrop src={currentFileToCrop.target.result} crop={{aspect: 4/3}} onComplete={this.cropImage}/>
                    <canvas id="canvas111" style={{'max-width': '500px', 'height': 'auto'}}></canvas>
                </section>}
            </article>
        )
    }
}

let tempCroppedFile = null;

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        admin: state.admin
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
