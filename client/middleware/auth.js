import * as CoreActions from '../actions/CoreActions'

export function checkUserIsAuthorized(user) {
    return user.status === "OK";
}

export const REQUIRE_LOGIN = (nextState, replace, cb, store) => {
    function checkAuth() {
        const { core: { user } } = store.getState();

        if (user.status !== null) {
            if (!checkUserIsAuthorized(user)) {
                replace('/');
            }
            cb();
        } else {
            store.dispatch(CoreActions.getCurrentUser());
            user.fetcher
                .then(
                    function() {
                        cb();
                    }
                )
                .catch(
                    function() {
                        replace('/');
                        cb();
                    }
                );
        }
    }

    checkAuth();
};
