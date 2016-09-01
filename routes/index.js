var express = require('express');
var router = express.Router();
var path = require("path");
var React = require('react');

var mysql      = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'TAHNIK',
	password: 'jE*ah5jU',
	database: 'SAMAGGI'
});


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

connection.connect();

const MAX_DESCRIPTION_LENGTH = 74;


function getPageHeaders(req, res, next) {
	req.image = "http://www.samaggisamagom.org/resources/samaggi.png";
	req.title = "SamaggiSamagom";
	req.description = "A society for Thai Society Samaggi Conenct";
	if(req.baseUrl == '/news') {
		var newsID = req._parsedUrl.pathname.replace('/', '');
		if(newsID === ''){
			next();
		} else if(isNaN(newsID)) {
			next();
		}else {
			console.log("redirecting");
			var getNewsQuery = "SELECT * FROM news WHERE id=" + connection.escape(newsID);
			connection.query(getNewsQuery, function(err, result) {
				if(err) {
					return res.json({
						success: false,
						Message: "Wrong News ID provided"
					})
				}else {
					req.title = result[0].title;
					req.description = result[0].body.toString().substr(0, MAX_DESCRIPTION_LENGTH);
					req.image= `http://www.samaggisamagom.org/news_images/small/${result[0].image_path}`;
				}
			});
			next();
		}
	}else {
		next();
	}
}

router.use(getPageHeaders);


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

            var getNewsQuery = "SELECT * FROM news ORDER BY id DESC LIMIT 5";
        	connection.query(getNewsQuery, function(err, result) {
        		if(err) {
        			console.log(err);
        		}else {
                    var jsonResponse = {
						data: {
	                        success: true,
	                        news: result
						}
                    }
                    store.dispatch({
        				type: TOP_NEWS,
        				payload: jsonResponse
        			});

                    var htmlToSend = renderToString(
        				<Provider store={store}>
        					<RouterContext {...renderProps} />
        				</Provider>
        			)
                    var finalState = store.getState();
                    var url = "./public/stylesheets/bootstrap.min.css";
                    fs.readFile(url, function (err, data) {
                        if (err) {
                            return console.error(err);
                        }else {
                            res.status(200).send(renderFullPage(htmlToSend, finalState, data.toString(), req));
                        }
                    });
        		}
        	})
		} else {
			res.status(404).send('Not found')
		}
	})
});


