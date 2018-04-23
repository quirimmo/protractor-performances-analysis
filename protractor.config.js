'use strict';

// Required Modules
// ----------------------------------------------------------------------------
const fs = require('fs');


// Variables list
// ----------------------------------------------------------------------------
const seleniumVersion = findLocalSeleniumVersion();
const SELENIUM_SERVER_JAR_PATH = `./node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-${seleniumVersion}.jar`;
const SPECS_PATH = ['./test/**/*.feature'];
const STEPS_PATH = ['./test/**/*.steps.js'];
// const PROTRACTOR_PLUGINS_INJECTION = [{ inline: require('./index'), usingCucumber: true }];
const PROTRACTOR_PLUGINS_INJECTION = [{ inline: require('./index') }];


// Protractor Config
// ----------------------------------------------------------------------------
exports.config = {
    directConnect: false,
    allScriptsTimeout: 11000,
    getPageTimeout: 10000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    jasmineNodeOpts: getJasmineOptions(),
    capabilities: getCapabilities(),
    baseUrl: 'http://localhost:9000',
    seleniumServerJar: SELENIUM_SERVER_JAR_PATH,
    plugins: PROTRACTOR_PLUGINS_INJECTION,
    specs: SPECS_PATH,
    cucumberOpts: { require: STEPS_PATH },
    onPrepare: onPrepareProtractor
};


// Private Methods
// ----------------------------------------------------------------------------
function findLocalSeleniumVersion() {
    const SELENIUM_FOLDER = './node_modules/protractor/node_modules/webdriver-manager/selenium';
    let res, seleniumVersionFound;

    fs.readdirSync(SELENIUM_FOLDER).forEach(onEachFile);
    if (!seleniumVersionFound) {
        throw new Error(`No selenium server jar found inside your protractor node_modules subfolder: ${SELENIUM_FOLDER}`);
    }
    return seleniumVersionFound;

    function onEachFile(file) {
        res = file.match(/selenium-server-standalone-(\d{1}.\d{2}.\d{1}).jar/i);
        if (res) {
            seleniumVersionFound = res[1];
        }
    }
}

function getJasmineOptions() {
    return {
        showColors: true,
        defaultTimeoutInterval: 30000
    };
}

function getCapabilities() {
    return {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['disable-web-security', 'lang=en_GB', 'window-size=1200,1000']
        }
    };
}

function onPrepareProtractor() {
    browser.waitForAngularEnabled(true);
}