'use strict';

const PerformanceResultsData = require('./PerformanceResultsData');
const util = require('util');
const fs = require('fs');

const OUTPUT_FOLDER = 'results';
const OUTPUT_FILE = 'data.json';
const OUTPUT_STATISTICS_FILE = 'statistics.json';


class PerformanceAnalysisPlugin {


    constructor() {}

    // Public Methods
    // --------------------------------------------------------------------------------------
    /**
     * Called after the WebDriver session starts, but before the test framework has been setup
     */
    setup() {
        // set the default name for the plugin
        this.name = 'Protractor Performances Analysis Plugin';
    }

    /**
     * Called before the tests start but after the test framework has been setup.
     * You can access test framework properties here, instead you can't inside the setup
     */
    onPrepare() {
        // craete the default data to be recorded as output of performances
        this.performanceResultsData = new PerformanceResultsData();
    }

    /**
     * Called inside browser.get() after the page loads and after angular is done its bootstrap phase
     */
    onPageStable() {
    }

    /**
     * Called inside browser.get() after the page loads and before angular bootstraps
     */
    onPageLoad() {

    }

    /**
     * Called after the test results have been finalized and any other job associated to the end of the tests has started
     */
    postResults() {
    }

    /**
     * Called inside the browser.waitForAngular() if you want protractor to wait for some other promise before to return from browser.waitForAngular()
     */
    waitForPromise() {
    }

    /**
     * Same as waitForPromise but it waits for a particular condition, not only a promise resolution.
     * This function will be called repeatedly until it becomes true
     */
    waitForCondition() {
    }

    /**
     * If specified, skip the default protractor angular sync wait
     */
    // skipAngularStability() {
    // }

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
        let currentScenario = this.performanceResultsData.getOrCreateScenario(testInfo.category, testInfo.sourceLocation.filePath);
        currentScenario.addStep(testInfo.name, testInfo.durationMillis);
        // increase the total execution time of the current scenario
        currentScenario.duration += testInfo.durationMillis;
    }

    /**
     * @description
     * Called when all the tests are finished and protractor is going to shut down
     */
    teardown() {
        this._createResultFolderIfNotExists();
        this._writeJSONFile(`${OUTPUT_FOLDER}/${OUTPUT_FILE}`, this.performanceResultsData);
        this._outputGlobalStatistics();
    }

    // Private Methods
    // ---------------------------------------------------------------------------------------------------------------
    _outputGlobalStatistics() {
        // scenarios statistics
        const scenariosExecutionTimes = this.performanceResultsData.scenarios
            .sort((a, b) => b.duration - a.duration)
            .map((a) => { return { name: a.name, file: a.filePath, duration: a.duration }; });
        // steps statistics
        const allSteps = [].concat(...this.performanceResultsData.scenarios.map((a) => a.steps));
        const stepsExecutionTimes = allSteps
            .sort((a, b) => b.duration - a.duration)
            .map((a) => { return { name: a.name, duration: a.duration }; });
        // creates unique steps
        let flags = {};
        const uniqueSteps = stepsExecutionTimes.filter((entry) => {
            if (flags[entry.name]) {
                return false;
            }
            flags[entry.name] = true;
            return true;
        });
        // assembling json statistics results output file
        const mainStatistics = {
            duration: this.performanceResultsData.totalTime,
            scenarios: scenariosExecutionTimes,
            steps: uniqueSteps
        };
        // create the statistics json file
        this._writeJSONFile(`${OUTPUT_FOLDER}/${OUTPUT_STATISTICS_FILE}`, mainStatistics);
    }

    _createResultFolderIfNotExists() {
        if (!fs.existsSync(OUTPUT_FOLDER)) {
            fs.mkdirSync(OUTPUT_FOLDER);
        }
    }

    _writeJSONFile(outputFilePath, fileJSONContent) {
        fs.writeFileSync(outputFilePath, JSON.stringify(fileJSONContent, null, 4), 'utf8');
    }
}

module.exports = PerformanceAnalysisPlugin;