import * as CORE_CONSTANTS from '../constants/Core'
import * as ADMIN_CONSTANTS from '../constants/Admin'
import { CALL_API } from '../middleware/api'
import localForage from '../storage/localforage.config'
import { push } from 'react-router-redux';

export const doStuff = () => ({
    type: CONSTANTS.STUFF
});

function redirectToImageUploadUrl(redirectId) {
    return `/admin/upload/bakery/${redirectId}`;
}

function redirectToAllBakery() {
    return "/bakery";
}

// Fetches user information data from Express session, if request fails then user is not authenticated.
// Relies on the custom API middleware defined in ../middleware/api.js.
function bulkUploadImagesAction(data) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.POST,
            body: data,
            types: [
                ADMIN_CONSTANTS.ADMIN_BULK_UPLOAD_REQUEST,
                ADMIN_CONSTANTS.ADMIN_BULK_UPLOAD_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_BULK_UPLOAD_FAILURE
            ],
            defaultHeaders: true,
            dontStringify: true,
            endpoint: "/api/admin/upload/images"
            // redirect: function() {
            //     return redirectToAllBakery();
            // }
        }
    }
}

function bulkUpdateBakeryAction(data) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.PUT,
            body: data,
            types: [
                ADMIN_CONSTANTS.ADMIN_BULK_UDATE_BAKERY_REQUEST,
                ADMIN_CONSTANTS.ADMIN_BULK_UDATE_BAKERY_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_BULK_UDATE_BAKERY_FAILURE
            ],
            endpoint: "/api/bakery",
            redirect: function() {
                return redirectToAllBakery();
            }
        }
    }
}

function createNewBasisAction(data) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.POST,
            body: data,
            types: [
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_BASIS_REQUEST,
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_BASIS_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_BASIS_FAILURE
            ],
            endpoint: "/api/basis"
        }
    }
}

function createNewFillingAction(data) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.POST,
            body: data,
            types: [
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_REQUEST,
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_FAILURE
            ],
            endpoint: "/api/filling"
        }
    }
}

function createNewIngredientAction(data) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.POST,
            body: data,
            types: [
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_INGREDIENT_REQUEST,
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_INGREDIENT_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_CREATE_NEW_FILLING_FAILURE
            ],
            endpoint: "/api/ingredients"
        }
    }
}

function getAllIngredients() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types : [
                ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_REQUEST,
                ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_GET_INGREDIENTS_FAILURE
            ],
            endpoint: "/api/ingredients"
        }
    }
}

function getAllFilling() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [
                ADMIN_CONSTANTS.ADMIN_GET_FILLING_REQUEST,
                ADMIN_CONSTANTS.ADMIN_GET_FILLING_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_GET_FILLING_FAILURE
            ],
            endpoint: "/api/filling"
        }
    }
}

function getAllBasis() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [
                ADMIN_CONSTANTS.ADMIN_GET_BASIS_REQUEST,
                ADMIN_CONSTANTS.ADMIN_GET_BASIS_SUCCESS,
                ADMIN_CONSTANTS.ADMIN_GET_BASIS_FAILURE
            ],
            endpoint: "/api/basis"
        }
    }
}

function shouldMakeAdminRequest(state) {
    const isFetching = state.isFetching;

    return isFetching !== true;
}

function setImagesFromLocalStorage(newImages, dispatch) {
    return localForage.setItem(ADMIN_CONSTANTS.KEY.LOCAL_FORAGE.BULK_UPLOAD_BAKERY, newImages).then(() => {
        dispatch({
            type: ADMIN_CONSTANTS.IMAGES_TO_LOCAL_STORAGE,
            payload: newImages
        });
    });
}

function removeImagesFromLocalStorage(dispatch) {
    return localForage.removeItem(ADMIN_CONSTANTS.KEY.LOCAL_FORAGE.BULK_UPLOAD_BAKERY).then(() => {
        dispatch({
            type: ADMIN_CONSTANTS.REMOVE_IMAGES_FROM_LOCAL_STORAGE
        });
    });
}

