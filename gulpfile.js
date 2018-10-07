var gulp = require('gulp'),
    minify = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync').create();

gulp.task('default', ['browsersync', 'watch']);

gulp.task('browsersync', function () {
    bs.init({
        server: "./",
        port: 8080
    });
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['style']);
    gulp.watch('script/script.js', ['script']);
    bs.watch('*.html').on('change', bs.reload);
});

gulp.task('style', function() {
    return gulp.src('sass/main.scss', {style : 'expended'})
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['sass/**']}))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('css/'))
        .pipe(notify({message: 'Style task is finished'}))
        .pipe(bs.reload({stream: true}));
});

gulp.task('script', function() {
    return gulp.src('script/script.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'Script task is finished'}))
        .pipe(bs.reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src('img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('img/'));
});