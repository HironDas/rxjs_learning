var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');

gulp.task('build', function(){
	gulp.src('./src/*.js')
	.pipe(browserify({
		insertGlobals: true,
	})).on('error', gutil.log)
	.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
	gulp.watch('./src/*.js', ['build']);
})