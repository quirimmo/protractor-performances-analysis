'use strict';

const PerformanceResultsData = require('./PerformanceResultsData');

class PerformanceAnalysisPlugin {

    constructor() {}

    setup() {
        // set the default name for the plugin
        this.name = 'Protractor Performances Analysis Plugin';
    }

    onPrepare() {
        // craete the default data to be recorded as output of performances
        this.performanceResultsData = new PerformanceResultsData();
    }

    onPageStable() {
        // here each scenario is starting
        // console.log(this);
    }

    postTest(passed, testInfo) {
        // here a test is just finished
        // increase the total execution time of all the tests
        this.performanceResultsData.totalTime += testInfo.durationMillis;
        // get or create the current scenario if not exist
        let currentScenario = this.performanceResultsData.getOrCreateScenario(testInfo.category);
        // currentScenario.steps.push(testInfo.name);
    }

    teardown() {
        // here tests are finished
        console.log(this.performanceResultsData);
    }

    
}

module.exports = PerformanceAnalysisPlugin;