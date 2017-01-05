import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import Showcase from './containers/showcase';

import Home from './containers/home';
import SignIn from './containers/auth/signin';
import Signup from './containers/auth/signup';
import NewPin from './containers/board/newpin';
import Admin from './containers/admin';
import Users from './containers/admin/users';

import Dashboard from './containers/admin/dashboard';

import {loadBoardsOnEnter, checkUserSession, getUsers} from './route_callback';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Admin}></IndexRoute>
        <Route path="/auth/signin" component={SignIn} onEnter={checkUserSession}></Route>
        <Route path="/auth/signup" component={Signup} onEnter={checkUserSession}></Route>
        <Route path="/boards/newpin" component={NewPin}></Route>
        <Route path="/admin/users" component={Users} onEnter={getUsers}></Route>
    </Route>
);
// <IndexRoute component={Home} onEnter={loadBoardsOnEnter}></IndexRoute>
export default routes;
