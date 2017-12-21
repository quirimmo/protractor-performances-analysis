class PerformanceAnalysisPlugin {

    constructor() {
        console.log('Exported!');
    }

    setup() {
        console.log('Setting up the protractor plugin before protractor set up too!');
    }

    onPrepare() {
        console.log('Protractor has been set up and tests have net been ran yet!');
    }

    postTest(passed, testInfo) {
        console.log('Post Test');
        console.log(testInfo);
        // console.log(jasmine);
        // console.log(jasmine.getEnv());
        // console.log(protractor);
    }

    onPageStable() {
        console.log('page stable');
    }
}

module.exports = new PerformanceAnalysisPlugin();
module.exports.PerformanceAnalysisPlugin = PerformanceAnalysisPlugin;