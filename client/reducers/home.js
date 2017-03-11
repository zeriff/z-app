import {LOAD_PINS} from '../actions';
import {createReducer} from './utils';

const initialState = {
    pins: []
};

const handlers = {
    [LOAD_PINS]: function(state, action) {
        return {
            ...state,
            pins: [...action.payload]
        }
    }
}

export default createReducer(initialState, handlers);
