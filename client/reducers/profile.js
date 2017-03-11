import {PROFILE_LOAD, EDIT_PROFILE, LOAD_USERBOARDS_FOR_PROFILE} from '../actions';
import {createReducer} from './utils';

const initialState = {
    avatar: "/img/whitelogo.png",
    username: "Zeriff",
    userboards: []
};

const handlers = {
    [PROFILE_LOAD]: function(state, action) {
        return {
            ...state,
            ...action.payload
        }
    },
    [LOAD_USERBOARDS_FOR_PROFILE]: function(state, action) {
        return {
            ...state,
            userboards: [...action.payload]
        }
    }
}

export default createReducer(initialState, handlers);
