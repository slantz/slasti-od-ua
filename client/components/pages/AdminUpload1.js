import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AdminUploadImagesForm from './AdminUploadImagesForm'
import * as AdminActions from '../../actions/AdminActions'
import * as ADMIN_CONSTANTS from '../../constants/Admin'
import 'isomorphic-fetch'

class AdminUpload extends Component {
    constructor(props) {
        super(props)
    }

    bulkUploadImages = (data) => {
        const { AdminActions: { bulkUploadImages } } = this.props;
        bulkUploadImages(data);
    };

    /*
        TODO:
            1. handle cropping of images before sending them to the server
            2. create images from files uploaded to form
            3. send blob as form data instead of pure files
            4. blob should contain properties of original filename and name name
            5. after uploading cropped blobs to server proceed with popover flow by returning bakery models
            6. update bakery models afterwards
     */
    handleSubmit = () => {
        let formData = new FormData();

        Object
            .keys(this.props.form['admin-upload-images'].values.files)
            .forEach((key) => formData.append(
                ADMIN_CONSTANTS.KEY.API.IMAGES,
                this.props.form['admin-upload-images'].values.files[key],
                this.props.form['admin-upload-images'].values.files[key].name
            ));

        this.bulkUploadImages(formData);
    };

    render() {
        return (
            <section>
                <AdminUploadImagesForm
                    onSubmit={this.handleSubmit}
                    pristine={true}
                    submitting={false}/>
                {this.props.children}
            </section>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        form : state.form
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions : bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpload)
