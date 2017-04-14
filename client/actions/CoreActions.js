import * as CORE_CONSTANTS from '../constants/Core'
import { CALL_API } from '../middleware/api'

// Fetches user information data from Express session, if request fails then user is not authenticated.
// Relies on the custom API middleware defined in ../middleware/api.js.
function getCurrentUserAction() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [ CORE_CONSTANTS.REQUEST, CORE_CONSTANTS.SUCCESS, CORE_CONSTANTS.FAILURE ],
            endpoint: "/auth/user/me",
            payload: {}
        }
    }
}

function logout() {
    return {
        [CALL_API]: {
            method: CORE_CONSTANTS.METHOD.GET,
            types: [ CORE_CONSTANTS.CORE_LOGOUT_REQUEST, CORE_CONSTANTS.CORE_LOGOUT_SUCCESS, CORE_CONSTANTS.CORE_LOGOUT_FAILURE ],
            endpoint: "/auth/logout"
        }
    }
}

function shouldGetCurrentUser(state) {
    const isFetching = state.core.user.isFetching;
    const userStatus = state.core.user.status;

    if (isFetching === false) {
        return userStatus === null;
    }

    if (isFetching === true) {
        return false;
    }

}

function shouldMakeRequest(state) {
    return state.isFetching !== true;
}

// Fetches user user from express api, unless is cached.
// Relies on Redux Thunk middleware.
export function getCurrentUser() {
    return (dispatch, getState) => {
        if (shouldGetCurrentUser(getState())) {
            return dispatch(getCurrentUserAction())
        }
        return null;
    }
}

export function logoutCurrentUser() {
    return (dispatch, getState) => {
        if (shouldMakeRequest(getState().core.user)) {
            return dispatch(logout())
        }
        return null;
    }
}
