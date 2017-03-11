import {LOAD_USERBOARDS_FOR_DISCOVER} from '../actions';
import {createReducer} from './utils';

const initialState = {
    userboards: []
};

const handlers = {
    [LOAD_USERBOARDS_FOR_DISCOVER]: function(state, action) {
        return {
            ...state,
            userboards: [...action.payload]
        }
    }
}

export default createReducer(initialState, handlers);
