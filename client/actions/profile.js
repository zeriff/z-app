import {
    PROFILE_LOAD,
    LOAD_USERBOARDS_FOR_PROFILE,
    LOAD_STATES,
    LOAD_PUBLIC_BOARDS,
    LOAD_INVITED_BOARDS,
    LOAD_PRIVATE_BOARDS,
    LOAD_IS_CURRENT_USER,
    LOAD_MY_FEEDS
} from '../actions';
import {putProfile, getProfile, uploadProfilePic} from '../api/profile';
import {loadUserBoards, userboard_getAllPrivate, userboard_getAllInvites} from '../api/userboard';
import {StorageManager, cleanObject} from '../utils';
import {browserHistory as history} from 'react-router';
import {dataURItoBlob} from './utils';

import {getAllRiffs} from '../api/RiffApi';

export function loadMyfeeds() {
    return function (dispatch) {
        getAllRiffs()
            .then(function (res) {
                dispatch({type: LOAD_MY_FEEDS, payload: res.riffs})
            });
    }
}

export function editProfile(profileData) {
    return function (dispatch) {
        cleanObject(profileData, true);
        putProfile("", profileData).then(function (res) {
            dispatch({type: PROFILE_LOAD, payload: res.profile});
            setProfile(res.profile);
            history.push("/profile");
        });
    }
}

export function fetchProfile(user_id) {
    return function (dispatch) {
        if (!user_id) {
            user_id = StorageManager
                .getItem('session')
                .user_id;
        }
        getProfile(user_id)
            .then(function (res) {
                dispatch({type: PROFILE_LOAD, payload: res.profile});
                dispatch({type: LOAD_STATES, payload: res.states});
                setProfile(res.profile);
            });
    }
}

export function fetchUserBoards() {
    return function (dispatch) {
        loadUserBoards()
            .then(function (res) {
                dispatch({type: LOAD_USERBOARDS_FOR_PROFILE, payload: res.userboards});
            });
    }
}

export function fetchPrivateBoards() {
    return function (dispatch) {
        userboard_getAllPrivate()
            .then(function (res) {
                dispatch({type: LOAD_PRIVATE_BOARDS, payload: res.boards});
            });

    }
}

export function fetchInvitedBoards() {
    return function (dispatch) {
        userboard_getAllInvites()
            .then(function (res) {
                dispatch({type: LOAD_INVITED_BOARDS, payload: res.boards});
            });
    }
}

export function updateProfilePic(image) {
    return function (dispatch) {
        Loader.setLoading();
        var formData = new FormData();
        formData.append('image', dataURItoBlob(image));
        uploadProfilePic(formData).then(function (res) {
            Loader.done();
            toastr.info(res.message);
            window
                .location
                .reload();
        });
    }
}

export function load_is_current_user(current_user_id) {
    return function (dispatch) {
        let is_current_user = false;
        let user_id = StorageManager
            .getItem('session')
            .user_id;
        if (current_user_id == user_id || current_user_id == undefined) {
            is_current_user = true;
        }
        dispatch({type: LOAD_IS_CURRENT_USER, payload: is_current_user});
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
