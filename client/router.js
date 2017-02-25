import React from 'react';
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router';
import Auth from './routes/auth';
import App from './routes/app';
import {Route, IndexRoute} from 'react-router';
import SignIn from './containers/auth/signin';
import Signup from './containers/auth/signup';

const router = (
    <Router history={browserHistory}>
        {Auth}
        {App}
    </Router>
);
export default router;
