import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AdminUploadImagesForm from './AdminUploadImagesForm'
import * as AdminActions from '../../actions/AdminActions'
import 'isomorphic-fetch'

class AdminUpload extends Component {
    constructor(props) {
        super(props)
    }

    storeImagesAndRedirect = (images) => {
        const { AdminActions: { storeImagesAndRedirect } } = this.props;
        storeImagesAndRedirect(images);
    };

    componentWillReceiveProps(newProps) {
        let images = [];
        const { form, admin: { bakery: { bakery } } } = newProps;

        if (!bakery.length &&
            form['admin-upload-images'] &&
            form['admin-upload-images'].values &&
            form['admin-upload-images'].values.files &&
            form['admin-upload-images'].values.files.length > 0) {

            images = fileListToArrayConverter(form['admin-upload-images'].values.files);

            if (!areImagesUploaded()) {
                this.storeImagesAndRedirect(images);
                areImagesUploaded(images);
            }
        }
    }

    render() {
        return (
            <section>
                <AdminUploadImagesForm
                    onSubmit={dummyOnChangeHandlerForValidation}
                    pristine={true}
                    submitting={false}/>
                {this.props.children}
            </section>
        )
    }
}

let areImagesUploaded = areImagesAlreadyUploaded();

function areImagesAlreadyUploaded() {
    let images = [];
    return function(newImages) {
        if (!newImages) {
            return images.length !== 0;
        }

        images = newImages;
        return true;
    }
}

function dummyOnChangeHandlerForValidation() {}

function fileListToArrayConverter(fileList) {
    return Array.prototype.slice.call(fileList);
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        admin : state.admin,
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
