import {LOAD_PINS} from './../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case LOAD_PINS:
            return [...action.payload];
        default:
            return state
    }
}
