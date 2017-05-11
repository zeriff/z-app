import {headers, parseJSON} from './utils';
import axios from 'axios';

export function getFollowers(email, password) {
    const options = {
        headers: headers(),
        method: 'POST',
        data: JSON.stringify({email, password})
    };
    console.log(options);
    return axios('/api/auth', options).then(parseJSON);
}