// Fetches user user from express api, unless is cached.
// Relies on Redux Thunk middleware.
export function bulkUploadImages(data) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.bakery)) {
            return dispatch(bulkUploadImagesAction(data))
        }
        return null;
    }
}

export function bulkUpdateBakery(data) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.bakery)) {
            return dispatch(bulkUpdateBakeryAction(data))
        }
        return null;
    }
}

export function createNewBasis(data) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.basis)) {
            return dispatch(createNewBasisAction(data))
        }
        return null;
    }
}

export function createNewFilling(data) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.filling)) {
            return dispatch(createNewFillingAction(data))
        }
        return null;
    }
}

export function createNewIngredient(data) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.ingredients)) {
            return dispatch(createNewIngredientAction(data))
        }
        return null;
    }
}

export function getIngredients() {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.ingredients)) {
            return dispatch(getAllIngredients())
        }
        return null;
    }
}

export function getFilling() {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.filling)) {
            return dispatch(getAllFilling())
        }
        return null;
    }
}

export function getBasis() {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.basis)) {
            return dispatch(getAllBasis())
        }
        return null;
    }
}

export function setCurrentIngredients(value) {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_INGREDIENTS,
            payload: value
        });
    }
}

export function setCurrentFilling(value) {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_FILLING,
            payload: value
        });
    }
}

export function setCurrentBasis(value) {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_BASIS,
            payload: value
        });
    }
}

export function setCurrentIngredientForCreationForm(ingredient) {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_INGREDIENT_FOR_CREATION_FORM,
            payload: ingredient
        });
    }
}

export function setCurrentFillingForCreationForm(filling) {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_FILLING_FOR_CREATION_FORM,
            payload: filling
        });
    }
}

export function setCurrentBasisForCreationForm(basis) {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_BASIS_FOR_CREATION_FORM,
            payload: basis
        });
    }
}

export function getImagesFromLocalStorage() {
    return (dispatch) => {
        return localForage.getItem(ADMIN_CONSTANTS.KEY.LOCAL_FORAGE.BULK_UPLOAD_BAKERY).then(value => {
            if (Array.isArray(value) && value.length > 0) {
                dispatch({
                    type: ADMIN_CONSTANTS.IMAGES_FROM_LOCAL_STORAGE,
                    payload: value
                });
            }
        });
    }
}

export function storeImagesAndRedirect(images) {
    return (dispatch) => {
        let redirectId = '';
        images.some(function(imageItem) {
            if (!imageItem.fileBlob) {
                redirectId = encodeURIComponent(imageItem.name);
                return true;
            }
        });

        setImagesFromLocalStorage(images, dispatch);

        dispatch(push(redirectToImageUploadUrl(redirectId)));
    }
}

export function redirectToBakery() {
    return (dispatch) => {
        dispatch(push(redirectToAllBakery()));
    }
}

export function removeImages() {
    return (dispatch) => {
        removeImagesFromLocalStorage(dispatch);
    }
}

export function clearCurrentStuff() {
    return (dispatch) => {
        dispatch({
            type: ADMIN_CONSTANTS.CLEAR_CURRENT_STUFF,
        });
    }
}

export function createIntermediateFileReaderObject(currentFileToCrop, nextFileIndex) {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_CONSTANTS.SET_CURRENT_FILE_TO_CROP,
            payload: {
                currentFileToCrop,
                nextFileIndex
            }
        });
    }
}

export function showIngredientsNewForm() {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_CONSTANTS.SHOW_INGREDIENTS_NEW_FORM
        });
    }
}

export function showFillingNewForm() {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_CONSTANTS.SHOW_FILLING_NEW_FORM
        });
    }
}

export function showBasisNewForm() {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_CONSTANTS.SHOW_BASIS_NEW_FORM
        });
    }
}

export function hideAllForms() {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_CONSTANTS.HIDE_ALL_FORMS
        });
    }
}

export function setNewDecor(currentDecor) {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CREATE_NEW_DECOR,
            payload: currentDecor
        });
    }
}
