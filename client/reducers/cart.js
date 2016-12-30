import * as CORE_CONSTANTS from '../constants/Core'

export default function cart(state = {}, { type }) {
    switch(type) {
        case CORE_CONSTANTS.CV:
            return Object.assign({}, state, {});
        default: return state
    }
}
