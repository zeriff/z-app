import {headers, parseJSON} from './utils';
import axios from 'axios';

export function fetchPins() {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/pins', options).then(parseJSON);
}
