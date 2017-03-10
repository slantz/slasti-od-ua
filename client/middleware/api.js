import 'isomorphic-fetch'
import { push } from 'react-router-redux';
import * as CORE_CONSTANTS from '../constants/Core'

function constructEndpoint(endpoint) {
    return (endpoint.indexOf(CORE_CONSTANTS.API_ROOT) === -1) ? CORE_CONSTANTS.API_ROOT + endpoint : endpoint;
}

// This makes every API response to return Promise object.
function callApi(endpoint) {
    const fullUrl = constructEndpoint(endpoint);

    return fetch(fullUrl, {
        credentials: 'include', //pass cookies, for authentication
    })
        .then(response => response
                .json()
                .then(
                    json => ({ json, response })
                )
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json)
            }

            return Object.assign(
                {},
                json
            );
        });
}

function postApi(endpoint, data) {
    const fullUrl = constructEndpoint(endpoint);

    return fetch(fullUrl, {
        credentials: 'include',
        method : 'POST',
        body : data
    }).then(response => {
        return response
            .json()
            .then(
                json => ({ json, response })
            )
    }).then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(json)
        }

        return Object.assign(
            {},
            json
        );
    });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint, types, method, body, redirect} = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({type : requestType}));

    switch (method) {
        case CORE_CONSTANTS.METHOD.GET: {
            return callApi(endpoint).then(
                response => {
                    next(actionWith({
                        payload : response,
                        type : successType
                    }));
                    redirect && store.dispatch(push(redirect()));
                },
                error => next(actionWith({
                    type : failureType,
                    payload : {}
                }))
            );
        }
        case CORE_CONSTANTS.METHOD.POST: {
            return postApi(endpoint, body).then(
                response => {
                    next(actionWith({
                        payload : response,
                        type : successType
                    }));
                    redirect && store.dispatch(push(redirect()));
                },
                error => next(actionWith({
                    type : failureType,
                    payload : {}
                }))
            )
        }
    }
}
