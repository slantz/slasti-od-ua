import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as AdminActions from '../../actions/AdminActions'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { ru_RU } from "../../constants/Translations";

class Admin extends Component {
    constructor(props) {
        super(props)
    }

    getRootElementStub = () => {
        const { children } = this.props;

        if (children === null) {
            return <section className="sou-admin__root-empty">{ru_RU['COMPONENT.PAGES.ADMIN.ROOT_EMPTY']}</section>;
        }

        return null;
    };

    render() {
        return (
            <section id="sou-admin" className="sou-admin">
                <Paper className="sou-admin__menu" zDepth={2} style={{'display': 'inline-block'}}>
                    <Menu>
                        <MenuItem leftIcon={<FileUpload />} children={<Link to="/admin/upload">{ru_RU['COMPONENT.PAGES.ADMIN.MENU.FILE_UPLOAD']}</Link>} />
                        <Divider />
                        <MenuItem leftIcon={<ShoppingCart />} children={<Link to="/admin/inquiry">{ru_RU['COMPONENT.PAGES.ADMIN.MENU.INQUIRIES']}</Link>} />
                        <Divider />
                    </Menu>
                </Paper>
                {this.getRootElementStub()}
                {this.props.children}
            </section>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
