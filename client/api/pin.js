import {headers, parseJSON} from './utils';
import axios from 'axios';

export function fetchPins() {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/pins', options).then(parseJSON);
}

export function fetchPin(pin_id) {
    const options = {
        headers: headers(),
        method: "GET"
    }
    return axios('/api/pins/' + pin_id, options).then(parseJSON);
}

export function postPin(formData) {
    const options = {
        headers: headers(),
        method: "POST",
        data: formData
    }
    return axios('/api/pins', options).then(parseJSON);
}
