import {headers, parseJSON} from './utils';
import axios from 'axios';

export function likeRiff(id) {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/likes/' + id, options).then(parseJSON);
}

export function unlikeRiff(id) {
    const options = {
        headers: headers(),
        method: 'DELETE'
    };
    return axios('/api/likes/' + id, options).then(parseJSON);
}

export function status(id) {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/likes/' + id + "/status", options).then(parseJSON);
}
