import {LOAD_USERBOARDS_FOR_DISCOVER, LOAD_EXISTING_BOARD, CLEAN_BOARD, LOAD_BOARD, LOAD_POPULAR} from '../actions';
import {createReducer} from './utils';

const initialState = {
    boards: [],
    board: {},
    popular: []
};

const handlers = {
    [LOAD_POPULAR]: function (state, action) {
        return {
            ...state,
            popular: action.payload
        }
    },
    [LOAD_USERBOARDS_FOR_DISCOVER]: function (state, action) {
        return {
            ...state,
            boards: [...action.payload]
        }
    },
    [LOAD_BOARD]: function (state, action) {
        return {
            ...state,
            board: action.payload
        }
    },
    [CLEAN_BOARD]: function (state, action) {
        return {
            ...state,
            board: {}
        }
    }
}

export default createReducer(initialState, handlers);
