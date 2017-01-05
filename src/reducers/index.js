import {combineReducers} from 'redux';
import blogReducer from './blog';
import boardReducer from './board'
import pinReducer from './pin'
import userReducer from './admin/users'

const rootReducer = combineReducers({blog: blogReducer, boards: boardReducer, pins: pinReducer, users: userReducer});

export default rootReducer;
