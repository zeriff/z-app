import React from 'react';
import App from '../containers/App';
import Home from '../containers/home';
import Discover from '../containers/discover';
import Notification from '../containers/notification';
import {Route, IndexRoute} from 'react-router';
import Camera from '../containers/camera';
import You from '../containers/you';

import {load_user_boards, load_user_pins, checkUserSession, getUsers, load_discover_boards} from '../route_callback';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={load_user_pins}></IndexRoute>
        <Route path="/discover" component={Discover} onEnter={load_discover_boards}></Route>
        <Route path="/you" component={You} onEnter={load_user_boards}></Route>
        <Route path="/notifications" component={Notification}></Route>
        <Route path="/camera" component={Camera}></Route>
    </Route>
)

export default routes;
