import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CoreActions from '../../actions/CoreActions'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Nav from './Nav'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    loginWithVk = () => {
        window.location.href = '/auth/vk'
    };

    logoutCurrentUser = () => {
        const { CoreActions: { logoutCurrentUser } } = this.props;
        logoutCurrentUser();
    };

    compileLoginWithVkLink = () => {
        const { user } = this.props;

        if (user.payload.name) {
            return null;
        }

        return <ToolbarGroup lastChild={true} >
            <RaisedButton label="VK login" secondary={true} onTouchTap={this.loginWithVk} />
        </ToolbarGroup>;
    };

    greet = () => {
        const { user } = this.props;

        if (!user.payload.name) {
            return null;
        }

        return (
            <ToolbarGroup lastChild={true} style={{paddingLeft: '40px'}}>
                <ToolbarTitle text={`Greetings, ${user.payload.name}!`} />
                <ToolbarSeparator />
                <IconMenu
                    iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationMenuIcon />
                        </IconButton>
                    }>
                    <MenuItem primaryText="My order" />
                    <MenuItem primaryText="Logout" onTouchTap={this.logoutCurrentUser}/>
                </IconMenu>
            </ToolbarGroup>
        );
    };

    render() {
        const { user, segment } = this.props;

        return (
            <header role="banner">
                <Toolbar style={{'height': '48px'}}>
                    <ToolbarGroup firstChild={true}  style={{'flex': '1 auto'}}>
                        <Nav user={user} segment={segment} />
                    </ToolbarGroup>
                    {this.greet()}
                    {this.compileLoginWithVkLink()}
                </Toolbar>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.core.user
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        CoreActions : bindActionCreators(CoreActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
