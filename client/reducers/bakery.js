import * as BAKERY_CONSTANTS from '../constants/Bakery';

export default function bakery(state = {
    data : {
        items : [],
        isFetching : false
    },
    count: {
        count: null,
        limit: null,
        isFetching : false
    },
    currentSkip: 0
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
        case BAKERY_CONSTANTS.BAKERY_ADD_MORE_SUCCESS:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    items : state.data.items.concat(payload.bakery)
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_ADD_MORE_FAILURE:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    items : state.data.items
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_ADD_MORE_REQUEST:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : true,
                    items : state.data.items
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_COUNT_SUCCESS:
            assignedState = Object.assign({}, state, {
                count : {
                    isFetching : false,
                    count : payload.bakeryCount.count,
                    limit : payload.bakeryCount.limit,
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_COUNT_FAILURE:
            assignedState = Object.assign({}, state, {
                count : {
                    isFetching : false,
                    count : 0,
                    limit: 0
                }
            });
            break;
        case BAKERY_CONSTANTS.BAKERY_COUNT_REQUEST:
            assignedState = Object.assign({}, state, {
                count : {
                    isFetching : true,
                    count : 0,
                    limit: 0
                }
            });
            break;
        case BAKERY_CONSTANTS.SET_CURRENT_SKIP:
            assignedState = Object.assign({}, state, {
                currentSkip: payload
            });
            break;
        default:
            assignedState = state;
    }

    return assignedState;
};
