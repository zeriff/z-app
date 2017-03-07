import {combineReducers} from 'redux';
import boards from './boards'
import pins from './pins'
import userboards from './userboard';
import users from './admin/users';
import pin from './pin';
import board from './board';

const rootReducer = combineReducers({
    boards,
    pins,
    users,
    userboards,
    board,
    pin
});

export default rootReducer;
