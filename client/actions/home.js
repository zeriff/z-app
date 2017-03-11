import {LOAD_PINS} from '../actions';
import {fetchPins} from '../api/pin';

export function loadPins() {
    return function(dispatch) {
        fetchPins().then(function(res) {
            dispatch({type: LOAD_PINS, payload: res.pins});
        });
    }
}
