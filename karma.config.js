// TODO!
// THIS FILE IS DEPRECATED AND WE COULD GET RID OF ALL RELATED TO KARMA
// CAUSE WE ARE NOT TESTING BROWSER BASED CODE BUT SIMPLE NODE.JS CODE
// MOCHA IS MORE THAN ENOUGH FOR THIS

'use strict';

function KarmaConfiguration(config) {
    config.set({
        basePath: '',
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
        logLevel: config.LOG_INFO,
        browsers: getKarmaBrowsers(),
        plugins: getPluginsList(),
        preprocessors: getKarmaPreprocessors(),
        babelPreprocessor: getBabelPreprocessor(),
        frameworks: getKarmaFrameworks(),
        files: getKarmaFiles()
    });
}

module.exports = KarmaConfiguration;


// Private Methods 
// --------------------------------------------------------------------------------
function getPluginsList() {
    return [
        'karma-mocha',
        'karma-chai',
        'karma-chrome-launcher',
        'karma-babel-preprocessor'
    ];
}

function getKarmaPreprocessors() {
    return { 'src/**/*.js': ['babel'] };
}

function getKarmaFrameworks() {
    return ['mocha', 'chai'];
}

function getKarmaBrowsers() {
    return ['Chrome'];
}

function getBabelPreprocessor() {
    return {
        options: getBabelPreprocessorOptions(),
        filename: file => file.originalPath.replace(/\.js$/, '.es5.js'),
        sourceFileName: file => file.originalPath
    };

    function getBabelPreprocessorOptions() {
        return {
            'presets': ['es2015'],
            'plugins': ['transform-es2015-modules-umd']
        };
    }
}

function getKarmaFiles() {
    return [
        'node_modules/babel-polyfill/dist/polyfill.js',
        './src/**/!(*.spec).js',
        './src/**/*.spec.js'
    ];
}