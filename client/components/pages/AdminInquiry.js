import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from "material-ui/RaisedButton";

class AdminInquiry extends Component {
    constructor(props) {
        super(props)
    }

    getInquiry = () => {
        const { AdminActions: { getInquiry } } = this.props;
        return getInquiry();
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
                let color = {};

                if (item.isResolved) {
                    color.backgroundColor = 'grey';
                }

                return <Card key={index} containerStyle={color}>
                            <CardHeader
                                title={item.name}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardActions>
                                <RaisedButton label="Reply or something" primary={true} />
                                <RaisedButton label="Resolve" secondary={true} onTouchTap={() => this.resolve(item)} />
                            </CardActions>
                            <CardText expandable={true}>
                                <Paper zDepth={2}>
                                    <TextField hintText="First name" style={style} underlineShow={false} defaultValue={item.name} />
                                    <Divider />
                                    <TextField hintText="Email" style={style} underlineShow={false} defaultValue={item.email} />
                                    <Divider />
                                    <TextField hintText="Phone" style={style} underlineShow={false} defaultValue={item.phone} />
                                    <Divider />
                                    <TextField hintText="Time to call" style={style} underlineShow={false} defaultValue={item.timeToCall} />
                                    <Divider />
                                    <TextField hintText="Comment" style={style} underlineShow={false} defaultValue={item.comment} />
                                    <Divider />
                                </Paper>
                            </CardText>
                        </Card>
            })}</article>
        )
    };

    resolve = (item) => {
        const { AdminActions: { resolveInquiry } } = this.props;
        return resolveInquiry(item._id);
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