import React from 'react'
import { Field, reduxForm } from 'redux-form'

const AdminUploadImagesForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="files">Upload files</label>
                <div>
                    <Field name="files" component="input" type="file" placeholder="Upload files" multiple="true" accept="image/*"/>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit" disabled={pristine || submitting}>Upload images</button>
            </fieldset>
        </form>
    )
};

export default reduxForm({
    form: 'admin-upload-images'  // a unique identifier for this form
})(AdminUploadImagesForm)