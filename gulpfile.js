var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

var jsFiles = ['public/app/controllers/*.js', 'public/app/services/*.js', 'public/app/app.js'];
var cssFiles = 'public/assets/css/*.css';
// var imgFiles = 'public/assets/images/*';

// minify js files
gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// minify css files
gulp.task('stylesheets', function () {
  gulp.src(cssFiles)
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'));
});

// minify images
// gulp.task('images', function () {
//   return gulp.src(imgFiles)
//     .pipe(imagemin({
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],
//       use: [pngquant()]
//     }))
//     .pipe(gulp.dest('build/images'));
// });

// clean up
gulp.task('clean', function() {
  return del(['build/js', 'build/css']);
});

// start app
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'stylesheets', 'nodemon');
});



