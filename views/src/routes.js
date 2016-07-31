import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Home from './components/home';
import News from './components/news';
import Signin from './containers/signin';
import Signup from './containers/signup';
import NewsItem from './containers/news_item';
import CreateNews from './containers/create_news';
import requireAuthAdmin from './containers/require_auth_admin';

import Header from './components/header';

export default (
    <Router history={ browserHistory } >
        <Route path="/" component={Header}>
            <IndexRoute component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/create/news" component={requireAuthAdmin(CreateNews)} />
            <Route path="/news" component={News} />
            <Route path="/news/:id" component={NewsItem} />
        </Route>
    </Router>
)
