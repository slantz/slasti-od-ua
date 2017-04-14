import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AboutActions from '../../actions/AboutActions'
import AboutInquiryPostForm from "../popover/AboutInquiryPostForm";
import { Link } from "react-router";

class About extends Component {
    constructor(props) {
        super(props)
    }

    setCurrentDate = (nullValue, date) => {
        const { AboutActions: { setCurrentDate } } = this.props;
        setCurrentDate(date)
    };

    setCurrentTime = (nullValue, time) => {
        const { AboutActions: { setCurrentTime } } = this.props;
        setCurrentTime(time)
    };

    setInquiryIdToLocalStorage = (id) => {
        const { AboutActions: { setInquiryIdToLocalStorage } } = this.props;
        setInquiryIdToLocalStorage(id)
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


        let inquiry = {
            name: formValues.name
        };

        if (formValues.email) {
            inquiry.email = formValues.email;
        }

        if (formValues.phone) {
            inquiry.phone = formValues.phone;
        }

        if (formValues.comment) {
            inquiry.comment = formValues.comment;
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

    getInquiryFormOrThxMessage = () => {
        const {
            about
        } = this.props;

        if (about.data.inquiry) {
            this.setInquiryIdToLocalStorage(about.data.inquiry.id);
            return <article>
                <h3>Thank you for your request!</h3>
                <Link to={`/cart/${about.data.inquiry.id}`}>Go to your order!</Link>
                <Link to="/bakery">Continue browsing</Link>
            </article>;
        } else {
            return <AboutInquiryPostForm onSubmit={this.postInquiry}
                                         setCurrentDate={this.setCurrentDate}
                                         setCurrentTime={this.setCurrentTime} />;
        }
    };

    render() {
        return (
            <article id="sou-about">
                {this.getInquiryFormOrThxMessage()}
            </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
