import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'

const AdminUploadImagesForm = (props) => {
    const { handleSubmit, onChange, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="files">Upload files</label>
                <div>
                    <Field name="files"
                           component={InputWithValidation.renderFileField}
                           type="file"
                           placeholder="Upload files"
                           multiple="true"
                           accept="image/*"
                           onChange={onChange}/>
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
