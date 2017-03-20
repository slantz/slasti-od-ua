import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'

let AdminCreateFillingForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="taste">Create Filling Taste</label>
                <div>
                    <Field name="taste"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Taste"
                           placeholder="Taste"/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="composition">Create Filling Composition</label>
                <div>
                    <Field name="composition"
                           component={InputWithValidation.renderField}
                           type="text"
                           label="Composition"
                           placeholder="Composition"/>
                </div>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Filling</button>
            </fieldset>
        </form>
    )
};

AdminCreateFillingForm = reduxForm({
    form: 'admin-create-filling',
    enableReinitialize: true,
    validate: InputWithValidation.validateFilling,
    warn: InputWithValidation.warn
})(AdminCreateFillingForm);

AdminCreateFillingForm = connect(
    state => ({
        initialValues: UTIL.getFirstInitialValue(state.admin.filling.currentFilling, 'composition')
    })
)(AdminCreateFillingForm);

export default AdminCreateFillingForm
