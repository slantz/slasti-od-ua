import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import {Card, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import { Dialog, FlatButton } from "material-ui";
import { Link } from "react-router";
import Loader from "../elements/Loader";
import NoElement from "../elements/NoElement";
import { ru_RU } from "../../constants/Translations";

class AdminDelete extends Component {
    constructor(props) {
        super(props);
    }

    getBakeryById = () => {
        const {
            params,
            AdminActions: {
                getBakeryById
            }
        } = this.props;

        return getBakeryById(params.id);
    };

    deleteBakery = () => {
        const {
            params,
            AdminActions: {
                deleteBakery,
                redirectToBakery
            }
        } = this.props;

        return deleteBakery(params.id).then(redirectToBakery);
    };

    getDialogGoBackButton = () => {
        const { params } = this.props;

        return (
            <Link to={`/bakery/${params.id}`}>
                <FlatButton
                    label={ru_RU['COMPONENT.PAGES.ADMIN.DELETE.GO_BACK_TO_BAKERY']}
                    primary={true}
                />
            </Link>
        );
    };

    getDialogConfirmButton = () => {
        return (
            <FlatButton
                label={ru_RU['COMPONENT.PAGES.ADMIN.DELETE.CONFIRM']}
                primary={true}
                onTouchTap={this.deleteBakery}
            />
        );
    };

    getDialogActions = () => {
        return [ this.getDialogGoBackButton(), this.getDialogConfirmButton() ];
    };

    getConfirmDeleteDialog = () => {
        const { admin: { bakeryItem }} = this.props;

        if (bakeryItem.item === null) {
            if (bakeryItem.isFetching === true) {
                return <Loader/>;
            }

            return <NoElement/>;
        }

        return (
            <Dialog
                title={ru_RU['COMPONENT.PAGES.ADMIN.DELETE.DIALOG_TITLE']}
                actions={this.getDialogActions()}
                modal={true}
                open={true}
            >
                <Card>
                    <CardHeader
                        title={bakeryItem.item.name}
                        subtitle={bakeryItem.item._id}
                    />
                    <CardTitle title={bakeryItem.item.category} subtitle={bakeryItem.item.event ? bakeryItem.item.event.type : ''} />
                    <CardText>
                        {bakeryItem.item.description}
                    </CardText>
                </Card>
            </Dialog>
        );
    };

    componentWillMount() {
        this.getBakeryById();
    }

    render() {
        return (
            <section id="sou-admin-delete" className="sou-admin-delete">
                {this.getConfirmDeleteDialog()}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDelete)
