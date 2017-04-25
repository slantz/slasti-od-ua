import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'
import { RaisedButton } from "material-ui";
import { ru_RU } from "../../constants/Translations";

let AdminCreateFillingForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="taste"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.TASTE']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.TASTE']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.TASTE_ACCUSATIVE']}/>
                <Field name="composition"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.COMPOSITION']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.COMPOSITION']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.COMPOSITION_ACCUSATIVE']}/>
            </fieldset>
            <fieldset>
                <RaisedButton primary={true} label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_FILLING_FORM.SUBMIT']} type="submit" />
            </fieldset>
        </form>
    )
};

AdminCreateFillingForm = reduxForm({
    form: 'admin-create-filling',
    enableReinitialize: true,
    validate: InputWithValidation.validateFilling,
    warn: InputWithValidation.warn
})(AdminCreateFillingForm);

AdminCreateFillingForm = connect(
    state => ({
        initialValues: UTIL.getFirstInitialValue(state.admin.filling.currentFilling, 'composition')
    })
)(AdminCreateFillingForm);

export default AdminCreateFillingForm
