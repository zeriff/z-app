import {addInvites, removeInvite, userboard_getAllInvites} from '../api/userboard';
import {LOAD_INVITED_BOARDS} from '../actions';

export function invite(id, invites, fn) {

    return function (dispatch) {
        let data = {
            invites: invites
        }

        addInvites(id, data).then(function (res) {
            fn();
            if (res.success) {
                toastr.info("Invites sent");
            }
        });
    }
}

export function deleteInvite(id) {
    return function (dispatch) {
        removeInvite(id)
            .then(function (res) {
                if (res.success) {
                    toastr.info("Removed");
                    userboard_getAllInvites().then(function (res) {
                        dispatch({type: LOAD_INVITED_BOARDS, payload: res.boards});
                    });
                }
            });
    }
}

export function LoadActiveBoard() {
    return function (dispatch) {}
}