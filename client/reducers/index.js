import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import core from './core'
import landing from './landing'
import info from './info'

export default combineReducers({
    core,
    landing,
    info,
    routing
})
