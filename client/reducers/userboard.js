import {LOAD_USERBOARDS} from './../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case LOAD_USERBOARDS:
            return [...action.payload];
        default:
            return state
    }
}
