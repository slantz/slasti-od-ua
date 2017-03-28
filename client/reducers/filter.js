import * as FILTER_CONSTANTS from '../constants/Filter';

export default function bakery(state = {
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
        case BAKERY_CONSTANTS.BAKERY_GET_ALL_SUCCESS:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    items : payload.bakery
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_GET_ALL_FAILURE:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    items : []
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_GET_ALL_REQUEST:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : true,
                    items : []
                }
            });
            break;
        default:
            assignedState = state;
    }

    return assignedState;
};