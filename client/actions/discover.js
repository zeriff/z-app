import {LOAD_USERBOARDS_FOR_DISCOVER, LOAD_EXISTING_BOARD, LOAD_BOARD, CLEAN_BOARD, LOAD_POPULAR} from '../actions';
import {fetchUserBoards_for_discover, fetchFeaturedPins, fetchPopular} from '../api/discover';

import {getAllRiffs} from '../api/RiffApi';

export function loadDiscoverBoards() {
    return function (dispatch) {
        fetchUserBoards_for_discover()
            .then(function (res) {
                dispatch({type: LOAD_USERBOARDS_FOR_DISCOVER, payload: res.boards});
            });
    }
}

export function loadViewBoard(id) {
    return function (dispatch) {
        fetchFeaturedPins(id)
            .then(function (res) {
                dispatch({type: LOAD_BOARD, payload: res});
            });
    }
}
export function cleanBoard() {
    return function (dispatch) {
        dispatch({type: CLEAN_BOARD});
    }
}

export function loadExistingBoard(board) {
    return function (dispatch) {
        dispatch({type: LOAD_EXISTING_BOARD, payload: board});
    }
}

export function loadPopular() {
    return function (dispatch) {
        fetchPopular()
            .then(function (res) {
                dispatch({type: LOAD_POPULAR, payload: res.popular});
            });
    }
}
