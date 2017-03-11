import React from 'react'
import { Field, reduxForm } from 'redux-form'

const AdminUploadImagesForm = (props) => {
    const { handleSubmit, onChange, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit} onChange={onChange}>
            <fieldset>
                <label htmlFor="files">Upload files</label>
                <div>
                    <Field name="files"
                           component="input"
                           type="file"
                           placeholder="Upload files"
                           multiple="true"
                           value="[object FileList]"
                           accept="image/*"/>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit" disabled={pristine || submitting}>Dummy submit</button>
            </fieldset>
        </form>
    )
};

export default reduxForm({
    form: 'admin-upload-images'  // a unique identifier for this form
})(AdminUploadImagesForm)
