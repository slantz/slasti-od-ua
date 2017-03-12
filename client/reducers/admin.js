import * as ADMIN_CONSTANTS from '../constants/Admin'
import localForage from '../storage/localforage.config'

export default function admin(state = {
    bakery: {
        bakery: [],
        isFetching: false
    },
    ingredients: {
        ingredients: [],
        currentIngredients: [],
        isFetching: false
    },
    filling: {
        filling: [],
        currentFilling: [],
        isFetching: false
    },
    basis: {
        basis: [],
        currentBasis: [],
        isFetching: false
    },
    currentFileToCrop: null,
    nextFileIndex: null,
    ingredients_showCreateNewForm: false,
    filling_showCreateNewForm: false,
    basis_showCreateNewForm: false,
    ingredients_currentIngredientForCreationForm: null,
    ingredients_currentFillingForCreationForm: null,
    ingredients_currentBasisForCreationForm: null
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
                    isFetching: false,
                    bakery: [],
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
        case ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_SUCCESS:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: payload.ingredients,
                    currentIngredients: [],
                    isFetching: false,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_FAILURE:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: [],
                    currentIngredients: [],
                    isFetching: false,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_REQUEST:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    isFetching: true,
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_FILLING_SUCCESS:
            assignedState = Object.assign({}, state, {
                filling: {
                    filling: payload.filling,
                    currentFilling: [],
                    isFetching: false,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_FILLING_FAILURE:
            assignedState = Object.assign({}, state, {
                filling: {
                    filling: [],
                    currentFilling: [],
                    isFetching: false,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_FILLING_REQUEST:
            assignedState = Object.assign({}, state, {
                filling: {
                    isFetching: true,
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_BASIS_SUCCESS:
            assignedState = Object.assign({}, state, {
                basis: {
                    basis: payload.basis,
                    currentBasis: [],
                    isFetching: false,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_BASIS_FAILURE:
            assignedState = Object.assign({}, state, {
                basis: {
                    basis: [],
                    currentBasis: [],
                    isFetching: false,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_BASIS_REQUEST:
            assignedState = Object.assign({}, state, {
                basis: {
                    isFetching: true,
                }
            });
            break;
        case ADMIN_CONSTANTS.IMAGES_FROM_LOCAL_STORAGE:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: payload
                }
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
        case ADMIN_CONSTANTS.SET_CURRENT_INGREDIENTS:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    isFetching: false,
                    ingredients: state.ingredients.ingredients,
                    currentIngredients: payload,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.SET_CURRENT_FILLING:
            assignedState = Object.assign({}, state, {
                filling: {
                    isFetching: false,
                    filling: state.filling.filling,
                    currentFilling: payload,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.SET_CURRENT_BASIS:
            assignedState = Object.assign({}, state, {
                basis: {
                    isFetching: false,
                    basis: state.basis.basis,
                    currentBasis: payload,
                    showCreateNewForm: false
                }
            });
            break;
        case ADMIN_CONSTANTS.SHOW_INGREDIENTS_NEW_FORM:
            assignedState = Object.assign({}, state, {
                ingredients_showCreateNewForm: !state.ingredients_showCreateNewForm
            });
            break;
        case ADMIN_CONSTANTS.SHOW_FILLING_NEW_FORM:
            assignedState = Object.assign({}, state, {
                filling_showCreateNewForm: !state.filling_showCreateNewForm
            });
            break;
        case ADMIN_CONSTANTS.SHOW_BASIS_NEW_FORM:
            assignedState = Object.assign({}, state, {
                basis_showCreateNewForm: !state.basis_showCreateNewForm
            });
            break;
        default: assignedState = state
    }

    return assignedState;
}
