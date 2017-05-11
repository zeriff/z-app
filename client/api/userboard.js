import {headers, parseJSON} from './utils';
import axios from 'axios';

export function loadUserBoards() {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/userboards', options).then(parseJSON);
}

export function userboard_getAllPrivate() {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/userboards/v/private', options).then(parseJSON);
}

export function userboard_getAllInvites() {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/userboards/v/invites', options).then(parseJSON);
}

export function userboard_editSettings(data, id) {
    const options = {
        headers: headers(),
        method: 'POST'
    };
    return axios("/api/userboards/" + id + "/settings/" + data, options).then(parseJSON);
}

export function addInvites(id, data) {
    const options = {
        headers: headers(),
        method: "POST",
        data: JSON.stringify(data)
    }
    return axios("/api/userboards/" + id + "/invite", options).then(parseJSON);
}

export function removeInvite(id) {
    const options = {
        headers: headers(),
        method: "DELETE"
    }
    return axios("/api/userboards/" + id + "/invite", options).then(parseJSON);

}