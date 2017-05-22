import {teal700} from 'material-ui/styles/colors';
import {teal500} from 'material-ui/styles/colors';
import {teal100} from 'material-ui/styles/colors';
import {white} from 'material-ui/styles/colors';
import {amber500} from 'material-ui/styles/colors';
import {grey900} from 'material-ui/styles/colors';
import {grey600} from 'material-ui/styles/colors';
import {grey400} from 'material-ui/styles/colors';

export const LOCALE = "ru-RU";

export const CROP_IMAGE_RATIO = {
    "4/3": 4/3,
    "3/4": 4/3,
    "16/9": 16/9,
    "9/16": 9/16
};

export const API_ROOT = `http://${module.hot ? 'local.slasti.od.ua:3001' : 'slasti.od.ua'}`;
export const IMAGES_ROOT = `http://${module.hot ? 'local.slasti.od.ua:3001' : 'slasti.od.ua'}/client/static/images/`;
export const GRAPHICS_ROOT = `http://${module.hot ? 'local.slasti.od.ua:3001' : 'slasti.od.ua'}/client/static/graphics/`;

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
    'en-US': {
        MONTHS: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    'ru-RU': {
        MONTHS: ["Янв.", "Фев.", "Мар.", "Апр.", "Май", "Июн.", "Июл.", "Авг.", "Сен.", "Окт.", "Ноя.", "Дек."],
        DAYS: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    }
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

export const INQUIRY = {
    STATUS: {
        CREATED: "CREATED",
        CANCELLED: "CANCELLED",
        RESOLVED: "RESOLVED"
    }
};
