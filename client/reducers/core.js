import * as CONSTANTS from '../constants/Core'

let userFetchingPromises = {
        all:        null,
        success:    null,
        failure:    null,
        request:    null
},
    actionPromisesCallbacks = {
        success: null,
        failure: null,
        request: null
};

function successPromiseFunction(resolve) {
    actionPromisesCallbacks.success = resolve;
}

function failurePromiseFunction(resolve, reject) {
    actionPromisesCallbacks.failure = reject;
}

function requestPromiseFunction(resolve) {
    actionPromisesCallbacks.request = resolve;
}

userFetchingPromises.success = new Promise(successPromiseFunction);
userFetchingPromises.failure = new Promise(failurePromiseFunction);
userFetchingPromises.request = new Promise(requestPromiseFunction);

userFetchingPromises.all = new Promise(function(resolve, reject){
    Promise.all([
        Promise.race([
            userFetchingPromises.success,
            userFetchingPromises.failure
        ]),
        userFetchingPromises.request
    ]).then(
        function(){
            resolve(CONSTANTS.USER.STATUS.OK);
        }
    ).catch(
        function(){
            reject(CONSTANTS.USER.STATUS.UNAUTHORIZED);
        }
    );
});

export default function core(state = {
    user: {
        payload: {},
        isFetching: false,
        fetcher: userFetchingPromises.all,
        status: null
    },
    isHeaderSticky: false
}, { type, payload }) {
    switch(type) {
        case CONSTANTS.SUCCESS:
            actionPromisesCallbacks.success();
            return Object.assign({}, state, {
                user: {
                    status: CONSTANTS.USER.STATUS.OK,
                    isFetching: false,
                    payload
                }
            });
        case CONSTANTS.FAILURE:
            actionPromisesCallbacks.failure();
            return Object.assign({}, state, {
                user: {
                    status: CONSTANTS.USER.STATUS.UNAUTHORIZED,
                    isFetching: false,
                    payload: {}
                }
            });
        case CONSTANTS.REQUEST:
            actionPromisesCallbacks.request();
            return Object.assign({}, state, {
                user: {
                    status: null,
                    fetcher: userFetchingPromises.all,
                    isFetching: true,
                    payload: {}
                }
            });
        case CONSTANTS.CORE_LOGOUT_SUCCESS:
            actionPromisesCallbacks.success();
            return Object.assign({}, state, {
                user: {
                    status: CONSTANTS.USER.STATUS.UNAUTHORIZED,
                    isFetching: false,
                    payload: {}
                }
            });
        case CONSTANTS.CORE_LOGOUT_FAILURE:
            actionPromisesCallbacks.failure();
            return Object.assign({}, state, {
                user: {
                    status: state.user.status,
                    isFetching: false,
                    payload: state.user.payload
                }
            });
        case CONSTANTS.CORE_LOGOUT_REQUEST:
            actionPromisesCallbacks.request();
            return Object.assign({}, state, {
                user: {
                    status: null,
                    fetcher: userFetchingPromises.all,
                    isFetching: true,
                    payload: state.user.payload
                }
            });
        case CONSTANTS.TOGGLE_HEADER_STICKY:
            return Object.assign({}, state, {
                isHeaderSticky: payload
            });
        default: return state
    }
}
