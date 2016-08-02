import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './src/actions/auth_actions';
import { Router, browserHistory, match } from 'react-router';
import reducers from './src/reducers/index';
import routes from './src/routes';
import AuthMiddlware from './src/middlewares/auth_middleware'
import NewsMiddlware from './src/middlewares/news_middleware'

const initialState = window.__INITIAL_STATE__;

const createStoreWithMiddleware = applyMiddleware(AuthMiddlware, NewsMiddlware)(createStore);

const store = createStoreWithMiddleware(reducers, initialState);

const token = localStorage.getItem("token");

const role = localStorage.getItem("role");

if(token){
    store.dispatch({
        type: AUTH_USER,
        role: role
    })
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={ browserHistory } routes={ routes } />
    </Provider>,
    document.getElementById("reactbody")
);
