import {ADD_TAG} from './../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case ADD_TAG:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
