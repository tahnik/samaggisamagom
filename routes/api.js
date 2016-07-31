var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer  = require('multer');
var mime = require('mime');
var crypto = require('crypto');


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './news_images')
	},
	filename: function (req, file, cb) {
		crypto.randomBytes(20, (err, buf) => {
			if (err) console.log(err);
			cb(null, buf.toString('hex') + "-" + Date.now() + '.' + mime.extension(file.mimetype));
		});
	}
})
var upload = multer({ storage: storage });

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const NEWS_LIMIT = 6;
const EMAIL_VALIDATOR_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATOR_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

var mysql      = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'TAHNIK',
	password: 'jE*ah5jU',
	database: 'SAMAGGI'
});

const USER_ROLE = 0;

const superSecret = "x32PA5ERecH2T7UChageJ?5$$su?E7ab";

connection.connect();

var sendSuccessResponse = function(res, response){
	return res.status("200").json(response);
}

var getUserRole = function(res, user_id, successResponse, callback) {
	var getUserRoleQuery = "SELECT * FROM user_roles WHERE user_id=" + user_id;
	connection.query(getUserRoleQuery, function(err, result) {
		if(err) {
			return res.status("500").json({
				success: false,
				message: "Internal Server Error. Try again"
			})
		} else {
			successResponse.role = result[0].role;
			callback(successResponse);
		}
	})
}

var setUserRole = function(res, user_id, successResponse, callback) {
	console.log("User id is: " + user_id);
	var userRoleQuery = "INSERT INTO user_roles (user_id, role) VALUES("
						+ user_id + ","
						+ USER_ROLE + ")";
	connection.query(userRoleQuery, function(err, result) {
		if(err) {
			return res.status("500").json({
				success: false,
				message: "Internal Server Error. Try again"
			})
		}else {
			successResponse.role = USER_ROLE;
			callback(successResponse);
		}
	})
}

var checkAuthCredentials = function(req, res, callback) {
	console.log("Checking credentials");
	if(EMAIL_VALIDATOR_REGEX.exec(req.body.email) === null){
		return res.status("400").json({
			success: false,
			message: "Email not valid"
		});
	} else if(PASSWORD_VALIDATOR_REGEX.exec(req.body.password) === null) {
		return res.status("400").json({
			success: false,
			message: "Password not valid"
		});
	} else if(!req.body.expiresIn) {
		return res.status("400").json({
			success: false,
			message: "No expiresIn in the body"
		});
	}
	callback();
}

var checkUserExists = function(req, res, exitIfExists, callback) {
	console.log("Checking user's existence");
	var userAlreadyExistsQuery = "SELECT COUNT(*) AS USER_EXISTS FROM users WHERE email=" + connection.escape(req.body.email);
	connection.query(userAlreadyExistsQuery, function(err, result) {
		if(err) {
			return res.status("500").json({
				succes: false,
				message: "Internal Server Error"
			})
		}else {
			if(exitIfExists) {
				if(result[0].USER_EXISTS){
					return res.json({
						success: false,
						message: "User already exists"
					})
				}
			} else {
				if(!result[0].USER_EXISTS){
					return res.json({
						success: false,
						message: "User doesn't exists"
					})
				}
			}
			callback();
		}
	})
}

var signIn = function(req, res, callback) {
	var getUserQuery = "SELECT * FROM users WHERE email=" + connection.escape(req.body.email);
	connection.query(getUserQuery, function(err, result) {
		if(err) {
			console.log(err);
		}else{
			var user_id = result[0].id;
			var email = result[0].email;
			var salt = result[0].salt;
			var passwordFromDB = result[0].password;
			var passwordFromReq = req.body.password;

			if(bcrypt.hashSync(passwordFromReq, salt) === passwordFromDB) {
				var token = jwt.sign({email: email, id: result[0].id}, superSecret, {expiresIn: req.body.expiresIn});
				var successResponse = {
					success: true,
					message: "Enjoy your token",
					token: token
				}
				callback(user_id, successResponse);
			} else {
				res.json({
					success: false,
					message: "User authentication failed. Wrong password"
				})
			}
		}
	})
}