function renderFullPage(html, initialState, boostrapCSS, req) {
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
        <meta name="description" content="${req.description}">
        <!-- Setting a description -->
        <meta name="language" content="English" />
        <meta property="og:title" content="${req.title}" />
        <meta property="og:description" content="${req.description}" />
        <meta property="og:image" content="${req.image}" />
        <meta name="theme-color" content="#E8563E" />
        <title>${req.title}</title>

    	<!-- Bootstrap CSS -->
        <style>
            ${boostrapCSS}
        </style>

        <link rel="shortcut icon" href="../resources/favicon.ico">
        <style>
            .main,.row,.vertical-center{position:relative}.top_nav,.vertical-center{top:50%;transform:translateY(-50%)}#exCollapsingNavbar2>ul>li>input,.FB_Share,.top_nav_buttons{border-radius:0;box-shadow:0 1px 3px grey;font-family:'Exo 2',sans-serif;font-weight:400;font-size:1.2em}.FB_Share,.news_home_container>h3,.top_nav_buttons,p{font-size:1.2em}@font-face{font-family:'Exo 2';font-style:normal;font-weight:100;src:local('Exo 2 Thin'),local('Exo2-Thin'),url(https://fonts.gstatic.com/s/exo2/v3/6eWVsQBg_DHn5C7yJ6Q_BfY6323mHUZFJMgTvxaG2iE.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:100;src:local('Exo 2 Thin'),local('Exo2-Thin'),url(https://fonts.gstatic.com/s/exo2/v3/fbGcG9CFbD6xJHRnV_W4B_Y6323mHUZFJMgTvxaG2iE.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:100;src:local('Exo 2 Thin'),local('Exo2-Thin'),url(https://fonts.gstatic.com/s/exo2/v3/ADiRusfMayFwcntf9MXsGQ.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:200;src:local('Exo 2 Extra Light'),local('Exo2-ExtraLight'),url(https://fonts.gstatic.com/s/exo2/v3/fTWF5_X2GMFGSeu9Jfm8xRTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:200;src:local('Exo 2 Extra Light'),local('Exo2-ExtraLight'),url(https://fonts.gstatic.com/s/exo2/v3/2te67bJO7v3hcIhF8WOfpxTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:200;src:local('Exo 2 Extra Light'),local('Exo2-ExtraLight'),url(https://fonts.gstatic.com/s/exo2/v3/4VH1sjauXOSoJIJOdxuAC_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:300;src:local('Exo 2 Light'),local('Exo2-Light'),url(https://fonts.gstatic.com/s/exo2/v3/ZvqiGg27-1PW7JHPGOnJEBTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:300;src:local('Exo 2 Light'),local('Exo2-Light'),url(https://fonts.gstatic.com/s/exo2/v3/-u8MnRNZbXng_riSEM1grRTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:300;src:local('Exo 2 Light'),local('Exo2-Light'),url(https://fonts.gstatic.com/s/exo2/v3/TZlHHgxEfHXA7uKM1eaCjfesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:400;src:local('Exo 2'),local('Exo2-Regular'),url(https://fonts.gstatic.com/s/exo2/v3/pEbpp8gu02JrI5SDG9jj6g.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:400;src:local('Exo 2'),local('Exo2-Regular'),url(https://fonts.gstatic.com/s/exo2/v3/sZoRRDfBcJL9e6dHdMU_Tg.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:400;src:local('Exo 2'),local('Exo2-Regular'),url(https://fonts.gstatic.com/s/exo2/v3/-A4eIjQkAwKL411pgtQ4VA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:500;src:local('Exo 2 Medium'),local('Exo2-Medium'),url(https://fonts.gstatic.com/s/exo2/v3/hJNWOADMCBRrv6g6rvmDLRTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:500;src:local('Exo 2 Medium'),local('Exo2-Medium'),url(https://fonts.gstatic.com/s/exo2/v3/LIOVoUZaNfvKcnPK2sqyzhTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:500;src:local('Exo 2 Medium'),local('Exo2-Medium'),url(https://fonts.gstatic.com/s/exo2/v3/6b9HPGUYUr8qZeNu0Z7o-PesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:600;src:local('Exo 2 Semi Bold'),local('Exo2-SemiBold'),url(https://fonts.gstatic.com/s/exo2/v3/LFe3mB-q6jNXyAcQ2iPxARTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:600;src:local('Exo 2 Semi Bold'),local('Exo2-SemiBold'),url(https://fonts.gstatic.com/s/exo2/v3/GGsKokbvGBQnZ182Vk7qiRTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:600;src:local('Exo 2 Semi Bold'),local('Exo2-SemiBold'),url(https://fonts.gstatic.com/s/exo2/v3/0BGKjb5TxeNM_vPrpoWDWPesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:700;src:local('Exo 2 Bold'),local('Exo2-Bold'),url(https://fonts.gstatic.com/s/exo2/v3/bjq6AK9kaX_qiS97tqNwpBTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:700;src:local('Exo 2 Bold'),local('Exo2-Bold'),url(https://fonts.gstatic.com/s/exo2/v3/j6S3lQriBGoUURQ3ejUiKBTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:700;src:local('Exo 2 Bold'),local('Exo2-Bold'),url(https://fonts.gstatic.com/s/exo2/v3/AbMslUVu4Wq5jvNwOBLwLvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:800;src:local('Exo 2 Extra Bold'),local('Exo2-ExtraBold'),url(https://fonts.gstatic.com/s/exo2/v3/XcVNq7h_15hNJotQOnfwdhTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:800;src:local('Exo 2 Extra Bold'),local('Exo2-ExtraBold'),url(https://fonts.gstatic.com/s/exo2/v3/vxP0mJ4Ah81pzPPpYPzpbBTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:800;src:local('Exo 2 Extra Bold'),local('Exo2-ExtraBold'),url(https://fonts.gstatic.com/s/exo2/v3/CJVzeXcVfU8kDtg9_l0We_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:normal;font-weight:900;src:local('Exo 2 Black'),local('Exo2-Black'),url(https://fonts.gstatic.com/s/exo2/v3/rUGmGYSiV3Rj1fENrroZexTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:normal;font-weight:900;src:local('Exo 2 Black'),local('Exo2-Black'),url(https://fonts.gstatic.com/s/exo2/v3/MqITCP2L4jm77PnkS72K-BTbgVql8nDJpwnrE27mub0.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:normal;font-weight:900;src:local('Exo 2 Black'),local('Exo2-Black'),url(https://fonts.gstatic.com/s/exo2/v3/GJUUsjMsQG_gk-UGzcMXofesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:100;src:local('Exo 2 Thin Italic'),local('Exo2-ThinItalic'),url(https://fonts.gstatic.com/s/exo2/v3/eVT2YjM90_OfVfatCnMNtxJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:100;src:local('Exo 2 Thin Italic'),local('Exo2-ThinItalic'),url(https://fonts.gstatic.com/s/exo2/v3/-Hjc4jtnQgJIAWP1NDt63hJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:100;src:local('Exo 2 Thin Italic'),local('Exo2-ThinItalic'),url(https://fonts.gstatic.com/s/exo2/v3/BcTwYQH4QHiI46xew8Vt5FtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:200;src:local('Exo 2 Extra Light Italic'),local('Exo2-ExtraLightItalic'),url(https://fonts.gstatic.com/s/exo2/v3/GPcnHEcViOv9M6tOEXaj1SEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:200;src:local('Exo 2 Extra Light Italic'),local('Exo2-ExtraLightItalic'),url(https://fonts.gstatic.com/s/exo2/v3/tnz2R07zhK1IagGVkpqXSiEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:200;src:local('Exo 2 Extra Light Italic'),local('Exo2-ExtraLightItalic'),url(https://fonts.gstatic.com/s/exo2/v3/FoL3DQ5h24Mp-VKZ-NjJxPk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:300;src:local('Exo 2 Light Italic'),local('Exo2-LightItalic'),url(https://fonts.gstatic.com/s/exo2/v3/23rYvy_JA5ECpoxf7frKbSEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:300;src:local('Exo 2 Light Italic'),local('Exo2-LightItalic'),url(https://fonts.gstatic.com/s/exo2/v3/MjcxgXfhyR_SJwppOHwuDSEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:300;src:local('Exo 2 Light Italic'),local('Exo2-LightItalic'),url(https://fonts.gstatic.com/s/exo2/v3/nWbHq5XdqJFjIrJyBvpVo_k_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:400;src:local('Exo 2 Italic'),local('Exo2-Italic'),url(https://fonts.gstatic.com/s/exo2/v3/F9ETeMVT95dtwFnxnP3Yo_Y6323mHUZFJMgTvxaG2iE.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:400;src:local('Exo 2 Italic'),local('Exo2-Italic'),url(https://fonts.gstatic.com/s/exo2/v3/_nL-1222f1d6pbTficjClvY6323mHUZFJMgTvxaG2iE.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:400;src:local('Exo 2 Italic'),local('Exo2-Italic'),url(https://fonts.gstatic.com/s/exo2/v3/LMIL7_Tt4ZR7oImp-8ghHw.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:500;src:local('Exo 2 Medium Italic'),local('Exo2-MediumItalic'),url(https://fonts.gstatic.com/s/exo2/v3/eaanbqgvNGwrqFRlRINTXiEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:500;src:local('Exo 2 Medium Italic'),local('Exo2-MediumItalic'),url(https://fonts.gstatic.com/s/exo2/v3/i5NxmCRBbb0FYs_jPsIakiEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:500;src:local('Exo 2 Medium Italic'),local('Exo2-MediumItalic'),url(https://fonts.gstatic.com/s/exo2/v3/1_2um3wNMzErQK93dC9Hevk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:600;src:local('Exo 2 Semi Bold Italic'),local('Exo2-SemiBoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/AbE2HdC08fDM25clla7d4yEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:600;src:local('Exo 2 Semi Bold Italic'),local('Exo2-SemiBoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/sckEAwIKmmsx7VFwzUEGbSEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:600;src:local('Exo 2 Semi Bold Italic'),local('Exo2-SemiBoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/1cBqBVaZ3i9Efab2hdPpzPk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:700;src:local('Exo 2 Bold Italic'),local('Exo2-BoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/8v5Te3n1zxIm7cF0xXG0iiEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:700;src:local('Exo 2 Bold Italic'),local('Exo2-BoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/37_egASvAhc9tHwCuoIfKyEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:700;src:local('Exo 2 Bold Italic'),local('Exo2-BoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/Rpc1bsIIcqFfucX8mi4y5vk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:800;src:local('Exo 2 Extra Bold Italic'),local('Exo2-ExtraBoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/ypwaNNE60c87t97j4sVyqiEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:800;src:local('Exo 2 Extra Bold Italic'),local('Exo2-ExtraBoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/7QdOk5tMB25V4JlYtwJ2eSEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:800;src:local('Exo 2 Extra Bold Italic'),local('Exo2-ExtraBoldItalic'),url(https://fonts.gstatic.com/s/exo2/v3/Gj10EN9jO3BquHnP2Z4qNvk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'Exo 2';font-style:italic;font-weight:900;src:local('Exo 2 Black Italic'),local('Exo2-BlackItalic'),url(https://fonts.gstatic.com/s/exo2/v3/GWqof4rbZ7r2U2YOej_9-CEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Exo 2';font-style:italic;font-weight:900;src:local('Exo 2 Black Italic'),local('Exo2-BlackItalic'),url(https://fonts.gstatic.com/s/exo2/v3/RIAbswA4ePiUasfrC4OUwSEAvth_LlrfE80CYdSH47w.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Exo 2';font-style:italic;font-weight:900;src:local('Exo 2 Black Italic'),local('Exo2-BlackItalic'),url(https://fonts.gstatic.com/s/exo2/v3/4W580FLpNwVHxorEVMZVGfk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:'EB Garamond';font-style:normal;font-weight:400;src:local('EB Garamond'),local('EBGaramond'),url(https://fonts.gstatic.com/s/ebgaramond/v7/kYZt1bJ8UsGAPRGnkXPeFTTOQ_MqJVwkKsUn0wKzc2I.woff2) format('woff2');unicode-range:U+0460-052F,U+20B4,U+2DE0-2DFF,U+A640-A69F}@font-face{font-family:'EB Garamond';font-style:normal;font-weight:400;src:local('EB Garamond'),local('EBGaramond'),url(https://fonts.gstatic.com/s/ebgaramond/v7/kYZt1bJ8UsGAPRGnkXPeFTUj_cnvWIuuBMVgbX098Mw.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'EB Garamond';font-style:normal;font-weight:400;src:local('EB Garamond'),local('EBGaramond'),url(https://fonts.gstatic.com/s/ebgaramond/v7/kYZt1bJ8UsGAPRGnkXPeFb6up8jxqWt8HVA3mDhkV_0.woff2) format('woff2');unicode-range:U+0102-0103,U+1EA0-1EF9,U+20AB}@font-face{font-family:'EB Garamond';font-style:normal;font-weight:400;src:local('EB Garamond'),local('EBGaramond'),url(https://fonts.gstatic.com/s/ebgaramond/v7/kYZt1bJ8UsGAPRGnkXPeFSYE0-AqJ3nfInTTiDXDjU4.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'EB Garamond';font-style:normal;font-weight:400;src:local('EB Garamond'),local('EBGaramond'),url(https://fonts.gstatic.com/s/ebgaramond/v7/kYZt1bJ8UsGAPRGnkXPeFY4P5ICox8Kq3LLUNMylGO4.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:Gudea;font-style:normal;font-weight:400;src:local('Gudea'),url(https://fonts.gstatic.com/s/gudea/v4/z8aPAbP9Zel-Pp_KwXJfCA.woff2) format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Gudea;font-style:normal;font-weight:400;src:local('Gudea'),url(https://fonts.gstatic.com/s/gudea/v4/WTDyO8MdshuMhAnoLO0WMw.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}.row{margin:0}body{background:#ECE9E6;background:-webkit-linear-gradient(to left,#ECE9E6 ,#FFF);background:linear-gradient(to left,#ECE9E6 ,#FFF)}#reactbody{text-align:center}.main{margin-top:5vh}.top_nav{right:0;position:absolute}@media (max-width:992px){.top_nav{position:relative;top:0;transform:translateY(0)}.navbar{margin:0 auto}}@media (min-width:992px){#exCollapsingNavbar2>ul>li>input{width:30vw}#reactbody>div>div.row.top_navbar>div,#reactbody>div>div>div>img{height:100%}.navbar{position:relative;top:50%;transform:translateY(-50%)}.top_navbar{height:15vh;position:fixed;width:100%}.main_body{padding-top:16vh}}@media (max-width:992px){#exCollapsingNavbar2>ul>li.nav-item{float:none;margin:8px 0}#reactbody>div>div>div>img{width:100%}}.top_nav_buttons{background-color:#E8563E;color:#fff;-webkit-transition:all .2s linear;-moz-transition:all .2s linear;-ms-transition:all .2s linear;-o-transition:all .2s linear;transition:all .2s linear}.FB_Share{color:#fff;-webkit-transition:all .2s linear;-moz-transition:all .2s linear;-ms-transition:all .2s linear;-o-transition:all .2s linear;transition:all .2s linear}.card-title,.news_home_container{font-family:'Exo 2',sans-serif;font-weight:300}.news_main_link{color:#696969}.news_main_link:hover{color:#2e2e2e}.news_main_link:visited{color:#696969}.dropdown-item{color:#fff}.top_navbar{background-color:#e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:all .3s cubic-bezier(.25,.8,.25,1);-moz-transition:all .3s cubic-bezier(.25,.8,.25,1);-ms-transition:all .3s cubic-bezier(.25,.8,.25,1);-o-transition:all .3s cubic-bezier(.25,.8,.25,1);transition:all .3s cubic-bezier(.25,.8,.25,1);z-index:999}.news_home{padding:0 2em}.news_home_container{background-color:#E8563E;padding:.5em 0 .1em;color:#fff;margin:0 0 .6em}p{font-family:Gudea,sans-serif}
		</style>
    </head>
    <body>

    	<div id="reactbody"><div>${html}</div></div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
    	<script src="../bin/app.bundle.js"></script>
    	<!-- jQuery first, then Bootstrap JS. -->
    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js" integrity="sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js" integrity="sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/js/bootstrap.min.js" integrity="sha384-ux8v3A6CPtOTqOzMKiuo3d/DomGaaClxFYdCu2HPMBEkf6x2xiDyJ7gkXU0MWwaD" crossorigin="anonymous"></script>
    </body>
    </html>
    `
}

/*
 <link rel="stylesheet" href="../stylesheets/main.css">
 */


module.exports = router;
