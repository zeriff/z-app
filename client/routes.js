import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import NotFound from './screens/notfound';
import Main from './components/Main';
import Auth from './components/Auth';

import Home from './screens/home';
import Profile from './screens/profile';
import SignIn from './screens/Signin';
import SignUp from './screens/Signup';
import EditProfile from './screens/EditProfile';
import Discover from './screens/discover';

const authRoutes = {
    path: 'auth',
    component: Auth,
    indexRoute: {
        component: SignIn
    },
    childRoutes: [
        {
            path: 'singin',
            component: SignIn
        }, {
            path: 'signup',
            component: SignUp
        }
    ]
}

const appRoutes = {
    path: '/',
    component: Main,
    indexRoute: {
        component: Home
    },
    childRoutes: [
        {
            path: 'discover',
            component: Discover
        }, {
            path: "home",
            component: Home
        }, {
            path: "profile",
            component: Profile
        }, {
            path: "editprofile",
            component: EditProfile
        }
    ]
}

const notfoundRoute = {
    path: "*",
    component: NotFound
}

export default[appRoutes,
    authRoutes,
    notfoundRoute]
