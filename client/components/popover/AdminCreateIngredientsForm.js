import React from 'react'
import { Field, reduxForm } from 'redux-form'

const AdminCreateIngredientsForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="type">Create Ingredient Type</label>
                <div>
                    <Field name="type"
                           component="input"
                           type="text"
                           placeholder="Type"
                           validate={typeValidate}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="taste">Create Ingredient Taste</label>
                <div>
                    <Field name="taste"
                           component="input"
                           type="text"
                           placeholder="Taste"
                           validate={tasteValidate}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="substance">Create Ingredient Substance</label>
                <div>
                    <Field name="substance"
                           component="input"
                           type="text"
                           placeholder="Substance"
                           validate={substanceValidate}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="price">Create Ingredient Price</label>
                <div>
                    <Field name="price"
                           component="input"
                           type="number"
                           placeholder="Price"
                           validate={priceValidate}/>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Ingredient</button>
            </fieldset>
        </form>
    )
};

function stringValidator(value) {
    return !(!value || value.length === 0);
}

function numberValidator(value) {
    return !(!value || value === 0);
}

function typeValidate(value, allValue, props) {
    return stringValidator(value);
}

function tasteValidate(value, allValue, props) {
    return stringValidator(value);
}

function substanceValidate(value, allValue, props) {
    return stringValidator(value);
}

function priceValidate(value, allValue, props) {
    return numberValidator(value);
}

export default reduxForm({
    form: 'admin-create-ingredient'
})(AdminCreateIngredientsForm)
