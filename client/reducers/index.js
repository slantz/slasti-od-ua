import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import core from './core'
import bakery from './bakery'
import cart from './cart'
import admin from './admin'
import about from './about'
import filter from './filter'

export default combineReducers({
    core,
    bakery,
    cart,
    admin,
    about,
    filter,
    routing,
    form
});
