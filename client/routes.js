import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import NotFound from './screens/notfound';
import Main from './components/Main';
import Auth from './components/Auth';

import Profile from './screens/profile';
import SignIn from './screens/Signin';
import SignUp from './screens/Signup';
import Discover from './screens/discover';

// newOne

import MyFeeds from './screens/MyFeeds';
import Invites from './screens/Invites';
import Feeds from './screens/Feeds';
import Popular from './screens/Popular';

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
        component: Discover,
        indexRoute: {
            component: Feeds
        }
    },
    childRoutes: [
        {
            path: '/discover',
            component: Discover,
            indexRoute: {
                component: Feeds
            },
            childRoutes: [
                {
                    path: '/feeds',
                    component: Feeds
                }, {
                    path: '/popular',
                    component: Popular
                }
            ]
        }, {
            path: 'profile(/:id)',
            component: Profile,
            indexRoute: {
                component: MyFeeds
            },
            childRoutes: [
                {
                    path: '/myfeeds',
                    component: MyFeeds
                }, {
                    path: '/invites',
                    component: Invites
                }
            ]
        }
    ]
}

const notfoundRoute = {
    path: "*",
    component: NotFound
}

export default
[appRoutes, authRoutes, notfoundRoute];
