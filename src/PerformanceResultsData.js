'use strict';

const ScenarioData = require('./ScenarioData');

class PerformanceResultsData {

    constructor() {
        this.totalTime = 0;
        this.scenarios = [];
    }

    getOrCreateScenario(scenarioName, filePath) {
        return this.getScenarioByName(scenarioName) || this.createScenario(scenarioName, filePath); 
    }

    getScenarioByName(scenarioName) {
        return this.scenarios.find(scenario => scenario.name === scenarioName);
    }

    createScenario(scenarioName, filePath) {
        let scenario = new ScenarioData(scenarioName, filePath);
        this.scenarios.push(scenario);
        return scenario;
    }

}

module.exports = PerformanceResultsData;