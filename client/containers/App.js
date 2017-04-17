import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal700} from 'material-ui/styles/colors';
import {teal500} from 'material-ui/styles/colors';
import {teal100} from 'material-ui/styles/colors';
import {white} from 'material-ui/styles/colors';
import {amber500} from 'material-ui/styles/colors';
import {grey900} from 'material-ui/styles/colors';
import {grey600} from 'material-ui/styles/colors';
import {grey400} from 'material-ui/styles/colors';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CoreActions from '../actions/CoreActions'
import * as BakeryActions from '../actions/BakeryActions'
import * as AdminActions from '../actions/AdminActions'
import * as AboutActions from '../actions/AboutActions'
import * as CartActions from '../actions/CartActions'
import * as DOM_CONSTANTS from "../constants/Dom";
import * as CORE_CONSTANTS from "../constants/Core";
import Header from "../components/sections/Header"
import Footer from "../components/sections/Footer";

class App extends Component {
    constructor(props) {
        super(props)
    }

    getCurrentUser = () => {
        const {CoreActions: {getCurrentUser}} = this.props;
        getCurrentUser()
    };

    muiTheme = getMuiTheme({
        fontFamily: 'Muli, Arial, sans-serif',
        palette: {
            primary1Color: CORE_CONSTANTS.COLORS.primary1Color,
            primary2Color: CORE_CONSTANTS.COLORS.primary2Color,
            primary3Color: CORE_CONSTANTS.COLORS.primary3Color,
            accent1Color: CORE_CONSTANTS.COLORS.accent1Color,
            accent2Color: CORE_CONSTANTS.COLORS.accent2Color,
            accent3Color: CORE_CONSTANTS.COLORS.accent3Color,
            textColor: CORE_CONSTANTS.COLORS.textColor,
            alternateTextColor: CORE_CONSTANTS.COLORS.alternateTextColor,
            borderColor: CORE_CONSTANTS.COLORS.borderColor,
        }
    });

    componentWillMount() {
        this.getCurrentUser();
    }

    componentWillReceiveProps() {
        this.getCurrentUser();
    }

    render() {
        let path,
            segment;

        path = this.props.location.pathname;
        segment = path.split('/')[1] || DOM_CONSTANTS.CLASS_BACK_IN_BLACK;

        return (
            <MuiThemeProvider muiTheme={this.muiTheme}>
                <ReactCSSTransitionGroup id={DOM_CONSTANTS.ID_CSS_TRANSITION_GROUP}
                                         component="section"
                                         transitionName={
                                             {
                                                 enter : 'js-move-in',
                                                 enterActive : 'js-move-in-active',
                                                 leave : 'js-move-away',
                                                 leaveActive : 'js-move-away-active'
                                             }
                                         }
                                         transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    <section id="sou-banner-content">
                        <Header segment={segment} />
                        {React.cloneElement(this.props.children, {key : segment})}
                    </section>
                    <Footer />
                </ReactCSSTransitionGroup>
            </MuiThemeProvider>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user : state.core.user,
        info : state.info,
        landing : state.landing
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        CoreActions : bindActionCreators(CoreActions, dispatch),
        BakeryActions : bindActionCreators(BakeryActions, dispatch),
        CartActions : bindActionCreators(CartActions, dispatch),
        AdminActions : bindActionCreators(AdminActions, dispatch),
        AboutActions : bindActionCreators(AboutActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
