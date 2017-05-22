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
import { ru_RU } from "../../constants/Translations";
import { Link } from "react-router";
import { checkUserIsAdmin } from "../../middleware/auth";

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
        let redirectToIdLink = cart.cartRedirectId || cart.data.inquiry.id;

        return goToCartDetails(redirectToIdLink);
    };

    goToBakery = () => {
        const { CartActions: { goToBakery } } = this.props;
        return goToBakery();
    };

    goToAbout = () => {
        const { CartActions: { goToAbout } } = this.props;
        return goToAbout();
    };

    goToCart = () => {
        const { CartActions: { goToCart } } = this.props;
        return goToCart();
    };

    goToOrder = () => {
        const { CartActions: { goToOrder } } = this.props;
        return goToOrder();
    };

    goToAdmin = () => {
        const { CartActions: { goToAdmin } } = this.props;
        return goToAdmin();
    };

    loginWithVk = () => {
        window.location.href = '/auth/vk'
    };

    loginWithFb = () => {
        window.location.href = '/auth/fb'
    };

    logoutCurrentUser = () => {
        const { CoreActions: { logoutCurrentUser } } = this.props;
        logoutCurrentUser();
    };

    getAdminLink = (user) => {
        if (checkUserIsAdmin(user)) {
            return <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.ADMIN']} onTouchTap={this.goToAdmin} />;
        }
        return null;
    };

    compileLoginWithVkLink = () => {
        const { core: { user }, cart } = this.props;

        if (user.payload.name) {
            return null;
        }

        return (
            <ToolbarGroup className="sou-header__toolbar__login" lastChild={true} >
                <RaisedButton
                    label={ru_RU['COMPONENT.SECTIONS.HEADER.VK_LOGIN']}
                    secondary={true}
                    onTouchTap={this.loginWithVk} />
                <ToolbarSeparator />
                <RaisedButton
                    label={ru_RU['COMPONENT.SECTIONS.HEADER.FB_LOGIN']}
                    secondary={true}
                    onTouchTap={this.loginWithFb} />
                <ToolbarSeparator />
                <IconMenu
                    onTouchTap={this.getInquiry}
                    width={200}
                    iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationMenuIcon />
                        </IconButton>
                    }>
                    <div className="i-hide-medium-up">
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.BAKERY']} onTouchTap={this.goToBakery} />
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.ABOUT']} onTouchTap={this.goToAbout} />
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.CART']} onTouchTap={this.goToCart} />
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.ORDER']} onTouchTap={this.goToOrder} />
                        <Divider/>
                    </div>
                    {cart.data.inquiry && <MenuItem primaryText={cart.data.inquiry.isResolved !== "CREATED" ? ru_RU['COMPONENT.SECTIONS.HEADER.MY_ORDER_IS_READY'] : ru_RU['COMPONENT.SECTIONS.HEADER.MY_ORDER_IS_IN_PROGRESS']} onTouchTap={this.goToCartDetails} />}
                    {!cart.data.inquiry && <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MAYBE_PLACE_AN_ORDER']} onTouchTap={this.goToOrder} />}
                </IconMenu>
            </ToolbarGroup>
        );
    };

    greet = () => {
        const { core: { user }, cart } = this.props;

        if (!user.payload.name) {
            return null;
        }

        return (
            <ToolbarGroup className="sou-header__toolbar__greet" lastChild={true}>
                <ToolbarTitle text={`${ru_RU['COMPONENT.SECTIONS.HEADER.GREETINGS']}, ${user.payload.name}!`} />
                <ToolbarSeparator />
                <IconMenu
                    onTouchTap={this.getInquiry}
                    width={200}
                    iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationMenuIcon />
                        </IconButton>
                    }>
                    <div className="i-hide-medium-up">
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.BAKERY']} onTouchTap={this.goToBakery} />
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.ABOUT']} onTouchTap={this.goToAbout} />
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.CART']} onTouchTap={this.goToCart} />
                        <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MENU.ORDER']} onTouchTap={this.goToOrder} />
                        {this.getAdminLink(user)}
                        <Divider/>
                    </div>
                    {cart.data.inquiry && <MenuItem primaryText={cart.data.inquiry.isResolved !== "CREATED" ? ru_RU['COMPONENT.SECTIONS.HEADER.MY_ORDER_IS_READY'] : ru_RU['COMPONENT.SECTIONS.HEADER.MY_ORDER_IS_IN_PROGRESS']} onTouchTap={this.goToCartDetails} />}
                    {!cart.data.inquiry && <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.MAYBE_PLACE_AN_ORDER']} onTouchTap={this.goToOrder} />}
                    <Divider />
                    <MenuItem primaryText={ru_RU['COMPONENT.SECTIONS.HEADER.LOGOUT']} onTouchTap={this.logoutCurrentUser}/>
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
                        <Link to="/bakery" title={ru_RU['COMPONENT.SECTIONS.HEADER.GO_TO_HOME_PAGE']}>
                            <img src={`${CORE_CONSTANTS.GRAPHICS_ROOT}logo_big.png`} height="45px" alt="Logo Slasti Od Ua"/>
                        </Link>
                    </ToolbarGroup>
                    <ToolbarGroup className="sou-header__navigation_holder i-hide-medium-down">
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
