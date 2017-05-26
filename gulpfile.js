var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Static server + watching scss/html files
gulp.task('browser-sync', function() {
     var files = [
      '*.html',
      'styles/css/**/*.css',
      'js/**/*.js',
      'styles/sass/**/*.scss'
   ];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    gulp.src("styles/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("styles/css/"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['browser-sync'] , function() {
    gulp.watch("styles/scss/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("wiki/*.html").on('change', browserSync.reload);
});