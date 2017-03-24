import React from 'react'
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

export default AdminCreateCategoryWeightDecorForm = reduxForm({
    form: 'admin-create-category-weight-decor',
    enableReinitialize: true,
    validate: InputWithValidation.validateCategoryWeightDecor,
    warn: InputWithValidation.warn
})(AdminCreateCategoryWeightDecorForm);
