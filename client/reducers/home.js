import {LOAD_PINS, SHOW_PIN} from '../actions';
import {createReducer} from './utils';

const initialState = {
    pins: [],
    pin: {}
};

const handlers = {
    [LOAD_PINS]: function(state, action) {
        return {
            ...state,
            pins: [...action.payload]
        }
    },
    [SHOW_PIN]: function(state, action) {
        return {
            ...state,
            pin: action.payload
        }
    }
}

export default createReducer(initialState, handlers);
