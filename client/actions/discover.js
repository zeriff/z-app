import {LOAD_USERBOARDS_FOR_DISCOVER} from '../actions';
import {fetchUserBoards_for_discover} from '../api/discover';

export function loadDiscoverBoards() {
    return function(dispatch) {
        fetchUserBoards_for_discover().then(function(res) {
            dispatch({type: LOAD_USERBOARDS_FOR_DISCOVER, payload: res});
        });
    }
}
