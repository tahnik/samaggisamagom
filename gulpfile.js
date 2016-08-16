// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var webpack = require('webpack-stream');

// Task
gulp.task('script', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'bin/server.bundle.js',
		ext: 'js',
		watch: './public/stylesheets/main.css'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('bin/server.bundle.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
});



gulp.task('default', ['script']);