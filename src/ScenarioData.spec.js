'use strict';

const ScenarioData = require('./ScenarioData');
const StepData = require('./StepData');

const SCENARIO_NAME = 'Scenario Name';
const SCENARIO_PATH = 'scenario_path';
const STEP_NAME = 'Step Name';
const STEP_DURATION = 1000;
const scenarioDataInstance = new ScenarioData(SCENARIO_NAME, SCENARIO_PATH);

describe("ScenarioData", () => {

    describe('Init', () => {
        it('should define the instance of the class', () => {
            scenarioDataInstance.should.not.be.undefined;
            (scenarioDataInstance instanceof ScenarioData).should.be.true;
        });
        
        it('should define the name of the scenario', () => {
            scenarioDataInstance.name.should.be.eql(SCENARIO_NAME);
        });

        it('should define the path to the file', () => {
            scenarioDataInstance.filePath.should.be.eql(SCENARIO_PATH);
        });

        it('should define the duration of the scenario to 0', () => {
            scenarioDataInstance.duration.should.be.eql(0);
        });

        it('should define the steps of the scenario as an empty array', () => {
            scenarioDataInstance.steps.should.be.an('array');
            scenarioDataInstance.steps.should.have.length(0);
        });
    });

    describe('addStep', () => {
        beforeEach(() => {
            scenarioDataInstance.addStep(STEP_NAME, STEP_DURATION);
        });

        it('should increase the length of the steps array', () => {
            scenarioDataInstance.steps.should.have.length(1);
        });

        it('should define the step as an instance of StepData', () => {
            let step = scenarioDataInstance.steps[0];
            (step instanceof StepData).should.be.true;
        });
    });

});