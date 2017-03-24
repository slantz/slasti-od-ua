import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'

let AdminCreateIngredientsForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="type">Create Ingredient Type</label>
                <div>
                    <Field name="type"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Type"
                           placeholder="Type"/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="taste">Create Ingredient Taste</label>
                <div>
                    <Field name="taste"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Taste"
                           placeholder="Taste"/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="substance">Create Ingredient Substance</label>
                <div>
                    <Field name="substance"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Substance"
                           placeholder="Substance"/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="price">Create Ingredient Price</label>
                <div>
                    <Field name="price"
                           component={InputWithValidation.renderField}
                           type="number"
                           label="Price"
                           placeholder="Price"/>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Ingredient</button>
            </fieldset>
        </form>
    )
};

AdminCreateIngredientsForm = reduxForm({
    form: 'admin-create-ingredient',
    enableReinitialize: true,
    validate: InputWithValidation.validateIngredients,
    warn: InputWithValidation.warn
})(AdminCreateIngredientsForm);

AdminCreateIngredientsForm = connect(
    state => ({
        initialValues: UTIL.getFirstInitialValue(state.admin.ingredients.currentIngredients, 'type')
    })
)(AdminCreateIngredientsForm);

export default AdminCreateIngredientsForm
