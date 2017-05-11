import {LOAD_PINS, SHOW_PIN} from '../actions';
import {fetchPins, fetchPin} from '../api/pin';

export function loadPins() {
    return function(dispatch) {
        fetchPins().then(function(res) {
            dispatch({type: LOAD_PINS, payload: res.pins});
        });
    }
}

export function showPin(pin_id) {
    return function(dispatch) {
        fetchPin(pin_id).then(function(res) {
            dispatch({type: SHOW_PIN, payload: res.pin});
        })
    };
}

export function showLoadedPin(pin) {
    return function(dispatch) {
        dispatch({type: SHOW_PIN, payload: pin});
    }
}
