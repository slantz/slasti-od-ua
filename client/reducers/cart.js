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
        case CART_CONSTANTS.ABOUT_INQUIRY_POST_SUCCESS:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    inquiry : payload.inquiry[0]
                },
                currentDate: null,
                currentTime: null
            });
            break;
        case CART_CONSTANTS.ABOUT_INQUIRY_POST_FAILURE:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    inquiry : null
                }
            });
            break;
        case CART_CONSTANTS.ABOUT_INQUIRY_POST_REQUEST:
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
        default:
            assignedState = state;
    }

    return assignedState;
};
