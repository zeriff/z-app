import reducers from './../reducers';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

// const store = createStore(reducers, {}, applyMiddleware(thunk, promiseMiddleware()));

const store = createStore(reducers, applyMiddleware(thunk));
export default store;
