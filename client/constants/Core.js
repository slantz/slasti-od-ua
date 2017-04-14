export const NUMBER_LOGO_SHADOWED = 5;
export const CV = 'CV';
export const API_ROOT = `http://slasti.od.ua${module.hot ? ':3001' : ''}`;

export const REQUEST = 'CORE_REQUEST';
export const SUCCESS = 'CORE_SUCCESS';
export const FAILURE = 'CORE_FAILURE';

export const CORE_LOGOUT_REQUEST = 'CORE_LOGOUT_REQUEST';
export const CORE_LOGOUT_SUCCESS = 'CORE_LOGOUT_SUCCESS';
export const CORE_LOGOUT_FAILURE = 'CORE_LOGOUT_FAILURE';

export const TOGGLE_HEADER_STICKY = 'TOGGLE_HEADER_STICKY';

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const USER = {
    STATUS: {
        OK: 'OK',
        UNAUTHORIZED: 'UNAUTHORIZED'
    }
};
