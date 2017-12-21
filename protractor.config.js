const SELENIUM_FOLDER = './node_modules/protractor/node_modules/webdriver-manager/selenium';
const fs = require('fs');
let res, seleniumVersion;
fs.readdirSync(SELENIUM_FOLDER).forEach(file => {
    res = file.match(/selenium-server-standalone-(\d{1}.\d{1}.\d{1}).jar/i);
    if (res) {
        seleniumVersion = res[1];
    }
})
if (!seleniumVersion) {
    throw new Error('No selenium server jar found inside your protractor node_modules subfolder');
}

exports.config = {
    directConnect: false,
    allScriptsTimeout: 11000,
    getPageTimeout: 10000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
			'args': ['disable-web-security', 'lang=en_GB', 'window-size=1200,1000']
		}
    },
    baseUrl: 'http://localhost:9000',
    seleniumServerJar: `./node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-${seleniumVersion}.jar`,
    plugins: [{
        inline: require('./index')
    }],
    specs: [
        './test/main.feature'
    ],
    cucumberOpts: {
        require: [
            './test/main.steps.js'
        ]
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
	},
    onPrepare: function () {
        browser.waitForAngularEnabled(true);
    }
};