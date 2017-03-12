import {headers, parseJSON} from './utils';
import axios from 'axios';

export function postSession(email, password) {
    const options = {
        headers: headers(),
        method: 'POST',
        data: JSON.stringify({email, password})
    };
    console.log(options);
    return axios('/api/auth', options).then(parseJSON);
}

export function deleteSession(session) {
    const options = {
        headers: headers(),
        method: 'DELETE'
    };
    return axios(session.uri, options).then(parseJSON);
}
