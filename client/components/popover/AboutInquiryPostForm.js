import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'

let AboutInquiryPostForm = (props) => {
    const { handleSubmit, setCurrentDate, setCurrentTime } = props;

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <Field name="name"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Name"
                       placeholder="Name"/>
            </fieldset>
            <fieldset>
                <Field name="email"
                       component={InputWithValidation.renderField}
                       type="email"
                       label="Email"
                       placeholder="Email"/>
            </fieldset>
            <fieldset>
                <Field name="phone"
                       component={InputWithValidation.renderField}
                       type="text"
                       label="Phone"
                       placeholder="Phone"/>
            </fieldset>
            <fieldset>
                <Field name="date"
                       component={InputWithValidation.renderDatePickerField}
                       label="Pick a date"
                       mode="landscape"
                       onChangeDate={setCurrentDate}/>
            </fieldset>
            <fieldset>
                <Field name="time"
                       component={InputWithValidation.renderTimePickerField}
                       hintText="Pick a suitable time"
                       formatTime="24hr"
                       okLabel="Ok"
                       cancelLabel="Cancel"
                       onChangeTime={setCurrentTime}/>
            </fieldset>
            <fieldset>
                <Field name="comment"
                       component={InputWithValidation.renderField}
                       type="text"
                       multiLine={true}
                       label="Comment"
                       placeholder="Comment"/>
            </fieldset>
            <fieldset>
                <button type="submit">Submit new Basis</button>
            </fieldset>
        </form>
    )
};

export default AboutInquiryPostForm = reduxForm({
    form: 'admin-inquiry-post',
    enableReinitialize: true,
    validate: InputWithValidation.validateInquiry,
    warn: InputWithValidation.warn
})(AboutInquiryPostForm);
