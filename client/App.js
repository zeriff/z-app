import React from 'react';
import {Router, browserHistory as history} from 'react-router';
import {Provider} from 'react-redux';
import {initialize} from './actions/session';
import store from './store';
import routes from './routes';

store.dispatch(initialize(window.location.pathname));

export default function() {
    return (
        <Provider store={store}>
            <Router routes={routes} history={history}/>
        </Provider>
    )
}
