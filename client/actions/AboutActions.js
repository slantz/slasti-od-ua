import * as CORE_CONSTANTS from '../constants/Core'
import * as ABOUT_CONSTANTS from '../constants/About'
import { CALL_API } from '../middleware/api'

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
