import {ADD_TAG, LOAD_PINS, LOAD_BOARDS, LOAD_USERS} from './types';
import axios from 'axios';
import storageMgr from '../utils/storagemanager';
import store from '../store';

export function addTag(tag) {
    return {type: ADD_TAG, payload: tag}
}

export function loadPins(pins) {
    return {type: LOAD_PINS, payload: pins}
};

export function loadBoards(boards) {
    return {type: LOAD_BOARDS, payload: boards}
}

export function loadUsers(users) {
    return {type: LOAD_USERS, payload: users}
}
