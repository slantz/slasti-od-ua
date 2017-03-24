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
    currentDecor: [],
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
                    isFetching: false,
                    bakery: payload.bakery
                },
                currentFileToCrop: null,
                currentDecor: [],
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
                currentDecor: [],
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
                currentDecor: [],
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_BULK_UDATE_BAKERY_SUCCESS:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: payload.bakery
                },
                currentFileToCrop: null,
                currentDecor: [],
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_BULK_UDATE_BAKERY_FAILURE:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: false,
                    bakery: [],
                },
                currentFileToCrop: null,
                currentDecor: [],
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_BULK_UDATE_BAKERY_REQUEST:
            assignedState = Object.assign({}, state, {
                bakery: {
                    isFetching: true,
                    bakery: []
                },
                currentFileToCrop: null,
                currentDecor: [],
                nextFileIndex: null
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_SUCCESS:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: payload.ingredients,
                    currentIngredients: [],
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_FAILURE:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: [],
                    currentIngredients: [],
                    isFetching: false
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
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_FILLING_FAILURE:
            assignedState = Object.assign({}, state, {
                filling: {
                    filling: [],
                    currentFilling: [],
                    isFetching: false
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
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_GET_BASIS_FAILURE:
            assignedState = Object.assign({}, state, {
                basis: {
                    basis: [],
                    currentBasis: [],
                    isFetching: false
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
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_BASIS_SUCCESS:
            assignedState = Object.assign({}, state, {
                basis: {
                    basis: state.basis.basis.map((base) => {
                        if (base.type === payload.basis[0].type) {
                            return payload.basis[0];
                        }
                        return base;
                    }),
                    currentBasis: state.basis.currentBasis.map((base) => {
                        if (base.type === payload.basis[0].type) {
                            return payload.basis[0];
                        }
                        return base;
                    }),
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_BASIS_FAILURE:
            assignedState = Object.assign({}, state, {
                basis: {
                    basis: state.basis.basis,
                    currentBasis: state.basis.currentBasis,
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_BASIS_REQUEST:
            assignedState = Object.assign({}, state, {
                basis: {
                    basis: state.basis.basis,
                    currentBasis: state.basis.currentBasis,
                    isFetching: true
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_SUCCESS:
            assignedState = Object.assign({}, state, {
                filling: {
                    filling: state.filling.filling.map((filling) => {
                        if (filling.taste === payload.filling[0].taste) {
                            return payload.filling[0];
                        }
                        return filling;
                    }),
                    currentFilling: state.filling.currentFilling.map((filling) => {
                        if (filling.composition === payload.filling[0].composition) {
                            return payload.filling[0];
                        }
                        return filling;
                    }),
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_FAILURE:
            assignedState = Object.assign({}, state, {
                filling: {
                    filling: state.filling.filling,
                    currentFilling: state.filling.currentFilling,
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_REQUEST:
            assignedState = Object.assign({}, state, {
                filling: {
                    filling: state.filling.filling,
                    currentFilling: state.filling.currentFilling,
                    isFetching: true
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_INGREDIENT_SUCCESS:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: state.ingredients.ingredients.map((ingredient) => {
                        if (ingredient.type === payload.ingredients[0].type) {
                            return payload.ingredients[0];
                        }
                        return ingredient;
                    }),
                    currentIngredients: state.ingredients.currentIngredients.map((ingredient) => {
                        if (ingredient.type === payload.ingredients[0].type) {
                            return payload.ingredients[0];
                        }
                        return ingredient;
                    }),
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_INGREDIENT_FAILURE:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: state.ingredients.ingredients,
                    currentIngredients: state.ingredients.currentIngredients,
                    isFetching: false
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_INGREDIENT_REQUEST:
            assignedState = Object.assign({}, state, {
                ingredients: {
                    ingredients: state.ingredients.ingredients,
                    currentIngredients: state.ingredients.currentIngredients,
                    isFetching: true
                }
            });
            break;
        case ADMIN_CONSTANTS.ADMIN_CREATE_NEW_DECOR:
            assignedState = Object.assign({}, state, {
                currentDecor: payload
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
                currentDecor: [],
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
                currentDecor: [],
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
        case ADMIN_CONSTANTS.HIDE_ALL_FORMS:
            assignedState = Object.assign({}, state, {
                basis_showCreateNewForm: false,
                ingredients_showCreateNewForm: false,
                filling_showCreateNewForm: false,
            });
            break;
        case ADMIN_CONSTANTS.CLEAR_CURRENT_STUFF:
            assignedState = Object.assign({}, state, {
                filling: {
                    isFetching: false,
                    filling: state.filling.filling,
                    currentFilling: [],
                    showCreateNewForm: false
                },
                basis: {
                    isFetching: false,
                    basis: state.basis.basis,
                    currentBasis: [],
                    showCreateNewForm: false
                },
                ingredients: {
                    isFetching: false,
                    ingredients: state.ingredients.ingredients,
                    currentIngredients: [],
                    showCreateNewForm: false
                },
                currentDecor: []
            });
            break;
        default: assignedState = state
    }

    return assignedState;
}
