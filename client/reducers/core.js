import * as c from '../constants/Core'

export default function core(state = {
    user: {
        payload: {},
        isFetching: false,
        status: null
    }
}, { type, payload }) {
    switch(type) {
        case c.INFO_SUCCESS:
            return Object.assign({}, state, {
                user: {
                    isFetching: false,
                    status: 'OK',
                    payload
                }
            })
        case c.INFO_FAILURE:
            return Object.assign({}, state, {
                user: {
                    isFetching: false,
                    status: 'UNAUTHORIZED',
                    payload: {}
                }
            })
        case c.INFO_REQUEST:
            return Object.assign({}, state, {
                user: {
                    isFetching: true,
                    status: null,
                    payload: {}
                }
            })
        default: return state
    }
}
