import store from './store'
import {loadBoards, loadUsers, loadPins, loadUserBoards} from './actions';
import axios from 'axios';
import storageMgr from './utils/storagemanager';
import {browserHistory} from 'react-router';

export function load_discover_boards() {
    var userdetails = storageMgr.getUserDetails()
    if (userdetails == null) {
        browserHistory.push("/auth/signin");
        return
    } else {
        axios.get('/api/discover', {
            headers: {
                "x-access-token": storageMgr.getToken()
            }
        }).then(function(res) {
            console.log("boards loading : ", res);
            store.dispatch(loadBoards(res.data));
        });
    }
}

export function load_user_pins() {
    var userdetails = storageMgr.getUserDetails()
    if (userdetails == null) {
        browserHistory.push("/auth/signin");
        return
    } else {
        axios.get('/api/pins', {
            headers: {
                "x-access-token": storageMgr.getToken()
            }
        }).then(function(res) {
            console.log("boards loading : ", res);
            store.dispatch(loadPins(res.data.pins));
        });
    }
}

export function load_user_boards() {

    axios.get('/api/userboards', {
        headers: {
            "x-access-token": storageMgr.getToken()
        }
    }).then(function(res) {
        console.log(res.data);
        store.dispatch(loadUserBoards(res.data.userboards));
    });
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
