import {LOAD_USER_SEARCH_RESULT,LOAD_BOARD_SEARCH_RESULT,LOAD_PIN_SEARCH_RESULTÎ} from '../actions';
import {createReducer} from './utils';

const initialState = {
    users: [],
    pins: [],
    boards: []
};

const handlers = {
    [LOAD_USER_SEARCH_RESULT]: function (state, action) {
        return {
            ...state,
            users: action.payload
        }
    },
    [LOAD_BOARD_SEARCH_RESULT]: function (state, action) {
        return {
            ...state,
            boards: action.payload
        }
    },
    [LOAD_PIN_SEARCH_RESULT]: function (state, action) {
        return {
            ...state,
            pins: action.payload
        }
    }
}

export default createReducer(initialState, handlers);
