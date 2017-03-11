import {headers, parseJSON} from './utils';
import axios from 'axios';

export function putProfile(profile_id, data) {
    const options = {
        headers: headers(),
        method: 'PUT',
        data: JSON.stringify(data)
    };
    return axios("/api/profile/" + profile_id, options).then(parseJSON);
}

export function getProfile(user_id) {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios("/api/profile/" + user_id, options).then(parseJSON);
}
