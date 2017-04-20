import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'

const AdminUploadImagesForm = (props) => {
    const { onChange, pristine, submitting } = props;
    return (
        <form>
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
        </form>
    )
};

export default reduxForm({
    form: 'admin-upload-images'  // a unique identifier for this form
})(AdminUploadImagesForm)
