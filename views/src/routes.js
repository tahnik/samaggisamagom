import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Home from './components/home';
import News from './components/news';
import Signin from './containers/authentication_containers/signin';
import Signup from './containers/authentication_containers/signup';
import NewsItem from './containers/news_containers/news_item';
import CreateNews from './containers/admin_containers/create_news';
import CreateEvent from './containers/admin_containers/create_events';
import requireAuthAdmin from './containers/route_controllers/require_auth_admin';
import redirectAuth from './containers/route_controllers/redirect_authenticated';

import Header from './components/header';

export default (
    <Router history={ browserHistory } >
        <Route path="/" component={Header}>
            <IndexRoute component={Home} />
            <Route path="/signin" component={redirectAuth(Signin)} />
            <Route path="/signup" component={redirectAuth(Signup)} />
            <Route path="/create/news" component={requireAuthAdmin(CreateNews)} />
            <Route path="/news" component={News} />
            <Route path="/news/:id" component={NewsItem} />
            <Route path="/events" component={CreateEvent} />
        </Route>
    </Router>
)
