import {LOAD_USER_SEARCH_RESULT, LOAD_BOARD_SEARCH_RESULT, LOAD_PIN_SEARCH_RESULT} from '../actions';

export function searchUsers(query) {
    return function (dispatch) {
        dispatch({type: LOAD_USER_SEARCH_RESULT, payload: []});
    }
}

export function searchBoards(query) {
    return function (dispatch) {
        dispatch({type: LOAD_BOARD_SEARCH_RESULT, payload: []});
    }
}

export function searchPins(query) {
    return function (dispatch) {
        dispatch({type: LOAD_PIN_SEARCH_RESULT, payload: []});
    }
}
