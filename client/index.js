import React from 'react';
import ReactDOM from 'react-dom'
import style from './style/style.css';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store ={store}>
    <Router history={browserHistory}>
        {routes}
    </Router>
</Provider>, document.getElementById('app'));
