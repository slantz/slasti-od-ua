import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AboutActions from '../../actions/AboutActions'
import AboutInquiryPostForm from "../popover/AboutInquiryPostForm";
import { Link } from "react-router";
import { Col, Grid, Row } from "react-flexbox-grid";
import { RaisedButton } from "material-ui";
import { ru_RU } from "../../constants/Translations";

class Order extends Component {
    constructor(props) {
        super(props)
    }

    setCurrentDate = (nullValue, date) => {
        const { AboutActions: { setCurrentDate } } = this.props;
        setCurrentDate(date);
    };

    setCurrentTime = (nullValue, time) => {
        const { AboutActions: { setCurrentTime } } = this.props;
        setCurrentTime(time);
    };

    setInquiryIdToLocalStorage = (id) => {
        const { AboutActions: { setInquiryIdToLocalStorage } } = this.props;
        setInquiryIdToLocalStorage(id);
    };

    removeBakeryFromBakeDetails = () => {
        const { AboutActions: { removeBakeryFromBakeDetails } } = this.props;
        removeBakeryFromBakeDetails();
    };

    postInquiry = () => {
        const {
            about,
            form,
            AboutActions: {
                postInquiry
            }
        } = this.props;
        let formValues = form['admin-inquiry-post'].values;
        let registeredValues = form['admin-inquiry-post'].registeredFields;


        let inquiry = {
            name: formValues.name
        };

        if (formValues.email) {
            inquiry.email = formValues.email;
        }

        if (formValues.phone) {
            inquiry.phone = formValues.phone;
        }

        if (registeredValues.comment && document.querySelector('textarea[name="comment"]').value !== "") {
            inquiry.comment = document.querySelector('textarea[name="comment"]').value;
        }

        if (about.currentDate) {
            let timeToCall = new Date();

            timeToCall.setFullYear(about.currentDate.getFullYear(), about.currentDate.getMonth(), about.currentDate.getDate());

            timeToCall.setHours(0);
            timeToCall.setMinutes(0);
            timeToCall.setSeconds(0);

            if (about.currentTime) {
                 timeToCall.setHours(about.currentTime.getHours());
                 timeToCall.setMinutes(about.currentTime.getMinutes());
                 timeToCall.setSeconds(about.currentTime.getSeconds());
            }

            inquiry.timeToCall = timeToCall;
        } else if (about.currentTime) {
            let timeToCall = new Date();
            timeToCall.setTime(about.currentTime.getTime());

            inquiry.timeToCall = timeToCall;
        }

        postInquiry({inquiry});
    };

    getInquiryPageHeader = () => {
        const {
            about
        } = this.props;

        if (about.data.inquiry) {
            return <h2 className="i-center">{ru_RU['COMPONENT.PAGES.ORDER.YOUVE_JUST_PLACED_YOUR_ORDER']}</h2>;
        } else {
            return <h2 className="i-pad_block_horizontal_left i-margin_block_vertical_top_0">{ru_RU['COMPONENT.PAGES.ORDER.PLEASE_ENTER_YOUR_ORDER_DETAILS']}</h2>;
        }
    };

    getInquiryFormOrThxMessage = () => {
        const {
            about
        } = this.props;

        if (about.data.inquiry) {
            this.setInquiryIdToLocalStorage(about.data.inquiry.id);
            return (
                <Grid tagName="article" className="sou-about__ordered-holder i-center" fluid>
                    <Row middle="xs">
                        <Col xs={12}>
                            <h3>{ru_RU['COMPONENT.PAGES.ORDER.THANK_YOU_FOR_YOUR_REQUEST']}</h3>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <p>
                                        <Link to={`/cart/${about.data.inquiry.id}`}>
                                            <RaisedButton
                                                label={ru_RU['COMPONENT.PAGES.ORDER.GO_TO_YOUR_ORDER']}
                                                secondary={true} />
                                        </Link>
                                    </p>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <p>
                                        <Link to="/bakery">
                                            <RaisedButton
                                                label={ru_RU['COMPONENT.PAGES.ORDER.CONTINUE_BROWSING']}
                                                primary={true}/>
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            );
        } else {
            let defaultBakeForComment = null;

            if (about.bakeryFromBakeDetails !== null) {
                defaultBakeForComment = Object.assign({}, about.bakeryFromBakeDetails);
            }

            return <AboutInquiryPostForm onSubmit={this.postInquiry}
                                         setCurrentDate={this.setCurrentDate}
                                         setCurrentTime={this.setCurrentTime}
                                         defaultBakeForComment={defaultBakeForComment}/>;
        }
    };

    componentWillUnmount() {
        this.removeBakeryFromBakeDetails();
    }

    render() {
        const {
            about
        } = this.props;

        return (
            <section id="sou-order" className={about.data.inquiry ? "sou-order i-flex-page-vertical-header-footer" : "sou-order"}>
                {this.getInquiryPageHeader()}
                {this.getInquiryFormOrThxMessage()}
            </section>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        about: state.about,
        form: state.form
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AboutActions: bindActionCreators(AboutActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
