import store from './store'
import {loadBoards, loadUsers} from './actions';
import axios from 'axios';
import storageMgr from './utils/storagemanager';
import {browserHistory} from 'react-router';

export function loadBoardsOnEnter() {
    var userdetails = storageMgr.getUserDetails()
    if (userdetails == null) {
        browserHistory.push("/auth/signin");
        return
    } else {
        axios.get('/api/boards', {
            headers: {
                "x-access-token": storageMgr.getToken()
            }
        }).then(function(res) {
            console.log("boards loading : ", res);
            store.dispatch(loadBoards(res.data.boards));
        });
    }
}

export function checkUserSession() {
    var userdetails = storageMgr.getUserDetails();
    if (userdetails != null) {
        setTimeout(function() {
            // browserHistory.push("/");
        }, 500);
    }
}

export function getUsers() {
    var userdetails = storageMgr.getUserDetails()
    if (userdetails == null) {
        browserHistory.push("/auth/signin");
        return
    } else {
        axios.get('/api/admin/users', {
            headers: {
                "x-access-token": storageMgr.getToken()
            }
        }).then(function(res) {
            console.log(res.data);
            store.dispatch(loadUsers(res.data.users));
        });
    }
}

export function loadboardPins() {
    axios.get('/api/pins/board/' + board.title, {
        headers: {
            "x-access-token": storageMgr.getToken()
        }
    }).then(function(res) {
        me.props.loadPins(res.data.pins);
        if (res.data.pins.length > 0) {
            $('.ui.basic.modal').modal('show');
            setTimeout(function() {
                masonry.bind("pins", "pin");
                masonry.reload("pins");
            }, 500);

        } else {
            toastr.info("No pins found for this board");
        }
    });
}
