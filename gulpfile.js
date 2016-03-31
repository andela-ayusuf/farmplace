var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');


// clean the build directory
gulp.task('clean', function() {
  return del.sync('build');
});

// minify css and js files
gulp.task('minify', function() {
  return gulp.src('public/index.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('build'))
});

// optimize images
gulp.task('imgMin', function(){
  return gulp.src('public/assets/img/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('build/img'))
});

// start app
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('default', function() {
  runSequence('clean', ['minify', 'imgMin'], 'nodemon')
});

