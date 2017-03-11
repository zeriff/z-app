import {SESSION_LOAD, SESSION_LOGIN, SESSION_LOGOUT} from '../actions';
import {createReducer} from './utils';

const initialState = {};

const handlers = {
    [SESSION_LOAD]: function(state, action) {
        return action.payload;
    },
    [SESSION_LOGIN]: function(state, action) {
        if (!action.error) {
            return action.payload;
        }
        return {error: action.payload.message};
    },
    [SESSION_LOGOUT]: function() {
        return {};
    }
}

export default createReducer(initialState, handlers);
