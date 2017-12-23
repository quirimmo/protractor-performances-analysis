'use strict';

function KarmaConfiguration(config) {
    config.set({

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-babel-preprocessor'
        ],

        preprocessors: {
            'src/**/*.js': ['babel']
        },

        babelPreprocessor: {
            options: {
                "presets": ["es2015"],
                "plugins": ["transform-es2015-modules-umd"]
            },
            filename: function(file) {
                console.log(`Transpiling ${file}`);
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',

            './src/**/!(*.spec).js',

            './src/**/*.spec.js'
        ],

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
}

module.exports = KarmaConfiguration;