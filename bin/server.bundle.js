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
	var api = __webpack_require__(25);
	var newsImage = __webpack_require__(33);

	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', 'http://samaggisamagom.org');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});

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

	var _index = __webpack_require__(20);

	var _index2 = _interopRequireDefault(_index);

	var _redux = __webpack_require__(21);

	var _reactRedux = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(1);
	var router = express.Router();
	var path = __webpack_require__(24);

	var React = __webpack_require__(6);

	router.get('/', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
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

	      res.status(200).send(renderFullPage(html, finalState));
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
	});

	function renderFullPage(html, initialState) {
	  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n    \t<!-- Required meta tags always come first -->\n    \t<meta charset="utf-8">\n    \t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    \t<meta http-equiv="x-ua-compatible" content="ie=edge">\n\n    \t<!-- Bootstrap CSS -->\n    \t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">\n    \t<link rel="stylesheet" href="../stylesheets/main.css">\n    </head>\n    <body>\n\n    \t<div id="reactbody"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n          </script>\n    \t<script src="../bin/app.bundle.js"></script>\n    \t<!-- jQuery first, then Bootstrap JS. -->\n    \t<script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script>\n    \t<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>\n    \t<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>\n    </body>\n    </html>\n    ';
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

	var _news = __webpack_require__(13);

	var _news2 = _interopRequireDefault(_news);

	var _signin = __webpack_require__(16);

	var _signin2 = _interopRequireDefault(_signin);

	var _news_item = __webpack_require__(18);

	var _news_item2 = _interopRequireDefault(_news_item);

	var _header = __webpack_require__(19);

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

	var _news_home_grid = __webpack_require__(8);

	var _news_home_grid2 = _interopRequireDefault(_news_home_grid);

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
	                _react2.default.createElement(_news_home_grid2.default, null)
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

	var _news_actions = __webpack_require__(10);

	var _reactRedux = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewsHomeGrid = function (_Component) {
		_inherits(NewsHomeGrid, _Component);

		function NewsHomeGrid() {
			_classCallCheck(this, NewsHomeGrid);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NewsHomeGrid).apply(this, arguments));
		}

		_createClass(NewsHomeGrid, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.getAllNews();
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

		return NewsHomeGrid;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			allNews: state.allNews
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { getAllNews: _news_actions.getAllNews })(NewsHomeGrid);

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

	var _root_url = __webpack_require__(36);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ACTIVE_NEWS = exports.CREATE_POST = exports.ALL_NEWS = undefined;
	exports.getAllNews = getAllNews;
	exports.createPost = createPost;
	exports.getNews = getNews;

	var _axios = __webpack_require__(11);

	var _axios2 = _interopRequireDefault(_axios);

	var _root_url = __webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ALL_NEWS = exports.ALL_NEWS = 'ALL_NEWS';
	var CREATE_POST = exports.CREATE_POST = 'CREATE_POST';
	var ACTIVE_NEWS = exports.ACTIVE_NEWS = 'ACTIVE_NEWS';

	function getAllNews() {
	    var url = _root_url.ROOT_URL_SECURE + '/api/news';

	    var request = _axios2.default.get(url);

	    return {
	        type: ALL_NEWS,
	        payload: request
	    };
	}

	function createPost(props) {
	    var url = _root_url.ROOT_URL_SECURE + '/api/news';

	    var body = new FormData();
	    Object.keys(props).forEach(function (key) {
	        if (key == "news_image") {
	            body.append(key, props[key][0]);
	        } else {
	            body.append(key, props[key]);
	        }
	    });

	    var request = _axios2.default.post(url, body);

	    return {
	        type: CREATE_POST,
	        payload: request
	    };
	}

	function getNews(id) {
	    var url = _root_url.ROOT_URL_SECURE + '/api/news/' + id;

	    var request = _axios2.default.get(url);

	    return {
	        type: ACTIVE_NEWS,
	        payload: request
	    };
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_main = __webpack_require__(14);

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
	                _react2.default.createElement(_news_main2.default, null)
	            );
	        }
	    }]);

	    return News;
	}(_react.Component);

	exports.default = News;

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

	var _news_main_item = __webpack_require__(15);

	var _news_main_item2 = _interopRequireDefault(_news_main_item);

	var _news_actions = __webpack_require__(10);

	var _reactRedux = __webpack_require__(12);

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
			value: function componentDidMount() {
				this.props.getAllNews();
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
					{ className: 'col-md-offset-1 col-md-10', style: { marginTop: '1em', marginLeft: '2vw' } },
					this.props.allNews.map(function (news) {
						return _react2.default.createElement(_news_main_item2.default, { key: news.id, news: news });
					})
				);
			}
		}]);

		return NewsMain;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			allNews: state.allNews
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { getAllNews: _news_actions.getAllNews })(NewsMain);

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

	var _reactRouter = __webpack_require__(4);

	var _root_url = __webpack_require__(36);

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
	                )
	            );
	        }
	    }]);

	    return NewsMainItem;
	}(_react.Component);

	exports.default = NewsMainItem;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(17);

	var _news_actions = __webpack_require__(10);

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
				var _this2 = this;

				this.props.createPost(props).then(function () {
					// blog post has been created, navigate the user to the index
					// We navigate by calling this.context.router.push with the
					// new path to navigate to.
					_this2.context.router.push('/');
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

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
									return _this3.onSubmit(props);
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

		return Signin;
	}(_react.Component);

	Signin.contextTypes = {
		router: _react.PropTypes.object
	};
	exports.default = (0, _reduxForm.reduxForm)({
		form: 'PostsNewNews',
		fields: ['title', 'body', 'news_image']
	}, null, { createPost: _news_actions.createPost })(Signin);

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _news_actions = __webpack_require__(10);

	var _reactRedux = __webpack_require__(12);

	var _root_url = __webpack_require__(36);

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

	exports.default = (0, _reactRedux.connect)(mapStateToProps, { getNews: _news_actions.getNews })(NewsItem);

/***/ },
/* 19 */
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

	var Header = function (_Component) {
	    _inherits(Header, _Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	    }

	    _createClass(Header, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4 col-md-offset-5 col-md-2 col-lg-offset-0 col-lg-2' },
	                        _react2.default.createElement('img', { style: { width: '100%' }, src: 'http://samaggisamagom.org/resources/samaggi.png' })
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
	                                            _reactRouter.Link,
	                                            { to: '/signin' },
	                                            _react2.default.createElement(
	                                                'button',
	                                                { type: 'button', className: 'btn top_nav_buttons' },
	                                                'Sign in'
	                                            )
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'nav-item' },
	                                        _react2.default.createElement(
	                                            'button',
	                                            { type: 'button', className: 'btn top_nav_buttons' },
	                                            'Register'
	                                        )
	                                    )
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

	exports.default = Header;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(21);

	var _news_reducers = __webpack_require__(22);

	var _news_reducers2 = _interopRequireDefault(_news_reducers);

	var _news_active_reducers = __webpack_require__(23);

	var _news_active_reducers2 = _interopRequireDefault(_news_active_reducers);

	var _reduxForm = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
		allNews: _news_reducers2.default,
		form: _reduxForm.reducer,
		activeNews: _news_active_reducers2.default
	});

	exports.default = rootReducer;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _news_actions.ALL_NEWS:
	            return action.payload.data.news;
	    }
	    return state;
	};

	var _news_actions = __webpack_require__(10);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _news_actions.ACTIVE_NEWS:
	            return action.payload.data.news;
	    }
	    return state;
	};

	var _news_actions = __webpack_require__(10);

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var bodyParser = __webpack_require__(26);
	var bcrypt = __webpack_require__(27);
	var jwt = __webpack_require__(28);
	var multer = __webpack_require__(29);
	var mime = __webpack_require__(30);
	var crypto = __webpack_require__(31);

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


	var mysql = __webpack_require__(32);
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
			res.json({
				success: true,
				id: result.insertId
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

	router.get('/news/:id', function (req, res) {
		var getNewsQuery = "SELECT * FROM news WHERE id=" + req.params.id;
		connection.query(getNewsQuery, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(Date.now());
				return res.json({
					success: true,
					news: result[0]
				});
			}
		});
	});

	router.get('/news/', function (req, res) {
		var getNewsQuery = "SELECT * FROM news";
		connection.query(getNewsQuery, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(Date.now());
				return res.json({
					success: true,
					news: result
				});
			}
		});
	});

	router.post('/news', upload.single('news_image'), function (req, res) {
		// if(!req.body.token && !req.body.Token) {
		// 	return res.json({
		// 		success: false,
		// 		message: "No token provided"
		// 	})
		// }
		// jwt.verify(req.body.token, superSecret, function(err, decoded) {
		// 	if(err) {
		// 		return res.json({
		// 			success: false,
		// 			message: "Token is not valid"
		// 		})
		// 	} else {
		var title = req.body.title;
		var body = req.body.body;
		var user_id = 2;
		// var user_id = decoded.id;

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
		// 	}
		// })
	});

	module.exports = router;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("mysql");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();
	var path = __webpack_require__(24);
	var fs = __webpack_require__(34);
	var sharp = __webpack_require__(35);

	router.get('/*', function (req, res) {
	    var fileUrl = path.join('.', req.originalUrl);
	    console.log(fileUrl);
	    fs.readFile(fileUrl, function (err, data) {
	        if (err) {
	            return console.error(err);
	        } else {
	            sharp(data).extract({ left: 200, top: 100, width: 800, height: 600 }).resize(800, 600).toBuffer(function (err, buffer) {
	                // output.jpg is a 300 pixels wide and 200 pixels high image
	                // containing a scaled and cropped version of input.jpg
	                return res.send(buffer);
	            });
	        }
	    });
	});

	module.exports = router;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("sharp");

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ROOT_URL = exports.ROOT_URL = "http://localhost:3000";
	var ROOT_URL_SECURE = exports.ROOT_URL_SECURE = "http://localhost:3000";

/***/ }
/******/ ]);