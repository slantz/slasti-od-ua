import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import core from './core'
import catalog from './catalog'
import cart from './cart'
import admin from './admin'
import about from './about'

export default combineReducers({
    core,
    catalog,
    cart,
    admin,
    about,
    routing,
    form
});
