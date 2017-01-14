import React, { Component } from 'react'
import { Route, IndexRedirect } from 'react-router'
import { Router } from 'react-router'

import App from './containers/App'
import Catalog from './components/pages/Catalog'
import CatalogBakery from './components/pages/CatalogBakery'
import About from './components/pages/About'
import Cart from './components/pages/Cart'
import Admin from './components/pages/Admin'
import AdminUpdate from './components/pages/AdminUpdate'
import AdminUpload from './components/pages/AdminUpload1'
import AdminUploadInfoByUrl from './components/popover/AdminUploadInfoByUrl'

import { REQUIRE_LOGIN } from './middleware/auth'

export default class RTRouter extends Component {

    constructor() {
        super();
        // Configure routes here as this solves a problem with hot loading where
        // the routes are recreated each time.
        this.routes = (
            <Route path="/" component={App}>
                <IndexRedirect to="/catalog"/>
                <Route path="catalog" component={Catalog}>
                    <Route path=":id" component={CatalogBakery}/>
                </Route>
                <Route path="about" component={About}/>
                <Route path="cart" component={Cart}/>
                <Route path="admin" component={Admin} onEnter={(nextState, replace, callback) => { this.requireLogin(nextState, replace, callback) }}>
                    <Route path="update" component={AdminUpdate}/>
                    <Route path="upload" component={AdminUpload}>
                        <Route path="info/:url" component={AdminUploadInfoByUrl}/>
                    </Route>
                </Route>
            </Route>
        );
    }

    requireLogin = (nextState, replace, cb) => {
        REQUIRE_LOGIN(nextState, replace, cb, this.props.store);
    };

    render() {
        const { history } = this.props;
        const routes = this.routes;
        return (
            <Router history={ history } routes={ routes } />
        );
    }
}
