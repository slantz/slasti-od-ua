import * as CORE_CONSTANTS from '../constants/Core'
import * as ADMIN_CONSTANTS from '../constants/Admin'
import { CALL_API } from '../middleware/api'
import localForage from '../storage/localforage.config'
import { push } from 'react-router-redux';

export const doStuff = () => ({
    type: CONSTANTS.STUFF
});

function redirect(redirectId) {
    return `/admin/upload/bakery/${redirectId}`;
}

// Fetches user information data from Express session, if request fails then user is not authenticated.
// Relies on the custom API middleware defined in ../middleware/api.js.
function bulkUploadImagesAction(data) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.POST,
            body: data,
            types: [ ADMIN_CONSTANTS.REQUEST, ADMIN_CONSTANTS.SUCCESS, ADMIN_CONSTANTS.FAILURE ],
            endpoint: "/api/admin/upload/images",
            payload: {},
            redirect: function(response) {
                return redirect(response.bakery[0]._id);
            }
        }
    }
}

function shouldBulkUploadImages(state) {
    const isFetching = state.admin.isFetching;

    return isFetching !== true;
}

// Fetches user user from express api, unless is cached.
// Relies on Redux Thunk middleware.
export function bulkUploadImages(data) {
    return (dispatch, getState) => {
        if (shouldBulkUploadImages(getState())) {
            return dispatch(bulkUploadImagesAction(data))
        }
        return null;
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

export function setImagesFromLocalStorage(newImages) {
    return (dispatch) => {
        return localForage.setItem(ADMIN_CONSTANTS.KEY.LOCAL_FORAGE.BULK_UPLOAD_BAKERY, newImages).then(value => {
            dispatch({
                type: ADMIN_CONSTANTS.IMAGES_TO_LOCAL_STORAGE,
                payload: value
            });
        });
    }
}

export function storeImagesAndRedirect(images) {
    return (dispatch) => {
        let redirectId = images[0].name;

        images[0] = new File([new Blob()], "soska");

        setImagesFromLocalStorage(images);

        dispatch(push(redirect(redirectId)));
    }
}
