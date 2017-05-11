import {
    PROFILE_LOAD,
    EDIT_PROFILE,
    LOAD_USERBOARDS_FOR_PROFILE,
    LOAD_STATES,
    LOAD_PUBLIC_BOARDS,
    LOAD_INVITED_BOARDS,
    LOAD_PRIVATE_BOARDS,
    LOAD_IS_CURRENT_USER,
    LOAD_MY_FEEDS
} from '../actions';

import {createReducer} from './utils';

const initialState = {
    avatar: "/img/whitelogo.png",
    username: "Zeriff",
    publicBoards: [],
    privateBoards: [],
    invitedBoards: [],
    userboards: [],
    myfeeds: [],
    is_current_user: false,
    states: {
        followers: [],
        followings: [],
        memories: []
    }
};

const handlers = {
    [LOAD_MY_FEEDS]: function (state, action) {
        return {
            ...state,
            myfeeds: action.payload
        }
    },

    [LOAD_IS_CURRENT_USER]: function (state, action) {
        return {
            ...state,
            is_current_user: action.payload
        }
    },
    [PROFILE_LOAD]: function (state, action) {
        return {
            ...state,
            ...action.payload
        }
    },
    [LOAD_USERBOARDS_FOR_PROFILE]: function (state, action) {
        return {
            ...state,
            userboards: action.payload
        }
    },
    [LOAD_PUBLIC_BOARDS]: function (state, action) {
        return {
            ...state,
            publicBoards: [...action.payload]
        }
    },
    [LOAD_PRIVATE_BOARDS]: function (state, action) {
        return {
            ...state,
            privateBoards: [...action.payload]
        }
    },
    [LOAD_INVITED_BOARDS]: function (state, action) {
        return {
            ...state,
            invitedBoards: [...action.payload]
        }
    },
    [LOAD_STATES]: function (state, action) {
        return {
            ...state,
            states: action.payload
        }
    }
}

export default createReducer(initialState, handlers);
