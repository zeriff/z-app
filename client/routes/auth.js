import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Auth from '../containers/auth';
import SignIn from '../containers/auth/signin';
import Signup from '../containers/auth/signup';

const routes = (
    <Route path="/auth" component={Auth}>
        <IndexRoute component={SignIn}></IndexRoute>
        <Route path='/auth/signup' component={Signup}></Route>
    </Route>
)

export default routes;
