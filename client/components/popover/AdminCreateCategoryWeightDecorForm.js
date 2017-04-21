import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select';
import * as InputWithValidation from '../elements/InputWithValidation'

let AdminCreateCategoryWeightDecorForm = (props) => {
    const { handleSubmit, onSetCurrentDecor, currentDecor } = props;

    return (
        <form onSubmit={ handleSubmit }>
            <Field name="category"
                   component={InputWithValidation.renderField}
                   type="text"
                   label="Category"
                   placeholder="Category"
                   required/>
            <Field name="name"
                   component={InputWithValidation.renderField}
                   type="text"
                   label="Name"
                   placeholder="Name"
                   required/>
            <Field name="description"
                   component={InputWithValidation.renderField}
                   type="text"
                   label="Description"
                   placeholder="Description"
                   required/>
            <Field name="weight"
                   component={InputWithValidation.renderField}
                   type="number"
                   label="Weight"
                   placeholder="Weight"/>
            <Field name="numberOfPieces"
                   component={InputWithValidation.renderField}
                   type="number"
                   label="Number Of Pieces"
                   placeholder="Number Of Pieces"/>
            <Select.Creatable
                name="decor"
                multi={true}
                value={currentDecor}
                options={[]}
                placeholder="Select a current decor"
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
