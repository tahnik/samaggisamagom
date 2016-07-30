var express = require('express');
var router = express.Router();
var path = require("path");

var React = require('react');

import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../views/src/routes';

import reducers from '../views/src/reducers/index';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

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

			const html = renderToString(
				<Provider store={store}>
					<RouterContext {...renderProps} />
				</Provider>
			)

			const finalState = store.getState();

			res.status(200).send(renderFullPage(html, finalState));
		} else {
			res.status(404).send('Not found')
		}
	})
});


function renderFullPage(html, initialState) {
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
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    	<link rel="stylesheet" href="../stylesheets/main.css">
        <link rel="shortcut icon" href="../resources/favicon.ico">
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


module.exports = router;
