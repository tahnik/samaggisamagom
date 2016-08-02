var express = require('express');
var router = express.Router();
var path = require("path");

var React = require('react');

import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../views/src/routes';

import reducers from '../views/src/reducers/index';
import { ROOT_URL_SECURE } from '../views/src/root_url';
import { PAGE_NEWS, TOP_NEWS, ACTIVE_NEWS, PAGINATION_NEWS } from '../views/src/actions/news_actions';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';

var fs = require("fs");

router.get('/', function (req, res) {
	match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			// You can also check renderProps.components or renderProps.routes for
			// your "not found" component or route respectively, and send a 404 as
			// below, if you're using a catch-all route.

			const store = createStore(reducers);

            var newsUrl = `${ROOT_URL_SECURE}/api/news/top`;
            axios.get(newsUrl)
            .then(response => {
                store.dispatch({
    				type: TOP_NEWS,
    				payload: response
    			});

                var htmlToSend = renderToString(
    				<Provider store={store}>
    					<RouterContext {...renderProps} />
    				</Provider>
    			)
                var finalState = store.getState();
                //console.log(finalState);
                var url = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css"
                axios.get(url)
                .then(response => {
                    res.status(200).send(renderFullPage(htmlToSend, finalState, response));
                })
                .catch(() => {
                    console.log("There's a problem");
                });
            })
            .catch(() => {
                console.log("There's a problem");
            });
		} else {
			res.status(404).send('Not found')
		}
	})
});


function renderFullPage(html, initialState, boostrapCSS) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Required meta tags always come first -->
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    	<meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="author" content="Tahnik Mustasin">
        <meta name="Copyright" content="Tahnik Mustasin" />
        <meta name="Robots" content="INDEX,ALL" />
        <meta name="YahooSeeker" content="INDEX, FOLLOW" />
        <meta name="msnbot" content="INDEX, FOLLOW" />
        <meta name="googlebot" content="INDEX, FOLLOW" />
        <meta name="allow-search" content="yes" />
        <meta name="revisit-after" content="daily" />
        <meta name="Rating" content="General" />
        <meta name="site" content="http://www.samaggisamagom.org" />
        <meta name="distribution" content="global" />
        <meta name="keywords" content="samaggi, samagom, thai, society, samaggisamagom">
        <!--Setting some keyword for search engines -->
        <meta name="description" content="A society for Thai Society Samaggi Conenct">
        <!-- Setting a description -->
        <meta name="language" content="English" />
        <title>SamaggiSamagom</title>

    	<!-- Bootstrap CSS -->
        <style>
            ${boostrapCSS.data}
        </style>

        <link rel="shortcut icon" href="../resources/favicon.ico">
        <style>
            .main,.row,.vertical-center{position:relative}.top_nav,.vertical-center{top:50%;transform:translateY(-50%)}#exCollapsingNavbar2>ul>li>input,.top_nav_buttons{border-radius:0;box-shadow:0 1px 3px grey}.row{margin:0}#reactbody{text-align:center}.main{margin-top:5vh}.top_nav{right:0;position:absolute}@media (min-width:992px){#exCollapsingNavbar2>ul>li>input{width:30vw}}@media (max-width:992px){.top_nav{position:relative;top:0;transform:translateY(0)}.navbar{margin:0 auto}#exCollapsingNavbar2>ul>li.nav-item{float:none;margin:8px 0}}.top_nav_buttons{background-color:#e04226;color:#fff}.news_main_link{color:#696969}.news_main_link:hover{color:#2e2e2e}.news_main_link:visited{color:#696969}.dropdown-item{color:#fff}
        </style>
        <link rel="stylesheet" href="../stylesheets/font-awesome/css/font-awesome.min.css">
    </head>
    <body>

    	<div id="reactbody"><div>${html}</div></div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
    	<script src="../bin/app.bundle.js"></script>
    	<!-- jQuery first, then Bootstrap JS. -->
    	<script src="../javascripts/tether.min.js"></script>
    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
    </body>
    </html>
    `
}

/*
<style>
    .main,.row,.vertical-center{position:relative}.top_nav,.vertical-center{top:50%;transform:translateY(-50%)}#exCollapsingNavbar2>ul>li>input,.top_nav_buttons{border-radius:0;box-shadow:0 1px 3px grey}.row{margin:0}#reactbody{text-align:center}.main{margin-top:5vh}.top_nav{right:0;position:absolute}@media (min-width:992px){#exCollapsingNavbar2>ul>li>input{width:30vw}}@media (max-width:992px){.top_nav{position:relative;top:0;transform:translateY(0)}.navbar{margin:0 auto}#exCollapsingNavbar2>ul>li.nav-item{float:none;margin:8px 0}}.top_nav_buttons{background-color:#e04226;color:#fff}
</style>
*/


module.exports = router;
