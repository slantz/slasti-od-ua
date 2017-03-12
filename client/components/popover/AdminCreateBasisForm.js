import React from 'react'
import { Field, reduxForm } from 'redux-form'

const AdminCreateBasisForm = (props) => {
    const { handleSubmit, form } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="type">Create Basis Type</label>
                <div>
                    <Field name="type"
                           component="input"
                           type="text"
                           placeholder="Type"
                           validate={typeValidate}/>
                    <div className="error">{form && form.syncErrors && !form.syncErrors.type && <span>ERROR</span>}</div>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="composition">Create Basis Composition</label>
                <div>
                    <Field name="composition"
                           component="input"
                           type="text"
                           placeholder="Composition"
                           validate={compositionValidate}/>
                    <div className="error">{form && form.syncErrors && !form.syncErrors.composition && <span>ERROR</span>}</div>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Basis</button>
            </fieldset>
        </form>
    )
};

function stringValidator(value) {
    return !(!value || value.length === 0);
}

function typeValidate(value, allValue, props) {
    return stringValidator(value);
}

function compositionValidate(value, allValue, props) {
    return stringValidator(value);
}

export default reduxForm({
    form: 'admin-create-basis',
})(AdminCreateBasisForm)
