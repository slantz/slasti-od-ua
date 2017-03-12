import React from 'react'
import { Field, reduxForm } from 'redux-form'

const AdminCreateFillingForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="taste">Create Filling Taste</label>
                <div>
                    <Field name="taste"
                           component="input"
                           type="text"
                           placeholder="Taste"
                           validate={tasteValidate}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="composition">Create Filling Composition</label>
                <div>
                    <Field name="composition"
                           component="input"
                           type="text"
                           placeholder="Composition"
                           validate={compositionValidate}/>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Filling</button>
            </fieldset>
        </form>
    )
};

function stringValidator(value) {
    return !(!value || value.length === 0);
}

function tasteValidate(value, allValue, props) {
    return stringValidator(value);
}

function compositionValidate(value, allValue, props) {
    return stringValidator(value);
}

export default reduxForm({
    form: 'admin-create-filling'
})(AdminCreateFillingForm)
