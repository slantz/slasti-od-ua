import * as BAKERY_CONSTANTS from '../constants/Bakery';

export default function bakery(state = {
    data : {
        items : [],
        isFetching : false
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
