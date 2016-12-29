import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import App from './containers/App'
import Landing from './components/Landing'
import Info from './components/Info'

import { REQUIRE_LOGIN } from './middleware/auth'

// const newRoutes = (
//     <Route path="/" component={App}>
//         <IndexRedirect to="/catalog" />
//         <Route path="catalog" component={Catalog}>
//             <Route path="/:id" component={CatalogBakery} />
//         </Route>
//         <Route path="about" component={About} />
//         <Route path="cart" component={Cart} />
//         <Route path="admin" component={Admin} onEnter={REQUIRE_LOGIN}>
//             <Route path="update" component={AdminUpdate} />
//         </Route>
//     </Route>
// )



export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Landing}/>
        <Route path='info' component={Info} />
    </Route>
)
