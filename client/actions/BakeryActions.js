import * as CORE_CONSTANTS from '../constants/Core'
import { CALL_API } from '../middleware/api'
import * as BAKERY_CONSTANTS from '../constants/Bakery'

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
            endpoint: "/api/bakery"
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
