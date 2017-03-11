import * as ADMIN_CONSTANTS from '../constants/Admin'
import localForage from '../storage/localforage.config'

export default function admin(state = {
    bakery: {
        bakery: [],
        isFetching: false
    },
    ingredientsVault: {
        ingredients: [],
        isFetching: false
    },
    fillingVault: {
        filling: [],
        isFetching: false
    },
    basisVault: {
        basis: [],
        isFetching: false
    },
    currentFileToCrop: null,
    nextFileIndex: null,
}, { type, payload }) {
    let assignedState;

    switch(type) {
        case ADMIN_CONSTANTS.ADMIN_BULK_UPLOAD_SUCCESS:
            assignedState = Object.assign({}, state, {
                bakery: {
                    savedBakery: payload.bakery,
                    isFetching: false,
                    bakery: []
                },
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_BULK_UPLOAD_FAILURE:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false
                },
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_BULK_UPLOAD_REQUEST:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: true,
                    bakery: []
                },
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.IMAGES_FROM_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: payload
                },
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.IMAGES_TO_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: payload
                },
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.SET_CURRENT_FILE_TO_CROP:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: state.bakery.bakery
                },
                currentFileToCrop: payload.currentFileToCrop,
                nextFileIndex: payload.nextFileIndex
            });
            break;
        case ADMIN_CONSTANTS.REMOVE_IMAGES_FROM_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: []
                },
                currentFileToCrop: null,
                nextFileIndex: null
            });
            break;
        default: assignedState = state
    }

    return assignedState;
}
