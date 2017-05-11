import {LOAD_ACTIVE_BOARD, LOAD_ACTIVE_PIN} from '../actions';
import {createReducer} from './utils';

const initialState = {
    activeBoard: {},
    activePin: {}
};

const handlers = {
    [LOAD_ACTIVE_BOARD]: function (state, action) {
        return {
            ...state,
            activeBoard: action.payload
        }
    },
    [LOAD_ACTIVE_PIN]: function (state, action) {
        return {
            ...state,
            activePin: action.payload
        }
    }
}

export default createReducer(initialState, handlers);
