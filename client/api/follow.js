import {headers, parseJSON} from './utils';
import axios from 'axios';

export function follow_user(user_id) {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/follows/' + user_id, options).then(parseJSON);
}

export function getFollowingStatus(user_id) {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/follows/' + user_id + "/status", options).then(parseJSON);
}

export function unFollow_user(user_id) {
    const options = {
        headers: headers(),
        method: 'DELETE'
    };
    return axios('/api/follows/' + user_id, options).then(parseJSON);
}
