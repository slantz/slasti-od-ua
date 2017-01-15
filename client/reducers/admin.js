import * as ADMIN_CONSTANTS from '../constants/Admin'
import localForage from '../storage/localforage.config'

export default function admin(state = {
    bakery: [],
    isFetching: false
}, { type, payload }) {
    let assignedState;

    switch(type) {
        case ADMIN_CONSTANTS.SUCCESS:
            localForage.setItem(ADMIN_CONSTANTS.KEY.LOCAL_FORAGE.BULK_UPLOAD_BAKERY, payload.bakery);
            assignedState = Object.assign({}, state, {
                isFetching: false,
                bakery: payload.bakery
            });
            break;
        case ADMIN_CONSTANTS.FAILURE:
            assignedState = Object.assign({}, state, {
                isFetching: false
            });
            break;
        case ADMIN_CONSTANTS.REQUEST:
            assignedState = Object.assign({}, state, {
                isFetching: true
            });
            break;
        case ADMIN_CONSTANTS.IMAGES_FROM_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                bakery: payload
            });
            break;
        default: assignedState = state
    }

    return assignedState;
}
