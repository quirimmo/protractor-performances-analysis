'use strict';

const ScenarioData = require('./ScenarioData');

class PerformanceResultsData {

    constructor() {
        this.totalTime = 0;
        this.scenarios = [];
    }

    getOrCreateScenario(scenarioName) {
        return this.getScenarioByName(scenarioName) || this.createScenario(scenarioName); 
    }

    getScenarioByName(scenarioName) {
        return this.scenarios.find(scenario => scenario.name === scenarioName);
    }

    createScenario(scenarioName) {
        let scenario = new ScenarioData(scenarioName);
        this.scenarios.push(scenario);
        return scenario;
    }

}

module.exports = PerformanceResultsData;