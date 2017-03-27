import * as FILTER_CONSTANTS from '../constants/Filter'

export function createIntermediateFileReaderObject(currentFileToCrop, nextFileIndex) {
    return (dispatch) => {
        return dispatch({
            type: FILTER_CONSTANTS.FILTER,
            payload: {
                currentFileToCrop,
                nextFileIndex
            }
        });
    }
}
