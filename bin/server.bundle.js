/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var app = express();
	var index = __webpack_require__(2);
	var api = __webpack_require__(31);
	var newsImage = __webpack_require__(39);
	var cors = __webpack_require__(42);

	app.use(cors());

	app.use('/api', api);
	app.use('/bin', express.static('./bin'));
	app.use('/stylesheets', express.static('./public/stylesheets'));
	app.use('/resources', express.static('./public/resources'));
	app.use('/javascripts', express.static('./public/javascripts'));
	//app.use('/news_images', express.static('./news_images'));
	app.use('/news_images', newsImage);

	app.use('/', index);
	app.use('/view/*', index);
	app.use('/signin', index);
	app.use('/news', index);
	app.use('/news/*', index);
	app.use('/create/*', index);
	app.use('/signup', index);

	app.listen(3000, function () {
		console.log('Hello World listening on port 3000!');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _server = __webpack_require__(3);

	var _reactRouter = __webpack_require__(4);

	var _routes = __webpack_require__(5);

	var _routes2 = _interopRequireDefault(_routes);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _redux = __webpack_require__(27);

	var _reactRedux = __webpack_require__(13);

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(1);
	var router = express.Router();
	var path = __webpack_require__(30);

	var React = __webpack_require__(6);

	router.get('/', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      var url;

	      (function () {
	        // You can also check renderProps.components or renderProps.routes for
	        // your "not found" component or route respectively, and send a 404 as
	        // below, if you're using a catch-all route.

	        var store = (0, _redux.createStore)(_index2.default);

	        var html = (0, _server.renderToString)(React.createElement(
	          _reactRedux.Provider,
	          { store: store },
	          React.createElement(_reactRouter.RouterContext, renderProps)
	        ));

	        var finalState = store.getState();

	        url = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css";

	        _axios2.default.get(url).then(function (response) {
	          res.status(200).send(renderFullPage(html, finalState, response));
	        }).catch(function () {
	          console.log("There's a problem");
	        });
	      })();
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
	});

	function renderFullPage(html, initialState, boostrapCSS) {
	  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n    \t<!-- Required meta tags always come first -->\n    \t<meta charset="utf-8">\n    \t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    \t<meta http-equiv="x-ua-compatible" content="ie=edge">\n        <meta name="author" content="Tahnik Mustasin">\n        <meta name="Copyright" content="Tahnik Mustasin" />\n        <meta name="Robots" content="INDEX,ALL" />\n        <meta name="YahooSeeker" content="INDEX, FOLLOW" />\n        <meta name="msnbot" content="INDEX, FOLLOW" />\n        <meta name="googlebot" content="INDEX, FOLLOW" />\n        <meta name="allow-search" content="yes" />\n        <meta name="revisit-after" content="daily" />\n        <meta name="Rating" content="General" />\n        <meta name="site" content="http://www.samaggisamagom.org" />\n        <meta name="distribution" content="global" />\n        <meta name="keywords" content="samaggi, samagom, thai, society, samaggisamagom">\n        <!--Setting some keyword for search engines -->\n        <meta name="description" content="A society for Thai Society Samaggi Conenct">\n        <!-- Setting a description -->\n        <meta name="language" content="English" />\n        <title>SamaggiSamagom</title>\n\n    \t<!-- Bootstrap CSS -->\n        <style>\n            ' + boostrapCSS.data + '\n        </style>\n    \t<style>\n            .main,.row,.vertical-center{position:relative}.top_nav,.vertical-center{top:50%;transform:translateY(-50%)}#exCollapsingNavbar2>ul>li>input,.top_nav_buttons{border-radius:0;box-shadow:0 1px 3px grey}.row{margin:0}#reactbody{text-align:center}.main{margin-top:5vh}.top_nav{right:0;position:absolute}@media (min-width:992px){#exCollapsingNavbar2>ul>li>input{width:30vw}}@media (max-width:992px){.top_nav{position:relative;top:0;transform:translateY(0)}.navbar{margin:0 auto}#exCollapsingNavbar2>ul>li.nav-item{float:none;margin:8px 0}}.top_nav_buttons{background-color:#e04226;color:#fff}\n    \t</style>\n        <link rel="shortcut icon" href="../resources/favicon.ico">\n    </head>\n    <body>\n\n    \t<div id="reactbody"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n          </script>\n    \t<script src="../bin/app.bundle.js"></script>\n    \t<!-- jQuery first, then Bootstrap JS. -->\n    \t<script src="../javascripts/tether.min.js"></script>\n    \t<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>\n    \t<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>\n    </body>\n    </html>\n    ';
	}

	module.exports = router;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _home = __webpack_require__(7);

	var _home2 = _interopRequireDefault(_home);

	var _news = __webpack_require__(14);

	var _news2 = _interopRequireDefault(_news);

	var _signin = __webpack_require__(18);

	var _signin2 = _interopRequireDefault(_signin);

	var _signup = __webpack_require__(21);

	var _signup2 = _interopRequireDefault(_signup);

	var _news_item = __webpack_require__(22);

	var _news_item2 = _interopRequireDefault(_news_item);

	var _create_news = __webpack_require__(23);

	var _create_news2 = _interopRequireDefault(_create_news);

	var _require_auth = __webpack_require__(24);

	var _require_auth2 = _interopRequireDefault(_require_auth);

	var _header = __webpack_require__(25);

	var _header2 = _interopRequireDefault(_header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
	    _reactRouter.Router,
	    { history: _reactRouter.browserHistory },
	    _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/', component: _header2.default },
	        _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: '/signin', component: _signin2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _signup2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: '/create/news', component: (0, _require_auth2.default)(_create_news2.default) }),
	        _react2.default.createElement(_reactRouter.Route, { path: '/news', component: _news2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: '/news/:id', component: _news_item2.default })
	    )
	);

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_home = __webpack_require__(8);

	var _news_home2 = _interopRequireDefault(_news_home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_Component) {
	    _inherits(Home, _Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(_news_home2.default, null)
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_home_item = __webpack_require__(9);

	var _news_home_item2 = _interopRequireDefault(_news_home_item);

	var _news_actions = __webpack_require__(11);

	var _reactRedux = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewsHome = function (_Component) {
		_inherits(NewsHome, _Component);

		function NewsHome() {
			_classCallCheck(this, NewsHome);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NewsHome).apply(this, arguments));
		}

		_createClass(NewsHome, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.getTopNews();
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.props.allNews.length == 0) {
					return _react2.default.createElement(
						'div',
						null,
						'Loading...'
					);
				}
				return _react2.default.createElement(
					'div',
					{ className: 'col-md-6', style: { marginTop: '1em', marginLeft: '2vw' } },
					this.props.allNews.map(function (news) {
						return _react2.default.createElement(_news_home_item2.default, { key: news.id, news: news });
					})
				);
			}
		}]);

		return NewsHome;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			allNews: state.allNews
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { getTopNews: _news_actions.getTopNews })(NewsHome);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _root_url = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewsHomeItem = function (_Component) {
	    _inherits(NewsHomeItem, _Component);

	    function NewsHomeItem() {
	        _classCallCheck(this, NewsHomeItem);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NewsHomeItem).apply(this, arguments));
	    }

	    _createClass(NewsHomeItem, [{
	        key: 'render',
	        value: function render() {
	            var url = _root_url.ROOT_URL + '/news_images/' + this.props.news.image_path;
	            var maxLength = 200;
	            var trimmedString = this.props.news.body.substr(0, maxLength);

	            //re-trim if we are in the middle of a word
	            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...';
	            if (this.props.news.body.length < 300) {
	                trimmedString = this.props.news.body;
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'card' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'card-block' },
	                    _react2.default.createElement(
	                        'h4',
	                        { className: 'card-title' },
	                        this.props.news.title
	                    ),
	                    _react2.default.createElement(
	                        'h6',
	                        { className: 'card-subtitle text-muted' },
	                        this.props.news.created_on.replace(/T|Z/g, ' ')
	                    )
	                ),
	                _react2.default.createElement('img', { style: { width: '100%' }, src: url, alt: 'Card image' }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'card-block' },
	                    _react2.default.createElement(
	                        'p',
	                        { className: 'card-text' },
	                        trimmedString
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/news/' + this.props.news.id },
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', className: 'btn btn-primary' },
	                            'Read more'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return NewsHomeItem;
	}(_react.Component);

	exports.default = NewsHomeItem;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ROOT_URL = exports.ROOT_URL = "http://localhost:3000";
	var ROOT_URL_SECURE = exports.ROOT_URL_SECURE = "http://localhost:3000";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PAGINATION_NEWS = exports.AUTH_ERROR = exports.ACTIVE_NEWS = exports.CREATE_POST = exports.TOP_NEWS = exports.PAGE_NEWS = undefined;
	exports.getNewsWithPage = getNewsWithPage;
	exports.getTopNews = getTopNews;
	exports.createPost = createPost;
	exports.getNews = getNews;
	exports.destroyActiveNews = destroyActiveNews;
	exports.authError = authError;

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	var _root_url = __webpack_require__(10);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PAGE_NEWS = exports.PAGE_NEWS = 'PAGE_NEWS';
	var TOP_NEWS = exports.TOP_NEWS = 'TOP_NEWS';
	var CREATE_POST = exports.CREATE_POST = 'CREATE_POST';
	var ACTIVE_NEWS = exports.ACTIVE_NEWS = 'ACTIVE_NEWS';
	var AUTH_ERROR = exports.AUTH_ERROR = 'AUTH_ERROR';
	var PAGINATION_NEWS = exports.PAGINATION_NEWS = 'PAGINATION_NEWS';

	function getNewsWithPage(page) {
		return function (dispatch) {
			var url = _root_url.ROOT_URL_SECURE + '/api/news?page=' + page;

			_axios2.default.get(url).then(function (response) {
				dispatch({
					type: PAGE_NEWS,
					payload: response
				});
				dispatch({
					type: PAGINATION_NEWS,
					payload: response,
					page: page
				});
			}).catch(function () {
				dispatch(authError('Bad Login Info'));
			});
		};
	}

	function getTopNews() {
		return function (dispatch) {
			var url = _root_url.ROOT_URL_SECURE + '/api/news/top';

			_axios2.default.get(url).then(function (response) {
				console.log(response);
				dispatch({
					type: TOP_NEWS,
					payload: response
				});
			}).catch(function () {
				dispatch(authError('Bad Login Info'));
			});
		};
	}

	function createPost(props) {
		return function (dispatch) {
			var url = _root_url.ROOT_URL_SECURE + '/api/news';

			var body = new FormData();
			Object.keys(props).forEach(function (key) {
				if (key == "news_image") {
					body.append(key, props[key][0]);
				} else {
					body.append(key, props[key]);
				}
			});
			body.append('token', localStorage.getItem('token'));

			_axios2.default.post(url, body).then(function (response) {
				dispatch({
					type: CREATE_POST,
					payload: response
				});
				_reactRouter.browserHistory.push('/');
			}).catch(function () {
				dispatch(authError('Bad Login Info'));
			});
		};
	}

	function getNews(id) {
		return function (dispatch) {
			var url = _root_url.ROOT_URL_SECURE + '/api/news/' + id;

			_axios2.default.get(url).then(function (response) {
				dispatch({
					type: ACTIVE_NEWS,
					payload: response
				});
			}).catch(function () {
				dispatch(authError('Bad Login Info'));
			});
		};
	}

	//This function is used to destroy the current active news item.
	//Without this a single news page will show the previous news for a split second and re render
	function destroyActiveNews() {
		return function (dispatch) {
			var response = {
				data: {
					news: null
				}
			};
			dispatch({
				type: ACTIVE_NEWS,
				payload: response
			});
		};
	}

	function authError(error) {
		return {
			type: AUTH_ERROR,
			payload: error
		};
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_main = __webpack_require__(15);

	var _news_main2 = _interopRequireDefault(_news_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var News = function (_Component) {
	    _inherits(News, _Component);

	    function News() {
	        _classCallCheck(this, News);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(News).apply(this, arguments));
	    }

	    _createClass(News, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(_news_main2.default, { params: this.props })
	            );
	        }
	    }]);

	    return News;
	}(_react.Component);

	exports.default = News;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_main_item = __webpack_require__(16);

	var _news_main_item2 = _interopRequireDefault(_news_main_item);

	var _news_actions = __webpack_require__(11);

	var _reactRedux = __webpack_require__(13);

	var _pagination = __webpack_require__(17);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewsMain = function (_Component) {
		_inherits(NewsMain, _Component);

		function NewsMain() {
			_classCallCheck(this, NewsMain);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NewsMain).apply(this, arguments));
		}

		_createClass(NewsMain, [{
			key: 'componentDidMount',

			/* When the component has mounter check if there's a parameter otherwise grab the first page
	   * Had to use parseInt as the param is string and it was causing problems in if statements inside pagination
	   */
			value: function componentDidMount() {
				if (this.props.params.location.query.page) {
					this.props.getNewsWithPage(parseInt(this.props.params.location.query.page));
				} else {
					this.props.getNewsWithPage(1);
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				/* Might need a fix in future but working perfectly for now. Not sure if this is an anti pattern.
	    * This code here prevents an inifinte loop. Every time the news page loads it updates once or twice because
	    * of the promise in the action creator. But <Link /> from react router only updates the /news so
	    * the only way to change pages is by updating this news component. So I can get new news whenever the
	    * the component updates. But because it update twice everytime it grabs a new news it gets stuck into
	    * an infinite loop. Below I am checking if the current page and the parameter is same. If it is it doesn't send
	    * any request to action creator and waits for it to finish. Otherwise it sends a new request getting the new
	    * page items. After browsing news with params, if someone goes back to /news it gets into infinite loop
	    * again because the page number in params doesn't exists and it fails the second test. For that the third
	    * test has been added
	    */
				if (this.props.news_pagination.page != null && this.props.news_pagination.page != this.props.params.location.query.page && typeof this.props.params.location.query.page !== 'undefined') {
					if (this.props.params.location.query.page) {
						this.props.getNewsWithPage(parseInt(this.props.params.location.query.page));
					} else {
						this.props.getNewsWithPage(1);
					}
				}
				window.scrollTo(0, 0);
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.props.allNews.length == 0) {
					return _react2.default.createElement(
						'div',
						null,
						'Loading...'
					);
				}
				return _react2.default.createElement(
					'div',
					{ className: 'col-md-offset-1 col-md-10', style: { marginTop: '1em' } },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						this.props.allNews.map(function (news) {
							return _react2.default.createElement(_news_main_item2.default, { key: news.id, news: news });
						})
					),
					_react2.default.createElement(_pagination2.default, {
						currentPage: this.props.news_pagination.page,
						maxPage: this.props.news_pagination.maxPage,
						root_url: "/news"
					})
				);
			}
		}]);

		return NewsMain;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			allNews: state.allNews,
			news_pagination: state.news_pagination
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { getNewsWithPage: _news_actions.getNewsWithPage })(NewsMain);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _root_url = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewsMainItem = function (_Component) {
	    _inherits(NewsMainItem, _Component);

	    function NewsMainItem() {
	        _classCallCheck(this, NewsMainItem);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NewsMainItem).apply(this, arguments));
	    }

	    _createClass(NewsMainItem, [{
	        key: 'render',
	        value: function render() {
	            var url = _root_url.ROOT_URL + '/news_images/' + this.props.news.image_path;
	            var maxLength = 200;
	            var trimmedString = this.props.news.body.substr(0, maxLength);

	            //re-trim if we are in the middle of a word
	            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...';
	            if (this.props.news.body.length < 300) {
	                trimmedString = this.props.news.body;
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'col-md-4' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'card item' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'card-block' },
	                        _react2.default.createElement(
	                            'h4',
	                            { className: 'card-title' },
	                            this.props.news.title
	                        ),
	                        _react2.default.createElement(
	                            'h6',
	                            { className: 'card-subtitle text-muted' },
	                            this.props.news.created_on.replace(/T|Z/g, ' ')
	                        )
	                    ),
	                    _react2.default.createElement('img', { style: { width: '100%' }, src: url, alt: 'Card image' }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'card-block' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/news/' + this.props.news.id },
	                            _react2.default.createElement(
	                                'button',
	                                { type: 'button', className: 'btn btn-primary' },
	                                'Read more'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return NewsMainItem;
	}(_react.Component);

	exports.default = NewsMainItem;

	//<p className="card-text">{trimmedString}</p>

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Pagination = function (_Component) {
	    _inherits(Pagination, _Component);

	    function Pagination() {
	        _classCallCheck(this, Pagination);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).apply(this, arguments));
	    }

	    _createClass(Pagination, [{
	        key: 'renderNonActive',
	        value: function renderNonActive() {
	            var pagination = [];
	            /* Algorithm to find out which page numbers to show. A better one might exist. */
	            var leftMostPageNumber = 1;
	            var rightMostPageNumber = this.props.maxPage > 10 ? 9 : this.props.maxPage;

	            // this checks if the current page is more then 5. Then sets the page numbers accordingly
	            if (this.props.currentPage >= 5 && this.props.maxPage > 10) {
	                leftMostPageNumber = this.props.currentPage - 4;

	                // We've reached the end of pages. Need to truncate the last parts
	                if (this.props.currentPage + 4 > this.props.maxPage) {
	                    rightMostPageNumber = this.props.currentPage + (this.props.maxPage - this.props.currentPage);
	                    leftMostPageNumber = this.props.currentPage - (this.props.currentPage + 4 - rightMostPageNumber) - 4;
	                } else {
	                    rightMostPageNumber = this.props.currentPage + 4;
	                }
	            }
	            for (var i = leftMostPageNumber; i <= rightMostPageNumber; i++) {
	                if (i == this.props.currentPage) {
	                    pagination.push(_react2.default.createElement(
	                        'li',
	                        { key: i, className: 'page-item active' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: this.props.root_url + '?page=' + i, className: 'page-link' },
	                            i,
	                            ' ',
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'sr-only' },
	                                '(current)'
	                            )
	                        )
	                    ));
	                } else {
	                    pagination.push(_react2.default.createElement(
	                        'li',
	                        { key: i, className: 'page-item' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: this.props.root_url + '?page=' + i, className: 'page-link' },
	                            i
	                        )
	                    ));
	                }
	            }
	            return pagination;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'nav',
	                { 'aria-label': '...' },
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'pagination' },
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'page-item' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { className: 'page-link', to: this.props.root_url + '?page=1', 'aria-label': 'Previous' },
	                            _react2.default.createElement(
	                                'span',
	                                { 'aria-hidden': 'true' },
	                                '«'
	                            ),
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'sr-only' },
	                                'Previous'
	                            )
	                        )
	                    ),
	                    this.renderNonActive(),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'page-item' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { className: 'page-link', to: this.props.root_url + '?page=' + this.props.maxPage, 'aria-label': 'Next' },
	                            _react2.default.createElement(
	                                'span',
	                                { 'aria-hidden': 'true' },
	                                '»'
	                            ),
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'sr-only' },
	                                'Next'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Pagination;
	}(_react.Component);

	exports.default = Pagination;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(19);

	var _auth_actions = __webpack_require__(20);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Signin = function (_Component) {
		_inherits(Signin, _Component);

		function Signin() {
			_classCallCheck(this, Signin);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Signin).apply(this, arguments));
		}

		_createClass(Signin, [{
			key: 'onSubmit',
			value: function onSubmit(props) {
				this.props.signin(props);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var _props$fields = _props.fields;
				var email = _props$fields.email;
				var password = _props$fields.password;
				var handleSubmit = _props.handleSubmit;

				return _react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-offset-4 col-md-4', style: { marginTop: '1em' } },
						_react2.default.createElement(
							'form',
							{ onSubmit: handleSubmit(function (props) {
									return _this2.onSubmit(props);
								}) },
							_react2.default.createElement(
								'h3',
								null,
								'Sign in'
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Email'
								),
								_react2.default.createElement('input', _extends({ type: 'text', className: 'form-control' }, email))
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Password'
								),
								_react2.default.createElement('input', _extends({ type: 'password', className: 'form-control' }, password))
							),
							_react2.default.createElement(
								'button',
								{ type: 'submit', className: 'btn btn-primary' },
								'Sign in'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/', className: 'btn btn-danger', style: { marginLeft: 10 } },
								'Cancel'
							),
							_react2.default.createElement('br', null),
							' ',
							_react2.default.createElement('br', null),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/signup' },
								'Not Registered?'
							)
						)
					)
				);
			}
		}]);

		return Signin;
	}(_react.Component);

	exports.default = (0, _reduxForm.reduxForm)({
		form: 'PostsNewNews',
		fields: ['email', 'password']
	}, null, { signin: _auth_actions.signin })(Signin);

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AUTH_ERROR = exports.UNAUTH_USER = exports.AUTH_USER = undefined;
	exports.signin = signin;
	exports.signup = signup;
	exports.signout = signout;
	exports.authError = authError;

	var _axios = __webpack_require__(12);

	var _axios2 = _interopRequireDefault(_axios);

	var _root_url = __webpack_require__(10);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AUTH_USER = exports.AUTH_USER = 'AUTH_USER';
	var UNAUTH_USER = exports.UNAUTH_USER = 'UNAUTH_USER';
	var AUTH_ERROR = exports.AUTH_ERROR = 'AUTH_ERROR';

	function signin(props) {
		return function (dispatch) {
			var url = _root_url.ROOT_URL_SECURE + '/api/signin';

			//to send data as application/x-www-form-urlencoded
			var params = new URLSearchParams();
			params.append('email', props.email);
			params.append('password', props.password);
			params.append('expiresIn', '10h');

			_axios2.default.post(url, params).then(function (response) {
				if (!response.data.success) {
					dispatch(authError('Bad Login Info'));
					return;
				}
				dispatch({
					type: AUTH_USER,
					payload: response
				});
				localStorage.setItem('token', response.data.token);
				_reactRouter.browserHistory.push('/');
			}).catch(function () {
				dispatch(authError('Bad Login Info'));
			});
		};
	}

	function signup(props) {
		return function (dispatch) {
			var url = _root_url.ROOT_URL_SECURE + '/api/signup';

			//to send data as application/x-www-form-urlencoded
			var params = new URLSearchParams();
			params.append('email', props.email);
			params.append('password', props.password);
			params.append('expiresIn', '10h');

			_axios2.default.post(url, params).then(function (response) {
				if (!response.data.success) {
					dispatch(authError('Bad Login Info'));
					return;
				}
				dispatch({
					type: AUTH_USER,
					payload: response
				});
				localStorage.setItem('token', response.data.token);
				_reactRouter.browserHistory.push('/');
			}).catch(function () {
				dispatch(authError('Bad Login Info'));
			});
		};
	}

	function signout() {
		localStorage.removeItem('token');

		return { type: UNAUTH_USER };
	}

	function authError(error) {
		return {
			type: AUTH_ERROR,
			payload: error
		};
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(19);

	var _auth_actions = __webpack_require__(20);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Signin = function (_Component) {
		_inherits(Signin, _Component);

		function Signin() {
			_classCallCheck(this, Signin);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Signin).apply(this, arguments));
		}

		_createClass(Signin, [{
			key: 'onSubmit',
			value: function onSubmit(props) {
				this.props.signup(props);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var _props$fields = _props.fields;
				var email = _props$fields.email;
				var password = _props$fields.password;
				var handleSubmit = _props.handleSubmit;

				return _react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-offset-4 col-md-4', style: { marginTop: '1em' } },
						_react2.default.createElement(
							'form',
							{ onSubmit: handleSubmit(function (props) {
									return _this2.onSubmit(props);
								}) },
							_react2.default.createElement(
								'h3',
								null,
								'Sign up'
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Email'
								),
								_react2.default.createElement('input', _extends({ type: 'text', className: 'form-control' }, email))
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Password'
								),
								_react2.default.createElement('input', _extends({ type: 'password', className: 'form-control' }, password))
							),
							_react2.default.createElement(
								'button',
								{ type: 'submit', className: 'btn btn-primary' },
								'Sign up'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/', className: 'btn btn-danger', style: { marginLeft: 10 } },
								'Cancel'
							)
						)
					)
				);
			}
		}]);

		return Signin;
	}(_react.Component);

	exports.default = (0, _reduxForm.reduxForm)({
		form: 'PostsNewNews',
		fields: ['email', 'password']
	}, null, { signup: _auth_actions.signup })(Signin);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_actions = __webpack_require__(11);

	var _reactRedux = __webpack_require__(13);

	var _root_url = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewsItem = function (_Component) {
	    _inherits(NewsItem, _Component);

	    function NewsItem() {
	        _classCallCheck(this, NewsItem);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NewsItem).apply(this, arguments));
	    }

	    _createClass(NewsItem, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.props.destroyActiveNews();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.getNews(this.props.params.id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (!this.props.activeNews) {
	                return _react2.default.createElement(
	                    'div',
	                    null,
	                    'loading...'
	                );
	            }
	            var url = _root_url.ROOT_URL + '/news_images/' + this.props.activeNews.image_path;

	            return _react2.default.createElement(
	                'div',
	                { className: 'container' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-md-10' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'card' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'card-block' },
	                            _react2.default.createElement(
	                                'h4',
	                                { className: 'card-title' },
	                                this.props.activeNews.title
	                            ),
	                            _react2.default.createElement(
	                                'h6',
	                                { className: 'card-subtitle text-muted' },
	                                this.props.activeNews.created_on.replace(/T|Z/g, ' ')
	                            )
	                        ),
	                        _react2.default.createElement('img', { style: { width: '100%' }, src: url, alt: 'Card image' }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'card-block' },
	                            _react2.default.createElement(
	                                'p',
	                                { className: 'card-text' },
	                                this.props.activeNews.body
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return NewsItem;
	}(_react.Component);

	function mapStateToProps(state) {
	    return {
	        activeNews: state.activeNews
	    };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { getNews: _news_actions.getNews, destroyActiveNews: _news_actions.destroyActiveNews })(NewsItem);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(19);

	var _news_actions = __webpack_require__(11);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CreatePost = function (_Component) {
		_inherits(CreatePost, _Component);

		function CreatePost() {
			_classCallCheck(this, CreatePost);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CreatePost).apply(this, arguments));
		}

		_createClass(CreatePost, [{
			key: 'onSubmit',
			value: function onSubmit(props) {
				this.props.createPost(props);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				if (!this.props.authenticated) {
					return _react2.default.createElement(
						'div',
						null,
						'Loading...'
					);
				}
				var _props = this.props;
				var _props$fields = _props.fields;
				var title = _props$fields.title;
				var body = _props$fields.body;
				var news_image = _props$fields.news_image;
				var handleSubmit = _props.handleSubmit;

				return _react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-offset-3 col-md-6', style: { marginTop: '1em' } },
						_react2.default.createElement(
							'form',
							{ onSubmit: handleSubmit(function (props) {
									return _this2.onSubmit(props);
								}) },
							_react2.default.createElement(
								'h3',
								null,
								'Create A New Post'
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Title'
								),
								_react2.default.createElement('input', _extends({ type: 'text', className: 'form-control' }, title))
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Body'
								),
								_react2.default.createElement('textarea', _extends({ className: 'form-control' }, body))
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'label',
									null,
									'Upload a file'
								),
								_react2.default.createElement('input', _extends({ type: 'file', className: 'form-control' }, news_image, { value: null }))
							),
							_react2.default.createElement(
								'button',
								{ type: 'submit', className: 'btn btn-primary' },
								'Submit'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/', className: 'btn btn-danger', style: { marginLeft: 10 } },
								'Cancel'
							)
						)
					)
				);
			}
		}]);

		return CreatePost;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			authenticated: state.authentication.authenticated
		};
	}

	exports.default = (0, _reduxForm.reduxForm)({
		form: 'PostsNewNews',
		fields: ['title', 'body', 'news_image']
	}, mapStateToProps, { createPost: _news_actions.createPost })(CreatePost);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (ComposedComponent) {
	  var Authentication = function (_Component) {
	    _inherits(Authentication, _Component);

	    function Authentication() {
	      _classCallCheck(this, Authentication);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(Authentication).apply(this, arguments));
	    }

	    _createClass(Authentication, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        if (!this.props.authenticated) {
	          this.context.router.push('/signin');
	        }
	      }
	    }, {
	      key: 'componentWillUpdate',
	      value: function componentWillUpdate(nextProps) {
	        if (!nextProps.authenticated) {
	          this.context.router.push('/signin');
	        }
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(ComposedComponent, this.props);
	      }
	    }]);

	    return Authentication;
	  }(_react.Component);

	  Authentication.contextTypes = {
	    router: _react2.default.PropTypes.object
	  };


	  function mapStateToProps(state) {
	    return { authenticated: state.authentication.authenticated };
	  }

	  return (0, _reactRedux.connect)(mapStateToProps)(Authentication);
	};

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _reactRedux = __webpack_require__(13);

	var _auth_actions = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_Component) {
	    _inherits(Header, _Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	    }

	    _createClass(Header, [{
	        key: 'redirectAuth',
	        value: function redirectAuth() {
	            if (this.props.authentication.authenticated) {
	                this.props.signout();
	            } else {
	                _reactRouter.browserHistory.push('/signin');
	            }
	        }
	    }, {
	        key: 'renderCreatePost',
	        value: function renderCreatePost() {
	            if (this.props.authentication.authenticated) {
	                return _react2.default.createElement(
	                    'li',
	                    { className: 'nav-item active' },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/create/news' },
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', className: 'btn top_nav_buttons' },
	                            'Create News'
	                        )
	                    )
	                );
	            } else {
	                return _react2.default.createElement('div', null);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var auth_state;
	            if (this.props.authentication.authenticated) {
	                auth_state = 'Sign out';
	            } else {
	                auth_state = 'Sign in';
	            }
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4 col-md-offset-5 col-md-2 col-lg-offset-0 col-lg-2' },
	                        _react2.default.createElement('img', { style: { width: '100%' }, src: 'http://samaggisamagom.org/resources/samaggi.jpg' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-xs-12 col-md-12 col-lg-10 top_nav' },
	                        _react2.default.createElement(
	                            'nav',
	                            { className: 'navbar' },
	                            _react2.default.createElement(
	                                'button',
	                                { className: 'navbar-toggler hidden-lg-up', type: 'button', 'data-toggle': 'collapse', 'data-target': '#exCollapsingNavbar2' },
	                                '☰'
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'collapse navbar-toggleable-md', id: 'exCollapsingNavbar2' },
	                                _react2.default.createElement(
	                                    'ul',
	                                    { className: 'nav navbar-nav' },
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'nav-item active' },
	                                        _react2.default.createElement(
	                                            _reactRouter.Link,
	                                            { to: '/' },
	                                            _react2.default.createElement(
	                                                'button',
	                                                { type: 'button', className: 'btn top_nav_buttons' },
	                                                'Home'
	                                            )
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'nav-item active' },
	                                        _react2.default.createElement(
	                                            _reactRouter.Link,
	                                            { to: '/news' },
	                                            _react2.default.createElement(
	                                                'button',
	                                                { type: 'button', className: 'btn top_nav_buttons' },
	                                                'News'
	                                            )
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'nav-item' },
	                                        _react2.default.createElement(
	                                            'button',
	                                            { type: 'button', className: 'btn top_nav_buttons' },
	                                            'Events'
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'nav-item' },
	                                        _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Search' })
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'nav-item' },
	                                        _react2.default.createElement(
	                                            'button',
	                                            { type: 'button', className: 'btn top_nav_buttons', onClick: function onClick() {
	                                                    return _this2.redirectAuth();
	                                                } },
	                                            auth_state
	                                        )
	                                    ),
	                                    this.renderCreatePost()
	                                )
	                            )
	                        )
	                    )
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return Header;
	}(_react.Component);

	function mapStateToProps(state) {
	    return { authentication: state.authentication };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { signout: _auth_actions.signout })(Header);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(27);

	var _news_reducers = __webpack_require__(28);

	var _reduxForm = __webpack_require__(19);

	var _auth_reducers = __webpack_require__(29);

	var _auth_reducers2 = _interopRequireDefault(_auth_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
		allNews: _news_reducers.news,
		form: _reduxForm.reducer,
		activeNews: _news_reducers.news_active,
		authentication: _auth_reducers2.default,
		news_pagination: _news_reducers.news_pagination
	});

	exports.default = rootReducer;

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.news = news;
	exports.news_active = news_active;
	exports.news_pagination = news_pagination;

	var _news_actions = __webpack_require__(11);

	function news() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _news_actions.PAGE_NEWS:
	            return action.payload.data.news;
	        case _news_actions.TOP_NEWS:
	            return action.payload.data.news;
	    }
	    return state;
	}

	function news_active() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _news_actions.ACTIVE_NEWS:
	            return action.payload.data.news;
	    }
	    return state;
	}

	function news_pagination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? { page: null, maxNews: 10, maxPage: 10 } : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _news_actions.PAGINATION_NEWS:
	            return {
	                page: action.page,
	                maxNews: action.payload.data.maxNews,
	                maxPage: action.payload.data.maxPage
	            };
	    }
	    return state;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _auth_actions.AUTH_USER:
	            return _extends({}, state, { error: '', authenticated: true });
	        case _auth_actions.UNAUTH_USER:
	            return _extends({}, state, { authenticated: false });
	        case _auth_actions.AUTH_ERROR:
	            return _extends({}, state, { error: action.payload });

	    }
	    return state;
	};

	var _auth_actions = __webpack_require__(20);

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var bodyParser = __webpack_require__(32);
	var bcrypt = __webpack_require__(33);
	var jwt = __webpack_require__(34);
	var multer = __webpack_require__(35);
	var mime = __webpack_require__(36);
	var crypto = __webpack_require__(37);

	var storage = multer.diskStorage({
		destination: function destination(req, file, cb) {
			cb(null, './news_images');
		},
		filename: function filename(req, file, cb) {
			crypto.randomBytes(20, function (err, buf) {
				if (err) console.log(err);
				cb(null, buf.toString('hex') + "-" + Date.now() + '.' + mime.extension(file.mimetype));
			});
		}
	});
	var upload = multer({ storage: storage });

	router.use(bodyParser.json()); // for parsing application/json
	router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	var NEWS_LIMIT = 9;

	var mysql = __webpack_require__(38);
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'TAHNIK',
		password: 'jE*ah5jU',
		database: 'SAMAGGI'
	});

	var superSecret = "x32PA5ERecH2T7UChageJ?5$$su?E7ab";

	connection.connect();

	router.post('/signup', function (req, res) {
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);
		var signUpQuery = "INSERT INTO users (email, password, salt) VALUES(" + connection.escape(req.body.email) + "," + connection.escape(password) + "," + connection.escape(salt) + ")";
		connection.query(signUpQuery, function (err, result) {
			var token = jwt.sign({ email: req.body.email, id: result.insertId }, superSecret, { expiresIn: req.body.expiresIn });
			res.json({
				success: true,
				id: result.insertId,
				token: token
			});
		});
	});

	router.post('/signin', function (req, res) {
		var getUserQuery = "SELECT * FROM users WHERE email=" + connection.escape(req.body.email);
		connection.query(getUserQuery, function (err, result) {
			if (err) console.log(err);
			if (result.length === 0) {
				res.json({
					success: false,
					message: "User doesn't exists",
					errorcode: 0
				});
			} else if (typeof req.body.expiresIn === 'undefined') {
				res.json({
					success: false,
					message: "No token expiry time included in request body"
				});
			} else if (result.length === 1) {
				var email = result[0].email;
				var salt = result[0].salt;
				var passwordFromDB = result[0].password;
				var passwordFromReq = req.body.password;

				if (bcrypt.hashSync(passwordFromReq, salt) === passwordFromDB) {
					var token = jwt.sign({ email: email, id: result[0].id }, superSecret, { expiresIn: req.body.expiresIn });
					res.json({
						success: true,
						message: "Enjoy your token",
						token: token
					});
				} else {
					res.json({
						success: false,
						message: "User authentication failed. Wrong password"
					});
				}
			}
		});
	});

	router.get('/news', function (req, res) {
		getNewsMax(req, res, getNewsByPage);
	});

	var getNewsByPage = function getNewsByPage(page, maxNews, res) {
		//First calculating the number of possible pages by dividing total number
		//of news by NEWS_LIMIT. NEWS_LIMIT here is a static number for limiting the number of news
		//in a page
		var numberOfPages = Math.ceil(maxNews / NEWS_LIMIT);
		console.log(numberOfPages);
		if (page > numberOfPages) {
			return res.json({
				success: false,
				message: "Page doesn't exists"
			});
		}
		/* Here the offset is from which id the we will return the news.
	  * For example, if the page is 1 we want to send the first 10 most recent news
	  */
		var offset = maxNews - (page - 1) * NEWS_LIMIT;
		var getNewsQuery = "SELECT * FROM news WHERE id <= " + offset + " ORDER BY id DESC LIMIT " + NEWS_LIMIT;
		connection.query(getNewsQuery, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				return res.json({
					success: true,
					news: result,
					maxNews: maxNews,
					maxPage: numberOfPages
				});
			}
		});
	};

	var getNewsMax = function getNewsMax(req, res, callback) {
		var getNewsMaxQuery = "SELECT MAX(id) as MAX_NEWS_ID FROM news";
		connection.query(getNewsMaxQuery, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				callback(req.query.page, result[0].MAX_NEWS_ID, res);
			}
		});
	};

	router.get('/news/top', function (req, res) {
		var getNewsQuery = "SELECT * FROM news ORDER BY id DESC LIMIT 5";
		connection.query(getNewsQuery, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				return res.json({
					success: true,
					news: result
				});
			}
		});
	});

	router.get('/news/:id', function (req, res) {
		var getNewsQuery = "SELECT * FROM news WHERE id=" + req.params.id;
		connection.query(getNewsQuery, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				return res.json({
					success: true,
					news: result[0]
				});
			}
		});
	});

	router.post('/news', upload.single('news_image'), function (req, res) {
		console.log(req.body.token);
		if (!req.body.token && !req.body.Token) {
			return res.json({
				success: false,
				message: "No token provided"
			});
		}
		jwt.verify(req.body.token, superSecret, function (err, decoded) {
			if (err) {
				return res.json({
					success: false,
					message: "Token is not valid"
				});
			} else {
				var title = req.body.title;
				var body = req.body.body;
				var user_id = decoded.id;

				if (title != "" || body != "") {
					var insertNewsQuery = "INSERT INTO news (user_id, title, image_path, body) VALUES(" + connection.escape(user_id) + "," + connection.escape(title) + "," + connection.escape(req.file.filename) + "," + connection.escape(body) + ")";
					connection.query(insertNewsQuery, function (err, result) {
						if (err) {
							console.log(err);
							res.json({
								success: false,
								message: "Failed to insert data"
							});
						} else {
							return res.json({
								success: true
							});
						}
					});
				} else {
					return res.json({
						success: false,
						message: "News Title or Body is empty"
					});
				}
			}
		});
	});

	module.exports = router;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("mysql");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var path = __webpack_require__(30);
	var fs = __webpack_require__(40);
	var sharp = __webpack_require__(41);

	router.get('/*', function (req, res) {
	    var fileUrl = path.join('.', req.originalUrl);
	    fs.readFile(fileUrl, function (err, data) {
	        if (err) {
	            return console.error(err);
	        } else {
	            sharp(data).resize(800, 600).toBuffer(function (err, buffer) {
	                // output.jpg is a 300 pixels wide and 200 pixels high image
	                // containing a scaled and cropped version of input.jpg
	                return res.send(buffer);
	            });
	        }
	    });
	});

	module.exports = router;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("sharp");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ }
/******/ ]);