import * as ABOUT_CONSTANTS from '../constants/About';

export default function about(state = {
    data : {
        inquiry : null,
        isFetching : false
    },
    currentDate: null,
    currentTime: null
}, {type, payload}) {
    let assignedState;

    switch (type) {
        case ABOUT_CONSTANTS.ABOUT_INQUIRY_POST_SUCCESS:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    inquiry : payload.inquiry[0]
                },
                currentDate: null,
                currentTime: null
            });
            break;
        case ABOUT_CONSTANTS.ABOUT_INQUIRY_POST_FAILURE:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : false,
                    inquiry : null
                }
            });
            break;
        case ABOUT_CONSTANTS.ABOUT_INQUIRY_POST_REQUEST:
            assignedState = Object.assign({}, state, {
                data : {
                    isFetching : true,
                    inquiry : null
                }
            });
            break;
        case ABOUT_CONSTANTS.ABOUT_SET_CURRENT_DATE:
            assignedState = Object.assign({}, state, {
                currentDate: payload
            });
            break;
        case ABOUT_CONSTANTS.ABOUT_SET_CURRENT_TIME:
            assignedState = Object.assign({}, state, {
                currentTime: payload
            });
            break;
        default:
            assignedState = state;
    }

    return assignedState;
};
