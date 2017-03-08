import React, { Component } from 'react'
import ReactCrop from 'react-image-crop'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'

class AdminUploadBakeryByUrl extends Component {
    constructor(props) {
        super(props)
    }

    submitAndGoToNextImage = (e) => {
        console.log(e);
        console.log(this.props);
    };

    getImagesFromLocalStorage = () => {
        const { AdminActions: { getImagesFromLocalStorage } } = this.props;
        getImagesFromLocalStorage();
    };

    setImagesToLocalStorage = (newImages) => {
        const { AdminActions: { setImagesToLocalStorage } } = this.props;
        setImagesToLocalStorage(newImages);
    };

    cropImage = (crop, pixelCrop) => {
        let { admin: { bakery } } = this.props;

        var loadedImg = new Image();
        loadedImg.src = 'http://slasti.od.ua:3001/client/static/images/' + bakery[0].imgUrl;

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
                var url = URL.createObjectURL(blob);

                console.log(blob);
                console.log(url);

                var file = new File([blob], "azaza");

                console.log(file);

                bakery[0].fileBlob = file;

            });
        }
    };

    componentDidMount() {
        let { admin: { bakery } } = this.props;

        if (Array.isArray(bakery) && bakery.length == 0) {
            this.getImagesFromLocalStorage();
        }
    }

    render() {
        let { admin: { bakery } } = this.props;

        console.log("----------")
        console.log(bakery)

        return (
            <article id="sou-catalog-bulk-images-uploaded">
                {bakery.map(function(filename, filenameIndex){
                    return <div key={filenameIndex}>
                        {filename._id}
                    </div>;
                })}
                {bakery.length && <section style={{'max-width': '500px', 'height': 'auto'}}>
                    <button
                        onClick={this.submitAndGoToNextImage}
                        disabled={!bakery[0].fileBlob}>Submit {bakery[1] && <span>and go to next image</span>}</button>
                    <ReactCrop src={'http://slasti.od.ua:3001/client/static/images/' + bakery[0].imgUrl} crop={{aspect: 4/3}} onComplete={this.cropImage}/>
                    <canvas id="canvas111" style={{'max-width': '500px', 'height': 'auto'}}></canvas>
                </section>}
            </article>
        )
    }
}

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