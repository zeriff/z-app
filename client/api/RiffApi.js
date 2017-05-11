import {headers, parseJSON} from './utils';
import axios from 'axios';

export function createRiff(formData) {
    const options = {
        headers: headers(),
        method: "POST",
        data: formData
    }
    return axios('/api/riffs', options).then(parseJSON);
}

export function getAllRiffs() {
    const options = {
        headers: headers(),
        method: "GET"
    }

    return axios('/api/riffs', options).then(parseJSON);
}