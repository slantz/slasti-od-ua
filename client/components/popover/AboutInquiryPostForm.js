import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'
import { RaisedButton } from "material-ui";
import { Col, Grid, Row } from "react-flexbox-grid";
import { ru_RU } from "../../constants/Translations";
import { API_ROOT } from "../../constants/Core";

let AboutInquiryPostForm = (props) => {
    const { handleSubmit, setCurrentDate, setCurrentTime, defaultBakeForComment } = props;

    function getDefaultComment() {
        if (!defaultBakeForComment) {
            return "";
        }

        return `${ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.I_LIKED_THIS_BAKERY']} [${API_ROOT}/bakery/${defaultBakeForComment._id}] ${ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.FOR_THIS']} [${defaultBakeForComment.event.type}] ${ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.ADVICE']}`;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid fluid={true}>
                <Row middle="xs">
                    <Col xs={12} sm={6} md={4}>
                        <Field name="name"
                               component={InputWithValidation.renderField}
                               type="text"
                               label={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.NAME']}
                               placeholder={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.NAME']}
                               placeholderAccusative={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.NAME_ACCUSATIVE']}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="email"
                               component={InputWithValidation.renderField}
                               type="email"
                               label={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.EMAIL']}
                               placeholder={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.EMAIL']}
                               placeholderAccusative={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.EMAIL_ACCUSATIVE']}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="phone"
                               component={InputWithValidation.renderField}
                               type="text"
                               label={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.PHONE']}
                               placeholder={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.PHONE']}
                               placeholderAccusative={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.PHONE_ACCUSATIVE']}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="date"
                               component={InputWithValidation.renderDatePickerField}
                               label={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.DATE']}
                               mode="landscape"
                               onChangeDate={setCurrentDate}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="time"
                               component={InputWithValidation.renderTimePickerField}
                               hintText={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.SUITABLE_TIME']}
                               formatTime="24hr"
                               onChangeTime={setCurrentTime}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="comment"
                               component={InputWithValidation.renderMultiLineField}
                               type="text"
                               label={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.COMMENT']}
                               defaultValue={getDefaultComment()}
                               placeholder={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.COMMENT']}
                               placeholderAccusative={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.COMMENT_ACCUSATIVE']}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="i-margin_block_vertical_top">
                        <RaisedButton label={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.SUBMIT']} secondary={true} type="submit" />
                    </Col>
                </Row>
            </Grid>
        </form>
    )
};

export default AboutInquiryPostForm = reduxForm({
    form: 'admin-inquiry-post',
    enableReinitialize: true,
    validate: InputWithValidation.validateInquiry,
    warn: InputWithValidation.warn
})(AboutInquiryPostForm);
