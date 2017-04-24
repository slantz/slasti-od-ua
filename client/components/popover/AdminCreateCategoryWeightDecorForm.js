import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select';
import * as InputWithValidation from '../elements/InputWithValidation'
import { ru_RU } from "../../constants/Translations";

let AdminCreateCategoryWeightDecorForm = (props) => {
    const { handleSubmit, onSetCurrentDecor, currentDecor } = props;

    return (
        <form onSubmit={ handleSubmit }>
            <Field name="category"
                   component={InputWithValidation.renderField}
                   type="text"
                   label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.CATEGORY']}
                   placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.CATEGORY']}
                   required/>
            <Field name="name"
                   component={InputWithValidation.renderField}
                   type="text"
                   label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.NAME']}
                   placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.NAME']}
                   required/>
            <Field name="description"
                   component={InputWithValidation.renderField}
                   type="text"
                   label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.DESCRIPTION']}
                   placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.DESCRIPTION']}
                   required/>
            <Field name="weight"
                   component={InputWithValidation.renderField}
                   type="number"
                   label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.WEIGHT']}
                   placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.WEIGHT']}/>
            <Field name="numberOfPieces"
                   component={InputWithValidation.renderField}
                   type="number"
                   label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.NUMBER_OF_PIECES']}
                   placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.NUMBER_OF_PIECES']}/>
            <Select.Creatable
                name="decor"
                multi={true}
                value={currentDecor}
                options={[]}
                placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_CATEGORY.SELECT']}
                onChange={onSetCurrentDecor}
            />
        </form>
    )
};

AdminCreateCategoryWeightDecorForm = reduxForm({
    form: 'admin-create-category-weight-decor',
    enableReinitialize: true,
    validate: InputWithValidation.validateCategoryWeightDecor,
    warn: InputWithValidation.warn
})(AdminCreateCategoryWeightDecorForm);

AdminCreateCategoryWeightDecorForm = connect(
    state => ({
        initialValues: state.admin.bakeryItem.item // pull initial values from account reducer
    })
)(AdminCreateCategoryWeightDecorForm);

export default AdminCreateCategoryWeightDecorForm;
