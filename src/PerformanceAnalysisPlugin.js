'use strict';

const PerformanceResultsData = require('./PerformanceResultsData');

class PerformanceAnalysisPlugin {

    constructor() {}

    setup() {
        // if not provided, set as default that you are using cucumber
        // otherwise pass false to the related config parameter
        this.usingCucumber = typeof(this.config.usingCucumber) === 'undefined' ? true : this.config.usingCucumber;
        // set the default name for the plugin
        this.name = 'Protractor Performances Analysis Plugin';
    }

    onPrepare() {
        // craete the default data to be recorded as output of performances
        this.performancesResults = {
            totalTime: 0,
            scenarios: []
        };

        this.performanceResultsData = new PerformanceResultsData();
    }

    onPageStable() {
        // here each scenario is starting
        // console.log(this);
    }

    postTest(passed, testInfo) {
        // here a test is just finished
        // console.log(testInfo);
        // increase the total execution time of all the tests
        this.performancesResults.totalTime += testInfo.durationMillis;
        // get or create the current scenario if not exist
        let currentScenario = this.getOrCreateScenario(testInfo.category);
        currentScenario.steps.push(testInfo.name);
    }

    teardown() {
        // here tests are finished
        // console.log(this.performancesResults);
        // console.log(this.performancesResults.scenarios[0].steps);
    }

    getOrCreateScenario(scenarioName) {
        return this.getScenarioByName(scenarioName) || this.createScenario(scenarioName); 
    }

    getScenarioByName(scenarioName) {
        return this.performancesResults.scenarios.find(scenario => scenario.name === scenarioName);
    }

    createScenario(scenarioName) {
        let scenario = {
            name: scenarioName,
            steps: []
        };
        this.performancesResults.scenarios.push(scenario);
        return scenario;
    }

}

module.exports = PerformanceAnalysisPlugin;