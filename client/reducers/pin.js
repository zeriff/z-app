import {SHOW_PIN} from './../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SHOW_PIN:
            return action.payload;
        default:
            return state
    }
}
