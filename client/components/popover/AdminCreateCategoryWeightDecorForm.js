import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select';
import * as InputWithValidation from '../elements/InputWithValidation'

let AdminCreateCategoryWeightDecorForm = (props) => {
    const { handleSubmit, onSetCurrentDecor, currentDecor } = props;

    return (
        <form onSubmit={ handleSubmit }>
            <fieldset>
                <label htmlFor="category">Add Category</label>
                <div>
                    <Field name="category"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Category"
                           placeholder="Category"
                           required/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="name">Add Name</label>
                <div>
                    <Field name="name"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Name"
                           placeholder="Name"
                           required/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Add Description</label>
                <div>
                    <Field name="description"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Description"
                           placeholder="Description"
                           required/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="weight">Add Weight</label>
                <div>
                    <Field name="weight"
                           component={InputWithValidation.renderField}
                           type="number"
                           label="Weight"
                           placeholder="Weight"/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="numberOfPieces">Add Number Of Pieces</label>
                <div>
                    <Field name="numberOfPieces"
                           component={InputWithValidation.renderField}
                           type="number"
                           label="Number Of Pieces"
                           placeholder="Number Of Pieces"/>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <Select.Creatable
                        name="decor"
                        multi={true}
                        value={currentDecor}
                        options={[]}
                        onChange={onSetCurrentDecor}
                    />
                </div>
            </fieldset>
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
