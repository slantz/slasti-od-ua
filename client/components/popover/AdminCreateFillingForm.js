import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import * as UTIL from '../../util/util'
import { RaisedButton } from "material-ui";

let AdminCreateFillingForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="taste"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Taste"
                       placeholder="Taste"/>
                <Field name="composition"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Composition"
                       placeholder="Composition"/>
            </fieldset>
            <fieldset>
                <RaisedButton primary={true} label="Submit new Filling" type="submit" />
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
