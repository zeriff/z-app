import {follow_user, getFollowingStatus, unFollow_user} from '../api/follow';
import Promise from 'promise';

export function create_follow(user_id) {
    return function (dispatch) {
        follow_user(user_id);
    }
}

export function delete_follow(user_id) {
    return function (dispatch) {
        unFollow_user(user_id);
    }
}

export function check_is_following(user_id) {
    return getFollowingStatus();
}
