import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'

const AdminCreateBasisForm = (props) => {
    const { handleSubmit, form } = props;

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

export default reduxForm({
    form: 'admin-create-basis',
    validate: InputWithValidation.validate,
    warn: InputWithValidation.warn
})(AdminCreateBasisForm)
