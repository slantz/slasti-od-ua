import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as InputWithValidation from '../elements/InputWithValidation'
import { RaisedButton } from "material-ui";
import { Col, Grid, Row } from "react-flexbox-grid";

let AboutInquiryPostForm = (props) => {
    const { handleSubmit, setCurrentDate, setCurrentTime, defaultBakeForComment } = props;

    function getDefaultComment() {
        if (!defaultBakeForComment) {
            return "";
        }

        return `I liked this bakery ${defaultBakeForComment._id} for this ${defaultBakeForComment.event.type} event! Please advice me smth similar!`;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid fluid={true}>
                <Row middle="xs">
                    <Col xs={12} sm={6} md={4}>
                        <Field name="name"
                               component={InputWithValidation.renderField}
                               type="text"
                               label="Name"
                               placeholder="Name"/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="email"
                               component={InputWithValidation.renderField}
                               type="email"
                               label="Email"
                               placeholder="Email"/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="phone"
                               component={InputWithValidation.renderField}
                               type="text"
                               label="Phone"
                               placeholder="Phone"/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="date"
                               component={InputWithValidation.renderDatePickerField}
                               label="date"
                               mode="landscape"
                               onChangeDate={setCurrentDate}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="time"
                               component={InputWithValidation.renderTimePickerField}
                               hintText="suitable time"
                               formatTime="24hr"
                               okLabel="Ok"
                               cancelLabel="Cancel"
                               onChangeTime={setCurrentTime}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Field name="comment"
                               component={InputWithValidation.renderMultiLineField}
                               type="text"
                               label="Comment"
                               defaultValue={getDefaultComment()}
                               placeholder="Comment"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="i-margin_block_vertical_top">
                        <RaisedButton label="Submit new Basis" secondary={true} type="submit" />
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
