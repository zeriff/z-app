import {headers, parseJSON} from './utils';
import axios from 'axios';

export function loadUserBoards() {
    const options = {
        headers: headers(),
        method: 'GET'
    };
    return axios('/api/userboards', options).then(parseJSON);
}
