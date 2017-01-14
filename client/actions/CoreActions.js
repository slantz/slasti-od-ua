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
