import * as ADMIN_CONSTANTS from '../constants/Admin'
import localForage from '../storage/localforage.config'

export default function admin(state = {
    bakeryFilenames: [],
    isFetching: false
}, { type, payload }) {
    let assignedState;

    switch(type) {
        case ADMIN_CONSTANTS.SUCCESS:
            localForage.setItem(ADMIN_CONSTANTS.BULK_UPLOAD_BAKERY_FILENAMES, payload.bakeryFilenames);
            assignedState = Object.assign({}, state, {
                isFetching: false,
                bakeryFilenames: payload.bakeryFilenames
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
                bakeryFilenames: payload
            });
            break;
        default: assignedState = state
    }

    return assignedState;
}
