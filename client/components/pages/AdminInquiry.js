import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import * as CORE_CONSTANTS from '../../constants/Core'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from "material-ui/RaisedButton";
import { ru_RU } from "../../constants/Translations";

class AdminInquiry extends Component {
    constructor(props) {
        super(props);
        this.tempPriceToUpdate = null;
    }

    getInquiry = () => {
        const { AdminActions: { getInquiry } } = this.props;
        return getInquiry();
    };

    setTempPriceToUpdate = (event, price) => {
        this.tempPriceToUpdate = price;
    };

    getInquiryElements = () => {
        let {
            admin : {
                inquiry
            }
        } = this.props;

        const style = {
            marginLeft: 20
        };

        return (
            <article>{inquiry.items.map((item, index) => {
                return <Card key={index} className={item.isResolved !== "CREATED" ? "c-color-background-primary-color-light" : "c-color-background-triad-yellow-from-primary"}>
                            <CardHeader
                                title={item.name}
                                titleColor={item.isResolved !== "CREATED" ? CORE_CONSTANTS.COLORS.alternateTextColor : CORE_CONSTANTS.COLORS.textColor}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardActions>
                                <RaisedButton label={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.UPDATE_PRICE']} primary={true} onTouchTap={() => this.updatePriceForInquiry(item)} disabled={item.isResolved === "RESOLVED" || item.isResolved === "CANCELLED"} />
                                <RaisedButton label={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.RESOLVE']} secondary={true} onTouchTap={() => this.resolve(item)} disabled={item.isResolved === "RESOLVED" || item.isResolved === "CANCELLED"} />
                            </CardActions>
                            <CardText expandable={true}>
                                <Paper zDepth={2}>
                                    <TextField hintText={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.PRICE']} style={style} underlineShow={false} defaultValue={item.price} onChange={this.setTempPriceToUpdate}/>
                                    <Divider />
                                    <TextField hintText={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.FIRST_NAME']} style={style} underlineShow={false} defaultValue={item.name} />
                                    <Divider />
                                    <TextField hintText={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.EMAIL']} style={style} underlineShow={false} defaultValue={item.email} />
                                    <Divider />
                                    <TextField hintText={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.PHONE']} style={style} underlineShow={false} defaultValue={item.phone} />
                                    <Divider />
                                    <TextField hintText={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.TIME_TO_CALL']} style={style} underlineShow={false} defaultValue={item.timeToCall} />
                                    <Divider />
                                    <TextField hintText={ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.COMMENT']} style={style} underlineShow={false} defaultValue={item.comment} />
                                    <Divider />
                                </Paper>
                            </CardText>
                        </Card>
            })}</article>
        )
    };

    resolve = (item) => {
        const { AdminActions: { resolveInquiry } } = this.props;

        if (item.isResolved === "RESOLVED" || item.isResolved === "CANCELLED") {
            return;
        }

        return resolveInquiry({
            id: item.id,
            isResolved: "RESOLVED"
        });
    };

    updatePriceForInquiry = (item) => {
        const { AdminActions: { updatePriceForInquiry } } = this.props;

        if (this.tempPriceToUpdate === null) {
            alert(ru_RU['COMPONENT.PAGES.ADMIN.INQUIRY.ALERT_UPDATE_PRICE_FIRST']);
        } else {
            return updatePriceForInquiry(item.id, this.tempPriceToUpdate).then(() => this.tempPriceToUpdate = null);
        }
    };

    componentWillMount() {
        this.getInquiry();
    }

    render() {
        return (
            <section id="sou-admin-inquiry">
                {this.getInquiryElements()}
            </section>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        admin : state.admin
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions : bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInquiry)
