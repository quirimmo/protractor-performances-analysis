'use strict';

const StepData = require('./StepData');

class ScenarioData {

    constructor(scenarioName) {
        this.name = scenarioName;
        this.duration = 0;
        this.steps = [];
    }

    addStep(stepName, stepDuration) {
        let step = new StepData(stepName, stepDuration);
        this.steps.push(step);
    }

}

module.exports = ScenarioData;