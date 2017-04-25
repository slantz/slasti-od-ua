import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import * as InputWithValidation from '../elements/InputWithValidation'
import { RaisedButton } from "material-ui";
import { ru_RU } from "../../constants/Translations";

let AdminCreateEventForm = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="type"
                       component={InputWithValidation.renderField}
                       type="text"
                       label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_EVENT_FORM.EVENT']}
                       placeholder={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_EVENT_FORM.EVENT']}
                       placeholderAccusative={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_EVENT_FORM.EVENT_ACCUSATIVE']}/>
            </fieldset>
            <fieldset>
                <RaisedButton primary={true} label={ru_RU['COMPONENT.POPOVER.ADMIN_CREATE_EVENT_FORM.SUBMIT']} type="submit" />
            </fieldset>
        </form>
    )
};

AdminCreateEventForm = reduxForm({
    form: 'admin-create-event',
    enableReinitialize: true,
    validate: InputWithValidation.validateBasis,
    warn: InputWithValidation.warn
})(AdminCreateEventForm);

AdminCreateEventForm = connect(
    state => ({
        initialValues: state.admin.event.currentEvent
    })
)(AdminCreateEventForm);

export default AdminCreateEventForm
