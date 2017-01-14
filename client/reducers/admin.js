import * as CONSTANTS from '../constants/Admin'
import localForage from '../storage/localforage.config'

export default function admin(state = {
    bakeryFilenames: [],
    isFetching: false
}, { type, payload }) {
    switch(type) {
        case CONSTANTS.SUCCESS:
            localForage.setItem('bulkUploadBakeryFilenames', payload.bakeryFilenames);
            return Object.assign({}, state, {
                isFetching: false,
                bakeryFilenames: payload.bakeryFilenames
            });
        case CONSTANTS.FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        default: return state
    }
}
