import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'

let AdminCreateBasisForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="type"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Type"
                       placeholder="Type"/>
            </fieldset>
            <fieldset>
                <Field name="composition"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Composition"
                       placeholder="Composition"/>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Basis</button>
            </fieldset>
        </form>
    )
};

AdminCreateBasisForm = reduxForm({
    form: 'admin-create-basis',
    enableReinitialize: true,
    validate: InputWithValidation.validate,
    warn: InputWithValidation.warn
})(AdminCreateBasisForm);

AdminCreateBasisForm = connect(
    state => ({
        initialValues: UTIL.getFirstInitialValue(state.admin.basis.currentBasis, 'type')
    })
)(AdminCreateBasisForm);

export default AdminCreateBasisForm
