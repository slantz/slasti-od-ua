import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as LANDING_CONSTANTS from '../constants/Landing'
import * as landingActions from '../actions/LandingActions'
import * as infoActions from '../actions/infoActions'
import * as coreActions from '../actions/coreActions'
import * as DOM_CONSTANTS from "../constants/Dom";

class App extends Component {
    constructor(props) {
        super(props)
    }

    getCurrentUser = () => {
        const { coreActions: { getCurrentUser } } = this.props;
        getCurrentUser()
    };

    componentWillMount() {
      this.getCurrentUser();
    }

    componentWillReceiveProps() {
        this.getCurrentUser();
    }

    render() {
        var path = this.props.location.pathname;
        var segment = path.split('/')[1] || LANDING_CONSTANTS.LANDING;

        return (
            <ReactCSSTransitionGroup id={DOM_CONSTANTS.ID_CSS_TRANSITION_GROUP}
                                     component="section"
                                     transitionName={
                                      {
                                        enter: 'js-move-in',
                                        enterActive: 'js-move-in-active',
                                        leave: 'js-move-away',
                                        leaveActive: 'js-move-away-active'
                                      }
                                     }
                                     transitionEnterTimeout={3000}
                                     transitionLeaveTimeout={3000}>
                {React.cloneElement(this.props.children, { key: segment })}
            </ReactCSSTransitionGroup>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user,
        info: state.info,
        landing: state.landing
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        coreActions: bindActionCreators(coreActions, dispatch),
        infoActions: bindActionCreators(infoActions, dispatch),
        landingActions: bindActionCreators(landingActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
