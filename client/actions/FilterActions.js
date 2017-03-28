import * as FILTER_CONSTANTS from '../constants/Filter'

export function setCurrentFilters(type, values) {
    return (dispatch, getState) => {
        let filters = {};

        Object.keys(getState().filter.filters).forEach((filterKey) => {
            if (filterKey === type) {
                filters[type] = values;
            } else {
                filters[filterKey] = getState().filter.filters[filterKey];
            }
        });

        return dispatch({
            type: FILTER_CONSTANTS.SET_CURRENT_FILTERS,
            payload: {
                filters
            }
        });
    }
}
