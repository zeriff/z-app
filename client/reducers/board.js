import {SHOW_BOARD} from './../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SHOW_BOARD:
            return action.payload;
        default:
            return state
    }
}
