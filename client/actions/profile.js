import {PROFILE_LOAD, LOAD_USERBOARDS_FOR_PROFILE} from '../actions';
import {putProfile, getProfile} from '../api/profile';
import {loadUserBoards} from '../api/userboard';
import {StorageManager, cleanObject} from '../utils';
import {browserHistory as history} from 'react-router';

export function editProfile(profileData) {
    return function(dispatch) {
        cleanObject(profileData, true);
        putProfile("", profileData).then(function(res) {
            dispatch({type: PROFILE_LOAD, payload: res.profile});
            setProfile(res.profile);
            history.push("/profile");
        });
    }
}

export function fetchProfile() {
    return function(dispatch) {
        let user_id = StorageManager.getItem('session').user_id;
        getProfile(user_id).then(function(res) {
            dispatch({type: PROFILE_LOAD, payload: res.profile});
            setProfile(res.profile);
        });
    }
}

export function fetchUserBoards() {
    return function(dispatch) {
        loadUserBoards().then(function(res) {
            dispatch({type: LOAD_USERBOARDS_FOR_PROFILE, payload: res.userboards});
        });
    }
}

// HELPERS

function setProfile(newProfile) {
    let oldProfile = StorageManager.getItem('profile');
    let profile = {
        ...oldProfile,
        ...newProfile
    }
    StorageManager.setItem('profile', profile);
}
