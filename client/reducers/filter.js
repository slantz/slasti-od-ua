import * as FILTER_CONSTANTS from '../constants/Filter';

export default function filter(state = {
   filters: {
       category: [],
       ingredients: [],
       filling: [],
       basis: [],
       decor: [],
       numberOfPieces: []
   }
}, {type, payload}) {
    let assignedState;

    switch (type) {
        case FILTER_CONSTANTS.SET_CURRENT_FILTERS:
            assignedState = Object.assign({}, state, {
                filters: payload.filters
            });
            break;
        case FILTER_CONSTANTS.CLEAR_ALL_FILTERS:
            assignedState = Object.assign({}, state, {
                filters: {
                    category: [],
                    ingredients: [],
                    filling: [],
                    basis: [],
                    decor: [],
                    numberOfPieces: []
                }
            });
            break;
        default:
            assignedState = state;
    }

    return assignedState;
};
