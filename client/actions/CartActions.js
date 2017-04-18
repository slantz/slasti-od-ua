import { push } from 'react-router-redux';
import * as CORE_CONSTANTS from '../constants/Core'
import * as CART_CONSTANTS from '../constants/Cart'
import { CALL_API } from '../middleware/api'
import localForage from '../storage/localforage.config'

function shouldMakeAdminRequest(state) {
    const isFetching = state.isFetching;

    return isFetching !== true;
}

function getInquiryById(id) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [
                CART_CONSTANTS.CART_INQUIRY_GET_REQUEST,
                CART_CONSTANTS.CART_INQUIRY_GET_SUCCESS,
                CART_CONSTANTS.CART_INQUIRY_GET_FAILURE
            ],
            endpoint: `/api/inquiry/${id}`
        }
    }
}

export function getInquiryIdFromLocalStorage() {
    return (dispatch) => {
        return localForage.getItem(CART_CONSTANTS.CURRENT_INQUIRY_ID).then(value => {
            if (value && value.length > 0) {
                dispatch({
                    type: CART_CONSTANTS.CART_SET_CART_REDIRECT_ID,
                    payload: value
                });
            }
        });
    }
}

export function removeInquiryIdFromLocalStorage() {
    return (dispatch) => {
        return localForage.removeItem(CART_CONSTANTS.CURRENT_INQUIRY_ID).then(() => {
            dispatch({
                type: CART_CONSTANTS.CART_REMOVE_CART_REDIRECT_ID
            });
        });
    }
}

export function getInquiry(id) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().admin.inquiry)) {
            return dispatch(getInquiryById(id));
        }
        return null;
    }
}

export function setCartRedirectId(value) {
    return (dispatch) => {
        dispatch({
            type: CART_CONSTANTS.CART_SET_CART_REDIRECT_ID,
            payload: value
        });
    }
}

export function goToCartDetails(cartId) {
    return (dispatch) => {
        dispatch(push(`/cart/${cartId}`));
    }
}

export function goToOrder() {
    return (dispatch) => {
        dispatch(push('/order'));
    }
}
