import {headers, parseJSON} from './utils';
import axios from 'axios';

export function fetchUserBoards_for_discover() {

    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/discover', options).then(parseJSON);
}
