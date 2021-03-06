import * as CORE_CONSTANTS from '../constants/Core'
import * as ABOUT_CONSTANTS from '../constants/About'
import * as CART_CONSTANTS from '../constants/Cart'
import { CALL_API } from '../middleware/api'
import localForage from '../storage/localforage.config'

function postAInquiry(inquiry) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.POST,
            body: inquiry,
            types: [
                ABOUT_CONSTANTS.ABOUT_INQUIRY_POST_REQUEST,
                ABOUT_CONSTANTS.ABOUT_INQUIRY_POST_SUCCESS,
                ABOUT_CONSTANTS.ABOUT_INQUIRY_POST_FAILURE
            ],
            endpoint: "/api/inquiry"
        }
    }
}

function shouldMakeAdminRequest(state) {
    return state.isFetching !== true;
}

export function setCurrentDate(date) {
    return (dispatch) => {
        return dispatch({
            type: ABOUT_CONSTANTS.ABOUT_SET_CURRENT_DATE,
            payload: date
        });
    }
}

export function setCurrentTime(time) {
    return (dispatch) => {
        return dispatch({
            type: ABOUT_CONSTANTS.ABOUT_SET_CURRENT_TIME,
            payload: time
        });
    }
}

export function postInquiry(inquiry) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().about.data)) {
            return dispatch(postAInquiry(inquiry));
        }
        return null;
    }
}

export function setInquiryIdToLocalStorage(id) {
    return (dispatch) => {
        return localForage.setItem(CART_CONSTANTS.CURRENT_INQUIRY_ID, id).then(() => {
            dispatch({
                type: CART_CONSTANTS.CART_SET_CART_REDIRECT_ID,
                payload: id
            });
        });
    }
}

export function setBakeryFromBakeDetails(bake) {
    return (dispatch) => {
        dispatch({
            type: ABOUT_CONSTANTS.SET_BAKERY_FROM_BAKE_DETAILS,
            payload: bake
        });
    }
}

export function removeBakeryFromBakeDetails() {
    return (dispatch) => {
        dispatch({
            type: ABOUT_CONSTANTS.REMOVE_BAKERY_FROM_BAKE_DETAILS
        });
    }
}
