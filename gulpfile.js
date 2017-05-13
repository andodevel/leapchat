var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    sass = require('gulp-sass');

var jsFiles = ['*.js', 'src/**/*.js'];


gulp.task('default', ['sass:watch']);

gulp.task('sass', function () {
  return gulp.src('./static/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static/sass/**/*.scss', ['sass', 'inject']);
});


gulp.task('useref', function(){
  return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('build'));
});


gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./static/css/*.css',
                             './static/js/*.js'], {read: false});
    var injectOptions = {
        ignorePath: '/static'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './static/lib'
    };

    return gulp.src('./index.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./'));

});
