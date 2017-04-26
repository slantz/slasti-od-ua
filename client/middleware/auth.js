import * as CoreActions from '../actions/CoreActions'

export function checkUserIsAuthorized(user) {
    return user.status === "OK";
}

export function checkUserIsAdmin(user) {
    return user.status === "OK" && user.payload.admin === true;
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

export const REQUIRE_ADMIN = (nextState, replace, cb, store) => {
    function checkAuth() {
        const { core: { user } } = store.getState();

        if (user.status !== null) {
            if (!checkUserIsAdmin(user)) {
                replace('/');
            }
            cb();
        } else {
            store.dispatch(CoreActions.getCurrentUser());
            user.fetcher
                .then(
                    function(userData) {
                        if (!checkUserIsAdmin(userData)) {
                            replace('/');
                        }
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
