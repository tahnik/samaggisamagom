var express = require('express');
var app = express();
var index = require('./routes/index');
var api = require('./routes/api');
var newsImage = require('./routes/news_image');


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
