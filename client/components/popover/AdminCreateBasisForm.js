import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'
import { RaisedButton } from "material-ui";
import { ru_RU } from "../../constants/Translations";

let AdminCreateBasisForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="type"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_BASIS_FORM.TYPE']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_BASIS_FORM.TYPE']}/>
                <Field name="composition"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_BASIS_FORM.COMPOSITION']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_BASIS_FORM.COMPOSITION']}/>
            </fieldset>
            <fieldset>
                <RaisedButton primary={true} label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_BASIS_FORM.SUBMIT']} type="submit" />
            </fieldset>
        </form>
    )
};

AdminCreateBasisForm = reduxForm({
    form: 'admin-create-basis',
    enableReinitialize: true,
    validate: InputWithValidation.validateBasis,
    warn: InputWithValidation.warn
})(AdminCreateBasisForm);

AdminCreateBasisForm = connect(
    state => ({
        initialValues: UTIL.getFirstInitialValue(state.admin.basis.currentBasis, 'type')
    })
)(AdminCreateBasisForm);

export default AdminCreateBasisForm
