var express = require('express');
var app = express();
var index = require('./routes/index');
var api = require('./routes/api');
var newsImage = require('./routes/news_image');
var cors = require('cors');

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
