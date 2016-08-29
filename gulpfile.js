var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var sourceMaps = require('gulp-sourcemaps');

gulp.task('build', function(){
	gulp.src('./src/*.js')
	.pipe(sourceMaps.init())
	.pipe(browserify({
		insertGlobals: true,
	})).on('error', gutil.log)
	.pipe(sourceMaps.write('./'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
	gulp.watch('./src/*.js', ['build']);
})