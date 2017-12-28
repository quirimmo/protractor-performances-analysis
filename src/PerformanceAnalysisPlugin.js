'use strict';

const PerformanceResultsData = require('./PerformanceResultsData');
const util = require('util')


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

    /**
     * @description
     * Called after each step's test is finished
     *
     * @param {Boolean} passed Boolean which holds if the test is passed or not 
     * @param {Object} testInfo Object which holds all the data of the test just finished  
     * @property {String} testInfo.name Name of the current step just executed
     * @property {String} testInfo.category Name of the current scenario which has been executed
     * @property {Number} testInfo.durationMillis Duration of the current step execution
     * @property {Object} testInfo.sourceLocation Location details of the current file
     * @property {String} testInfo.sourceLocation.filePath Path to the current file
     * @property {Number} testInfo.sourceLocation.line Line in the current file 
     * @property {Number} testInfo.sourceLocation.column Column in the current file 
     * @property {Object} testInfo.progress Object with the info related to the current scenario
     * @property {Number} testInfo.progress.step Current step number
     * @property {Number} testInfo.progress.steps Total steps number of the current scenario
     */
    postTest(passed, testInfo) {
        // increase the total execution time of all the tests
        this.performanceResultsData.totalTime += testInfo.durationMillis;
        // get or create the current scenario if not exist
        let currentScenario = this.performanceResultsData.getOrCreateScenario(testInfo.category);
        currentScenario.addStep(testInfo.name, testInfo.durationMillis);
        // increase the total execution time of the current scenario
        currentScenario.duration += testInfo.durationMillis;
    }

    teardown() {
        // here tests are finished
        console.log(util.inspect(this.performanceResultsData, {showHidden: false, depth: null}))
    }

    
}

module.exports = PerformanceAnalysisPlugin;