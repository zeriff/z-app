import React from 'react';
import {Route, IndexRoute} from 'react-router';
import PinView from '../screens/pinview';
import BoardView from '../screens/boardview';
import View from '../containers/view';

const routes = (
    <Route path="/view" component={View}>
        <Route path="/view/p" component={PinView}></Route>
        <Route path="/view/b" component={BoardView}></Route>
    </Route>
)

export default routes;
