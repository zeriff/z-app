import {headers, parseJSON} from './utils';
import axios from 'axios';

export function postSession(email, password) {
    const options = {
        headers: headers(),
        method: 'POST',
        body: JSON.stringify({email, password})
    };

    return axios('/api/auth', options).then(parseJSON);
}

export function deleteSession(session) {
    const options = {
        headers: headers(),
        method: 'DELETE'
    };
    return axios(session.uri, options).then(parseJSON);
}
