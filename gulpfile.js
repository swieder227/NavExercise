var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');


// Task to compile sass, autoprefix, create min and reload live
gulp.task('styles', function() {
  return gulp.src('public/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 Chrome versions'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/styles'));
    // .pipe(rename({suffix: '.min'}))
    // .pipe(minifycss())
    // .pipe(gzip())
    // .pipe(gulp.dest('css'))
    // .pipe(connect.reload())
    // .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function () {
  // gulp.watch('./css/app.css', ['live']);
  gulp.watch('public/styles/*.scss', ['styles'])
});

gulp.task('default', ['styles', 'watch']);