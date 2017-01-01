export function checkUserIsAuthorized(user) {
    return user.status === "OK";
}

// TODO: handle this as async promise when page is loaded on this route
export const REQUIRE_LOGIN = (nextState, replace, cb, store) => {
    function checkAuth() {
        const { core: { user } } = store.getState();
        if (!checkUserIsAuthorized(user)) {
            replace('/');
        }
        cb();
    }

    checkAuth();
};
