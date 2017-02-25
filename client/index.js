import React from 'react';
import ReactDOM from 'react-dom'
import style from './style/style.css';
import {Router, browserHistory} from 'react-router';
import AppRouter from './router';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store ={store}>
    {AppRouter}
</Provider>, document.getElementById('app'));
