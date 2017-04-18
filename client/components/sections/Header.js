import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CoreActions from '../../actions/CoreActions'
import * as CartActions from '../../actions/CartActions'
import * as CORE_CONSTANTS from '../../constants/Core'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Nav from './Nav'
import { Divider } from "material-ui";

class Header extends Component {
    constructor(props) {
        super(props)
    }

    getInquiry = () => {
        const { cart, CartActions: { getInquiry } } = this.props;

        if (cart.cartRedirectId && cart.cartRedirectId.length > 0 && !cart.data.inquiry) {
            return getInquiry(cart.cartRedirectId);
        }
    };

    getInquiryIdFromLocalStorage = () => {
        const { CartActions: { getInquiryIdFromLocalStorage } } = this.props;
        return getInquiryIdFromLocalStorage();
    };

    goToCartDetails = () => {
        const { cart, CartActions: { goToCartDetails } } = this.props;
        return goToCartDetails(cart.cartRedirectId);
    };

    goToOrder = () => {
        const { CartActions: { goToOrder } } = this.props;
        return goToOrder();
    };

    loginWithVk = () => {
        window.location.href = '/auth/vk'
    };

    logoutCurrentUser = () => {
        const { CoreActions: { logoutCurrentUser } } = this.props;
        logoutCurrentUser();
    };

    compileLoginWithVkLink = () => {
        const { core: { user } } = this.props;

        if (user.payload.name) {
            return null;
        }

        return <ToolbarGroup lastChild={true} >
            <RaisedButton
                label="VK login"
                secondary={true}
                onTouchTap={this.loginWithVk} />
        </ToolbarGroup>;
    };

    greet = () => {
        const { core: { user }, cart } = this.props;

        if (!user.payload.name) {
            return null;
        }

        return (
            <ToolbarGroup className="sou-header__toolbar__greet" lastChild={true}>
                <ToolbarTitle text={`Greetings, ${user.payload.name}!`} />
                <ToolbarSeparator />
                <IconMenu
                    onTouchTap={this.getInquiry}
                    width={200}
                    iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationMenuIcon />
                        </IconButton>
                    }>
                    {cart.data.inquiry && <MenuItem primaryText={cart.data.inquiry.isResolved ? "My order is READY!" : "My order is in progress"} onTouchTap={this.goToCartDetails} />}
                    {!cart.data.inquiry && <MenuItem primaryText="Hey, maybe it's high time to place a new order?" onTouchTap={this.goToOrder} />}
                    <Divider />
                    <MenuItem primaryText="Logout" onTouchTap={this.logoutCurrentUser}/>
                </IconMenu>
            </ToolbarGroup>
        );
    };

    toggleHeaderSticky = (e) => {
        const { core: { isHeaderSticky }, CoreActions: { toggleHeaderSticky } } = this.props;
        let isStickyScrollTopPosition = e.target.body.scrollTop > 0;

        if (isStickyScrollTopPosition !== isHeaderSticky) {
            toggleHeaderSticky(isStickyScrollTopPosition);
        }
    };

    componentDidMount() {
        // window.addEventListener("scroll", this.toggleHeaderSticky);
        this.getInquiryIdFromLocalStorage();
    }

    render() {
        const { core: { user, isHeaderSticky }, segment } = this.props;

        return (
            <header role="banner" className="sou-header">
                <Toolbar className="sou-header__toolbar">
                    <ToolbarGroup className="sou-header__logo i-transit-all" firstChild={true}>
                        <img src="http://slasti.od.ua:3001/client/static/graphics/logo_big.png" height="45px" alt="Logo Slasti Od Ua"/>
                    </ToolbarGroup>
                    <ToolbarGroup className="sou-header__navigation_holder">
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
        core : state.core,
        cart: state.cart
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        CoreActions : bindActionCreators(CoreActions, dispatch),
        CartActions : bindActionCreators(CartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
