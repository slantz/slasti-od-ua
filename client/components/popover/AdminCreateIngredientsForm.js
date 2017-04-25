import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'
import { RaisedButton } from "material-ui";
import { ru_RU } from "../../constants/Translations";

let AdminCreateIngredientsForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="type"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.TYPE']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.TYPE']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.TYPE_ACCUSATIVE']}/>
                <Field name="taste"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.TASTE']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.TASTE']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.TASTE_ACCUSATIVE']}/>
                <Field name="substance"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.SUBSTANCE']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.SUBSTANCE']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.SUBSTANCE_ACCUSATIVE']}/>
                <Field name="price"
                       component={InputWithValidation.renderField}
                       type="number"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.PRICE']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.PRICE']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.PRICE_ACCUSATIVE']}/>
            </fieldset>
            <fieldset>
                <RaisedButton label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_INGREDIENTS_FORM.SUBMIT']} primary={true} type="submit" />
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
