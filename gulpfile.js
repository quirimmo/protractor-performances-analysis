'use strict';

// Modules Declaration
// -------------------------------------------------------------------
const gulp = require('gulp');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const gls = require('gulp-live-server');
const protractor = require("gulp-protractor").protractor;
const KarmaServer = require('karma').Server;
const mocha = require('gulp-mocha');



// Exposed Tasks
// -------------------------------------------------------------------
gulp.task('clean-dist', cleanDist);
gulp.task('clean-app-components', cleanAppComponents);
gulp.task('copy-app-components', ['clean-app-components'], copyAppComponents);
gulp.task('publish', ['clean-dist', 'copy-app-components'], publish);
gulp.task('serve', ['publish'], serve);
gulp.task('serve-no-watch', ['publish'], serveNoWatch);
gulp.task('protractor-test', ['serve-no-watch'], protractorTest);
gulp.task('unit-test', unitTest);


// Global Variables
// -------------------------------------------------------------------
const PATH = {
    components: './app-sample/components',
    dist: './dist',
    app: './app-sample/',
    src: './index.js',
    e2eTest: './test/**/*.feature',
    unitTest: './src/**/*.spec.js',
    karmaConfig: './karma.config.js',
    protractorConfig: './protractor.config.js'
};
const APP_FILES_TO_WATCH = 'app-sample/**/*.*';
const APP_COMPONENTS = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js'
];



// Private Methods 
// -------------------------------------------------------------------
let serverNoWatch;

function serveNoWatch() {
    serverNoWatch = gls.static(PATH.app, 9000);
    serverNoWatch.start();
}

function cleanDist() {
    return gulp.src(PATH.dist, { read: false })
        .pipe(clean());
}

function cleanAppComponents() {
    return gulp.src(PATH.components, { read: false })
        .pipe(clean());
}

function publish() {
    return gulp.src(PATH.src)
        .pipe(minify({ ext: { min: '.min.js' } }))
        .pipe(gulp.dest(PATH.dist));
}

function serve() {
    let server = gls.static(PATH.app, 9000);
    server.start();
    gulp.watch(APP_FILES_TO_WATCH, onFileChanged);

    function onFileChanged(file) {
        server.notify.apply(server, [file]);
    }
}

function copyAppComponents() {
    return gulp.src(APP_COMPONENTS)
        .pipe(gulp.dest(PATH.components));
}

function protractorTest() {
    return gulp.src(PATH.e2eTest)
        .pipe(protractor({ configFile: PATH.protractorConfig }))
        .on('close', onProtractorClose)
        .on('error', onProtractorError);

    function onProtractorClose() {
        serverNoWatch.stop();
    }

    function onProtractorError(e) {
        throw e;
    }
}

function unitTest(done) {
    return gulp.src(['src/*.spec.js'], { read: false })
        .pipe(mocha({
            // globals: {
            //     should: require('should')
            // }
        }));

    // const karmaServerInstance = new KarmaServer({
    //     configFile: `${__dirname}/karma.config.js`,
    //     singleRun: true
    // });

    // karmaServerInstance.on('run_complete', (browsers, results) =>
    //     (results.error || results.failed) ?
    //     done(new Error('There are test failures')) :
    //     done()
    // );

    // karmaServerInstance.start();
}