import { push } from 'react-router-redux';
import * as CORE_CONSTANTS from '../constants/Core'
import { CALL_API } from '../middleware/api'
import * as BAKERY_CONSTANTS from '../constants/Bakery'
import * as ABOUT_CONSTANTS from '../constants/About'

function shouldMakeAdminRequest(state) {
    return state.isFetching !== true;
}

function getAllBakery() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [
                BAKERY_CONSTANTS.BAKERY_GET_ALL_REQUEST,
                BAKERY_CONSTANTS.BAKERY_GET_ALL_SUCCESS,
                BAKERY_CONSTANTS.BAKERY_GET_ALL_FAILURE
            ],
            endpoint: `/api/bakery?noLimit=true`
        }
    }
}

function getMore(currentSkip) {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [
                BAKERY_CONSTANTS.BAKERY_ADD_MORE_REQUEST,
                BAKERY_CONSTANTS.BAKERY_ADD_MORE_SUCCESS,
                BAKERY_CONSTANTS.BAKERY_ADD_MORE_FAILURE
            ],
            endpoint: `/api/bakery?skip=${currentSkip}`
        }
    }
}

function getBakeryCount() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [
                BAKERY_CONSTANTS.BAKERY_COUNT_REQUEST,
                BAKERY_CONSTANTS.BAKERY_COUNT_SUCCESS,
                BAKERY_CONSTANTS.BAKERY_COUNT_FAILURE
            ],
            endpoint: `/api/bakery/count`
        }
    }
}

export function getBakery() {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().bakery.data)) {
            return dispatch(getAllBakery())
        }
        return null;
    }
}

export function getMoreBakery(currentSkip) {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().bakery.data)) {
            return dispatch(getMore(currentSkip))
        }
        return null;
    }
}

export function getCountAndLimit() {
    return (dispatch, getState) => {
        if (shouldMakeAdminRequest(getState().bakery.count)) {
            return dispatch(getBakeryCount())
        }
        return null;
    }
}

export function setCurrentSkip(currentSkip) {
    return (dispatch) => {
        dispatch({
            type: BAKERY_CONSTANTS.SET_CURRENT_SKIP,
            payload: currentSkip
        });
    }
}

export function toggleFilterVisibility() {
    return (dispatch) => {
        dispatch({
            type: BAKERY_CONSTANTS.TOGGLE_FILTER_VISIBILITY
        });
    }
}

export function goToOrderPageWithSomeDetails() {
    return (dispatch) => {
        dispatch(push('/order'));
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
