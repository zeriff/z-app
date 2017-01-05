import {LOAD_BOARDS} from './../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case LOAD_BOARDS:
            return [...action.payload];
        default:
            return state
    }
}
