import {combineReducers} from 'redux';
import session from './session';
import profile from './profile';
import home from './home';
import discover from './discover';

export default combineReducers({session, profile, home, discover});
