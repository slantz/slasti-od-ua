import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import Catalog from './components/pages/Catalog'
import CatalogBakery from './components/pages/CatalogBakery'
import About from './components/pages/About'
import Cart from './components/pages/Cart'
import Admin from './components/pages/Admin'
import AdminUpdate from './components/pages/AdminUpdate'

import { REQUIRE_LOGIN } from './middleware/auth'

export const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/catalog"/>
        <Route path="catalog" component={Catalog}>
            <Route path="/:id" component={CatalogBakery}/>
        </Route>
        <Route path="about" component={About}/>
        <Route path="cart" component={Cart}/>
        <Route path="admin" component={Admin} onEnter={REQUIRE_LOGIN}>
            <Route path="update" component={AdminUpdate} onEnter={REQUIRE_LOGIN}/>
        </Route>
    </Route>
);
