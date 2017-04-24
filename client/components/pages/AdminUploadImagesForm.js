import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'
import { ru_RU } from "../../constants/Translations";

const AdminUploadImagesForm = (props) => {
    const { onChange, pristine, submitting } = props;
    return (
        <form>
            <fieldset>
                <label htmlFor="files">{ru_RU['COMPONENT.PAGES.ADMIN.UPLOAD_IMAGES_FORM']}</label>
                <div>
                    <Field name="files"
                           component={InputWithValidation.renderFileField}
                           type="file"
                           placeholder={ru_RU['COMPONENT.PAGES.ADMIN.UPLOAD_IMAGES_FORM']}
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
