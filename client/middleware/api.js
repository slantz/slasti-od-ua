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

function postPutApi(endpoint, method, data, headers, dontStringify) {
    const fullUrl = constructEndpoint(endpoint);
    let request = {
        credentials: 'include',
        method : method,
        body : dontStringify ? data : JSON.stringify(data),
    };

    if (headers) {
        request.headers = headers;
    }

    return fetch(fullUrl, request).then(response => {
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

    let {endpoint, types, method, body, redirect, headers, dontStringify, defaultHeaders} = callAPI;

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

    if (!headers && !defaultHeaders) {
        headers = {
            'Content-Type': 'application/json'
        };
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
        case CORE_CONSTANTS.METHOD.POST:
        case CORE_CONSTANTS.METHOD.PUT: {
            return postPutApi(endpoint, method, body, headers, dontStringify).then(
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
