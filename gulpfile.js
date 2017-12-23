'use strict';

// Modules Declaration
// -------------------------------------------------------------------
const gulp = require('gulp');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const gls = require('gulp-live-server');
const protractor = require("gulp-protractor").protractor;


// Exposed Tasks
// -------------------------------------------------------------------
gulp.task('clean-dist', cleanDist);
gulp.task('clean-app-components', cleanAppComponents);
gulp.task('copy-app-components', ['clean-app-components'], copyAppComponents);
gulp.task('publish', ['clean-dist', 'copy-app-components'], publish);
gulp.task('serve', ['publish'], serve);
gulp.task('serve-no-watch', ['publish'], serveNoWatch);
gulp.task('protractor-test', ['serve-no-watch'], protractorTest);


// Global Variables
// -------------------------------------------------------------------
const PATH = {
    components: './app-sample/components',
    dist: './dist',
    app: './app-sample/',
    src: './index.js',
    test: './test/**/*.feature',
    protractorConfig: './protractor.config.js'
};
const APP_FILES_TO_WATCH = 'app-sample/**/*.*';
const APP_COMPONENTS = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js'
];

let serverNoWatch;


// Private Methods 
// -------------------------------------------------------------------
function serveNoWatch() {
    serverNoWatch = gls.static(PATH.app, 9000);
    serverNoWatch.start();
}

function cleanDist() {
    return gulp.src(PATH.dist, { read: false }).pipe(clean());
}

function cleanAppComponents() {
    return gulp.src(PATH.components, { read: false }).pipe(clean());
}

function publish() {
    gulp
        .src(PATH.src)
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(PATH.dist));
}

function serve() {
    let server = gls.static(PATH.app, 9000);
    server.start();
    gulp.watch(APP_FILES_TO_WATCH, function(file) {
        server.notify.apply(server, [file]);
    });
}

function copyAppComponents() {
    gulp
        .src(APP_COMPONENTS)
        .pipe(gulp.dest(PATH.components));
}

function protractorTest() {
    return gulp.src(PATH.test)
        .pipe(protractor({
            configFile: PATH.protractorConfig
        }))
        .on('close', function() {
            console.log('exit');
            serverNoWatch.stop();
        })
        .on('error', function(e) { throw e; });
}