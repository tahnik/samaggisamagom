import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Home from './components/home';
import News from './components/news';
import Signin from './containers/signin';
import NewsItem from './containers/news_item';

import Header from './components/header';

export default (
    <Router history={ browserHistory } >
        <Route path="/" component={Header}>
            <IndexRoute component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/news" component={News} />
            <Route path="/news/:id" component={NewsItem} />
        </Route>
    </Router>
)
