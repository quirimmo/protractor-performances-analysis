class PerformanceAnalysisPlugin {

    constructor() {}

    setup() {}

    onPrepare() {}

    postTest(passed, testInfo) {
        console.log('Post Test');
        console.log(testInfo);
    }

    onPageStable() {
        // here each scenario is restarting
        console.log('PAGE STABLE - SCENARIO IS STARTING');
    }
}

module.exports = PerformanceAnalysisPlugin;