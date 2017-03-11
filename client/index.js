import React from 'react';
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
    <App/>, document.getElementById('app'));