var signUp = function(req, res, callback) {
	console.log("Signing Up");
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(req.body.password, salt);
	var signUpQuery = "INSERT INTO users (email, password, salt) VALUES("
						+ connection.escape(req.body.email) + ","
						+ connection.escape(password) + ","
						+ connection.escape(salt) + ")";
	connection.query(signUpQuery, function(err, result) {
		if(err) {
			return res.status("500").json({
				success: false,
				message: "Internal Server Error. Try again"
			})
		}else {
			var user_id = result.insertId;

			var token = jwt.sign({email: req.body.email, id: user_id}, superSecret, {expiresIn: req.body.expiresIn});

			var successResponse = {
				success: true,
				id: user_id,
				token: token
			}
			callback(user_id, successResponse);
		}
	})
}



router.post('/signup', function(req, res) {
	checkAuthCredentials(req, res, function() {
		checkUserExists(req, res, true, function(){
			signUp(req, res, function(user_id, successResponse) {
				setUserRole(res, user_id, successResponse, function(response) {
					sendSuccessResponse(res, response);
				});
			})
		})
	})
})

router.post('/signin', function(req, res) {
	checkAuthCredentials(req, res, function() {
		checkUserExists(req, res, false, function() {
			signIn(req, res, function(user_id, successResponse){
				getUserRole(res, user_id, successResponse, function(response) {
					sendSuccessResponse(res, response);
				})
			})
		})
	})
})


router.get('/news', function(req, res) {
	getNewsMax(req, res, getNewsByPage);
})

var getNewsByPage = function(page, maxNews, res) {
	//First calculating the number of possible pages by dividing total number
	//of news by NEWS_LIMIT. NEWS_LIMIT here is a static number for limiting the number of news
	//in a page
	var numberOfPages = Math.ceil(maxNews/NEWS_LIMIT);
	console.log(numberOfPages);
	if(page > numberOfPages) {
		return res.json({
			success: false,
			message: "Page doesn't exists"
		})
	}
	/* Here the offset is from which id the we will return the news.
	 * For example, if the page is 1 we want to send the first 10 most recent news
	 */
	var offset = maxNews - ((page - 1) * NEWS_LIMIT);
	var getNewsQuery = "SELECT * FROM news WHERE id <= " + offset + " ORDER BY id DESC LIMIT " + NEWS_LIMIT;
	connection.query(getNewsQuery, function(err, result) {
		if(err) {
			console.log(err);
		}else {
			return res.json({
				success: true,
				news: result,
				maxNews: maxNews,
				maxPage: numberOfPages
			})
		}
	})
}

var getNewsMax = function(req, res, callback) {
	var getNewsMaxQuery = "SELECT MAX(id) as MAX_NEWS_ID FROM news";
	connection.query(getNewsMaxQuery, function(err, result) {
		if(err) {
			console.log(err);
		}else {
			callback(req.query.page, result[0].MAX_NEWS_ID, res);
		}
	})
}

router.get('/news/top', function(req, res) {
	var getNewsQuery = "SELECT * FROM news ORDER BY id DESC LIMIT 5";
	connection.query(getNewsQuery, function(err, result) {
		if(err) {
			console.log(err);
		}else {
			return res.json({
				success: true,
				news: result
			})
		}
	})
})

router.get('/news/:id', function(req, res) {
	var getNewsQuery = "SELECT * FROM news WHERE id=" + req.params.id;
	connection.query(getNewsQuery, function(err, result) {
		if(err) {
			console.log(err);
		}else {
			return res.json({
				success: true,
				news: result[0]
			})
		}
	})
})


router.post('/news', upload.single('news_image'), function(req, res) {
	console.log(req.body.token);
	if(!req.body.token && !req.body.Token) {
		return res.json({
			success: false,
			message: "No token provided"
		})
	}
	jwt.verify(req.body.token, superSecret, function(err, decoded) {
		if(err) {
			return res.json({
				success: false,
				message: "Token is not valid"
			})
		} else {
			var title = req.body.title;
			var body = req.body.body;
			var user_id = decoded.id;

			if( title != "" || body != "") {
				var insertNewsQuery = "INSERT INTO news (user_id, title, image_path, body) VALUES("
									+ connection.escape(user_id) + ","
									+ connection.escape(title) + ","
									+ connection.escape(req.file.filename) + ","
									+ connection.escape(body) + ")";
				connection.query(insertNewsQuery, function(err, result) {
					if(err) {
						console.log(err);
						res.json({
							success: false,
							message: "Failed to insert data"
						})
					}else {
						return res.json({
							success: true
						})
					}
				})
			} else {
				return res.json({
					success: false,
					message: "News Title or Body is empty"
				})
			}
		}
	})
})

module.exports = router;
