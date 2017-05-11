import {headers, parseJSON} from './utils';
import axios from 'axios';

export function fetchUserBoards_for_discover() {

    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/discover', options).then(parseJSON);
}

export function fetchFeaturedPins(board_id) {

    const options = {
        headers: headers(),
        method: 'POST'
    };
    return axios('/api/discover/' + board_id, options).then(parseJSON);
}


export function fetchPopular() {
    const options = {
        headers: headers(),
        method: 'POST'
    };
    return axios('/api/discover/popular', options).then(parseJSON);
}