'use strict';

const PerformanceResultsData = require('./PerformanceResultsData');
const ScenarioData = require('./ScenarioData');

const performanceResultsDataInstance = new PerformanceResultsData();
const EXISTING_SCENARIO = { name: 'scenario 1' };
const NEW_SCENARIO = {
    name: 'new scenario',
    steps: [],
    duration: 0,
    filePath: 'scenario_path'
};


describe("PerformanceResultsData", () => {

    beforeEach(() => {
        performanceResultsDataInstance.scenarios.length = 0;
    });

    describe('Init', () => {
        it('should define the instance of the class', () => {
            performanceResultsDataInstance.should.not.be.undefined;
            (performanceResultsDataInstance instanceof PerformanceResultsData).should.be.true;
        });

        it('should define the totalTime to 0', () => {
            performanceResultsDataInstance.totalTime.should.be.eql(0);
        });

        it('should define the empty array of all the scenarios', () => {
            performanceResultsDataInstance.scenarios.should.be.an('array');
            performanceResultsDataInstance.scenarios.should.have.length(0);
        });
    });

    describe('getOrCreateScenario', () => {
        it('should return a scenario', () => {
            performanceResultsDataInstance.getOrCreateScenario().should.be.an('object');
            (performanceResultsDataInstance.getOrCreateScenario() instanceof ScenarioData).should.be.true;
        });

        describe('scenario already exists', () => {
            beforeEach(() => {
                performanceResultsDataInstance.scenarios.push(EXISTING_SCENARIO);
            });
            
            it('should call the getScenarioByName method', () => {
                let spy = sandbox.spy(performanceResultsDataInstance, 'getScenarioByName');
                performanceResultsDataInstance.getOrCreateScenario('scenario 1', 'scenario_path');
                spy.should.have.been.calledWith('scenario 1');
            });

            it('should return the given scenario', () => {
                performanceResultsDataInstance.getOrCreateScenario('scenario 1', 'scenario_path').should.be.eql(EXISTING_SCENARIO);
            });
        });

        describe('scenario doesn\'t exist yet', () => {
            it('should call the getScenarioByName method', () => {
                let spy = sinon.spy(performanceResultsDataInstance, 'getScenarioByName');
                performanceResultsDataInstance.getOrCreateScenario('new scenario', 'scenario_path');
                spy.should.have.been.calledWith('new scenario');
            });

            it('should call the createScenario method', () => {
                let spy = sinon.spy(performanceResultsDataInstance, 'createScenario');
                performanceResultsDataInstance.getOrCreateScenario('new scenario', 'scenario_path');
                spy.should.have.been.calledWith('new scenario', 'scenario_path');
            });

            it('should return the created scenario', () => {
                performanceResultsDataInstance.getOrCreateScenario('new scenario', 'scenario_path').should.be.eql(NEW_SCENARIO);
            });
        });
    });

    describe('getScenarioByName', () => {
        it('should return undefined if the given scenario doesn\'t exist', () => {
            should.not.exist(performanceResultsDataInstance.getScenarioByName('AAA'));
        });

        it('should return the given scenario if exists', () => {
            performanceResultsDataInstance.createScenario('new scenario', 'scenario_path');
            performanceResultsDataInstance.getScenarioByName('new scenario').should.be.eql(NEW_SCENARIO);
        });
    });

    describe('createScenario', () => {
        it('should create the scenario if doesn\'t exist', () => {
            performanceResultsDataInstance.scenarios.should.have.length(0);
            performanceResultsDataInstance.createScenario('new scenario', 'scenario_path');
            performanceResultsDataInstance.scenarios.should.have.length(1);;
        });

        it('should return the just created scenario', () => {
            performanceResultsDataInstance.createScenario('new scenario', 'scenario_path');
            performanceResultsDataInstance.scenarios[0].should.be.eql(NEW_SCENARIO);
            (performanceResultsDataInstance.scenarios[0] instanceof ScenarioData).should.be.true
        });
    });

});