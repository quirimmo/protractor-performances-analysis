class PerformanceAnalysisPlugin {

    constructor() {}

    setup() {}

    onPrepare() {}

    postTest(passed, testInfo) {
        // here a test is just finished
        console.log('Post Test');
        console.log(testInfo);
    }

    onPageStable() {
        // here each scenario is restarting
        console.log('PAGE STABLE - SCENARIO IS STARTING');
    }
}

module.exports = PerformanceAnalysisPlugin;