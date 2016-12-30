import * as c from '../constants/Core'
import { CALL_API } from '../middleware/api'

// Fetches user information data from Express session, if request fails then user is not authenticated.
// Relies on the custom API middleware defined in ../middleware/api.js.
function getCurrentUserAction() {
    return {
        [CALL_API]: {
            types: [ c.INFO_REQUEST, c.INFO_SUCCESS, c.INFO_FAILURE ],
            endpoint: "/auth/user/me",
            payload: {},
            isFetching: null
        }
    }
}

function shouldGetCurrentUser(state) {
    const isFetching = state.core.user.isFetching;
    const userStatus = state.core.user.status;

    if (isFetching === false) {
        if (userStatus === null) {
            return true;
        } else if (userStatus === 'UNAUTHORIZED') {
            return false;
        } else {
            return false;
        }
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
