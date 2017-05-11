import {browserHistory as history} from 'react-router';
import {SESSION_LOAD, SESSION_LOGIN, SESSION_LOGOUT, PROFILE_LOAD} from '../actions';
import {deleteSession, postSession} from '../api/session';
import {updateHeaders} from '../api/utils';

import {StorageManager} from '../utils';

const localStorage = window.localStorage;

export function initialize() {

    return (dispatch) => {
        try {
            let session = StorageManager.getItem("session");
            const {username, token, user_id} = session;
            if (username && token && user_id) {
                dispatch({
                    type: SESSION_LOAD,
                    payload: {
                        username,
                        token,
                        user_id
                    }
                });
                updateHeaders({'x-access-token': token});
                let profile = StorageManager.getItem("profile");
                dispatch({type: PROFILE_LOAD, payload: profile});
            } else {
                history.push('/auth');
            }
        } catch (e) {
            history.push('/auth');
        }

    }
}

export function login(email, password, targetPath) {
    return function(dispatch) {
        postSession(email, password).then((payload) => {
            if (payload.success) {
                updateHeaders({'x-access-token': payload.userDetails.token});
                dispatch({type: SESSION_LOGIN, payload});
                StorageManager.addUserDetails(payload.userDetails);
                let userDetails = payload.userDetails;
                let profile = userDetails.profile;
                StorageManager.setItem("session", {
                    token: userDetails.token,
                    username: userDetails.username,
                    user_id: userDetails.user_id
                });
                StorageManager.setItem("profile", profile);
                history.push("/");
                dispatch({
                    type: PROFILE_LOAD,
                    payload: {
                        username: userDetails.username,
                        ...profile
                    }
                })
            } else {
                toastr.error(payload.message);
                history.push("/auth");
            }
        });
    }
}

export function logout(session) {
    return (dispatch) => {
        dispatch({type: SESSION_LOGOUT});
        //        deleteSession(session);
        updateHeaders({"x-access-token": undefined});
        try {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('token');
        } catch (e) {
            // ignore
        }
        window.location.href = '/auth'; // reload fully
    };
}
