import {teal700} from 'material-ui/styles/colors';
import {teal500} from 'material-ui/styles/colors';
import {teal100} from 'material-ui/styles/colors';
import {white} from 'material-ui/styles/colors';
import {amber500} from 'material-ui/styles/colors';
import {grey900} from 'material-ui/styles/colors';
import {grey600} from 'material-ui/styles/colors';
import {grey400} from 'material-ui/styles/colors';

export const CROP_IMAGE_RATIO = 4/3;
export const CV = 'CV';
export const API_ROOT = `http://slasti.od.ua${module.hot ? ':3001' : ''}`;

export const REQUEST = 'CORE_REQUEST';
export const SUCCESS = 'CORE_SUCCESS';
export const FAILURE = 'CORE_FAILURE';

export const CORE_LOGOUT_REQUEST = 'CORE_LOGOUT_REQUEST';
export const CORE_LOGOUT_SUCCESS = 'CORE_LOGOUT_SUCCESS';
export const CORE_LOGOUT_FAILURE = 'CORE_LOGOUT_FAILURE';

export const TOGGLE_HEADER_STICKY = 'TOGGLE_HEADER_STICKY';

export const COLORS = {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: grey600,
    accent1Color: amber500,
    accent2Color: teal100,
    accent3Color: grey400,
    textColor: grey900,
    alternateTextColor: white,
    borderColor: grey400,
    vk: '#45668e',
    facebook: '#3b5998',
    instagram: '#c32aa3',
    alert: '#C91914',
};

export const DATES = {
    MONTHS: ["Jan", "Feb", "March", "Apr", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"],
    DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

export const SIZES = {
    HEADER: {
        HEIGHT: '60px'
    },
    ICON: {
        WIDTH: '30px',
        HEIGHT: '30px',
        MARGIN_RIGHT: '8px'
    },
    SMALL_PADDING: '2rem',
    ADMIN_UPLOAD_DIALOG_MIN_HEIGHT: '300px'
};

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
