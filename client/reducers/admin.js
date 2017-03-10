import * as ADMIN_CONSTANTS from '../constants/Admin'
import localForage from '../storage/localforage.config'

export default function admin(state = {
    bakery: [],
    currentFileToCrop: null,
    nextFileIndex: null,
    isFetching: false
}, { type, payload }) {
    let assignedState;

    switch(type) {
        case ADMIN_CONSTANTS.SUCCESS:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                currentFileToCrop: null,
                bakery: payload.bakery,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.FAILURE:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.REQUEST:
            assignedState = Object.assign({}, state, {
                isFetching: true,
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.IMAGES_FROM_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                currentFileToCrop: null,
                bakery: payload,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.IMAGES_TO_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                currentFileToCrop: null,
                bakery: payload,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.SET_CURRENT_FILE_TO_CROP:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                bakery: state.bakery,
                currentFileToCrop: payload.currentFileToCrop,
                nextFileIndex: payload.nextFileIndex
            });
            break;
        case ADMIN_CONSTANTS.REMOVE_IMAGES_FROM_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                isFetching: false,
                bakery: [],
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        default: assignedState = state
    }

    return assignedState;
}
