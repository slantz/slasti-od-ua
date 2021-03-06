import React, { Component } from 'react'
import { Route, IndexRedirect, Router } from 'react-router'

import App from './containers/App'
import Bakery from './components/pages/Bakery'
import BakeryDetails from './components/pages/BakeryDetails'
import About from './components/pages/About'
import Order from "./components/pages/Order";
import Cart from './components/pages/Cart'
import CartDetails from './components/pages/CartDetails'
import Admin from './components/pages/Admin'
import AdminUpdate from './components/pages/AdminUpdate'
import AdminDelete from "./components/pages/AdminDelete";
import AdminUpload from './components/pages/AdminUpload'
import AdminInquiry from './components/pages/AdminInquiry'
import AdminUploadBakeryByUrl from './components/popover/AdminUploadBakeryByUrl'

import { REQUIRE_ADMIN } from './middleware/auth';

export default class RTRouter extends Component {

    constructor() {
        super();
        // Configure routes here as this solves a problem with hot loading where
        // the routes are recreated each time.
        this.routes = (
            <Route path="/" component={App}>
                <IndexRedirect to="bakery"/>
                <Route path="bakery" component={Bakery}>
                    <Route path=":id" component={BakeryDetails}/>
                </Route>
                <Route path="about" component={About}/>
                <Route path="order" component={Order}/>
                <Route path="cart" component={Cart}>
                    <Route path=":id" component={CartDetails}/>
                </Route>
                <Route path="admin" component={Admin} onEnter={(nextState, replace, callback) => { this.requireAdmin(nextState, replace, callback) }}>
                    <Route path="update/:id" component={AdminUpdate}/>
                    <Route path="delete/:id" component={AdminDelete}/>
                    <Route path="upload" component={AdminUpload}>
                        <Route path="bakery/:url" component={AdminUploadBakeryByUrl}/>
                    </Route>
                    <Route path="inquiry" component={AdminInquiry}/>
                </Route>
            </Route>
        );
    }

    requireAdmin = (nextState, replace, cb) => {
        REQUIRE_ADMIN(nextState, replace, cb, this.props.store);
    };

    render() {
        const { history } = this.props;
        const routes = this.routes;
        return (
            <Router onUpdate={() => window.scrollTo(0, 0)} history={ history } routes={ routes } />
        );
    }
}
