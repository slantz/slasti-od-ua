export const REQUIRE_LOGIN = (nextState, replace, cb) => {
    function checkAuth() {
        const { user } = nextState;
        if (!user) {
            // oops, not logged in, so can't be here!
            replace('/');
        }
        cb();
    }

    checkAuth();
};
