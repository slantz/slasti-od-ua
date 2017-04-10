import * as CART_CONSTANTS from '../constants/Cart';

export default function cart(state = {
    data : {
      inquiry : null,
      isFetching : false
    },
    cartRedirectId: ''
}, {type, payload}) {
    let assignedState;

    switch (type) {
        case CART_CONSTANTS.CART_INQUIRY_GET_SUCCESS:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    inquiry : payload.inquiry
                }
            });
            break;
        case CART_CONSTANTS.CART_INQUIRY_GET_FAILURE:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    inquiry : null
                }
            });
            break;
        case CART_CONSTANTS.CART_INQUIRY_GET_REQUEST:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : true,
                    inquiry : null
                }
            });
            break;
        case CART_CONSTANTS.CART_SET_CART_REDIRECT_ID:
            assignedState = Object.assign({}, state, {
                cartRedirectId: payload
            });
            break;
        case CART_CONSTANTS.CART_REMOVE_CART_REDIRECT_ID:
            assignedState = Object.assign({}, state, {
                cartRedirectId: ''
            });
            break;
        default:
            assignedState = state;
    }

    return assignedState;
};
