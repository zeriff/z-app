import {
    ADD_TAG,
    LOAD_PINS,
    LOAD_BOARDS,
    LOAD_USERS,
    LOAD_USERBOARDS,
    SHOW_PIN,
    SHOW_BOARD
} from './types';

import axios from 'axios';
import storageMgr from '../utils/storagemanager';
import store from '../store';

export function showPin(pin) {
    return {type: SHOW_PIN, payload: pin}
}
export function showBoard(board) {
    return {type: SHOW_BOARD, payload: board}
}

export function addTag(tag) {
    return {type: ADD_TAG, payload: tag}
}

export function loadPins(pins) {
    return {type: LOAD_PINS, payload: pins}
};

export function loadBoards(boards) {
    return {type: LOAD_BOARDS, payload: boards}
}

export function loadUserBoards(userboards) {
    return {type: LOAD_USERBOARDS, payload: userboards}
}

export function loadUsers(users) {
    return {type: LOAD_USERS, payload: users}
}
