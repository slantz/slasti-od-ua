import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'
import { RaisedButton } from "material-ui";

let AdminCreateIngredientsForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="type"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Type"
                       placeholder="Type"/>
                <Field name="taste"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Taste"
                       placeholder="Taste"/>
                <Field name="substance"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Substance"
                       placeholder="Substance"/>
                <Field name="price"
                       component={InputWithValidation.renderField}
                       type="number"
                       label="Price"
                       placeholder="Price"/>
            </fieldset>
            <fieldset>
                <RaisedButton label="Submit new Ingredient" primary={true} type="submit" />
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
