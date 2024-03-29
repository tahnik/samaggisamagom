var express = require('express');
var app = express();
var index = require('./routes/index');
var api = require('./routes/api');
var cors = require('cors');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var accessLogStream = fs.createWriteStream(path.join('./', __dirname, 'logs/access.log'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}))

app.use(cors());

app.use('/api', api);
app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));
app.use('/resources', express.static('./public/resources'));
app.use('/javascripts', express.static('./public/javascripts'));
app.use('/news_images/small', express.static('./news_images/small'));
app.use('/news_images/medium', express.static('./news_images/medium'));
app.use('/news_images/large', express.static('./news_images/large'));


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
