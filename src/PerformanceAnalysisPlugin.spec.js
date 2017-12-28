'use strict';

const PerformanceAnalysisPlugin = require('./PerformanceAnalysisPlugin');
const performanceAnalysisPluginInstance = new PerformanceAnalysisPlugin();
const PerformanceResultsData = require('./PerformanceResultsData');


describe("PerformanceAnalysisPlugin", () => {

    describe('Init', () => {
        it('should define the class', () => {
            PerformanceAnalysisPlugin.should.not.be.undefined;
        });

        it('should define the instance', () => {
            performanceAnalysisPluginInstance.should.not.be.undefined;
        });

        it('should define the instance methods', () => {
            performanceAnalysisPluginInstance.setup.should.be.a('function');
            performanceAnalysisPluginInstance.onPrepare.should.be.a('function');
            performanceAnalysisPluginInstance.postTest.should.be.a('function');
            performanceAnalysisPluginInstance.onPageStable.should.be.a('function');
        });
    });

    describe('onPrepare', () => {
        it('should instantiate the PerformanceResultsData instance', () => {
            should.not.exist(performanceAnalysisPluginInstance.performanceResultsData);
            performanceAnalysisPluginInstance.onPrepare();
            performanceAnalysisPluginInstance.performanceResultsData.should.be.an('object');
            (performanceAnalysisPluginInstance.performanceResultsData instanceof PerformanceResultsData).should.be.true;
        });
    });

    describe('setup', () => {
        it('should set the name', () => {
            performanceAnalysisPluginInstance.config = {};
            performanceAnalysisPluginInstance.setup();
            performanceAnalysisPluginInstance.name.should.be.eql('Protractor Performances Analysis Plugin');
        });
    });

    describe('postTest', () => {
        beforeEach(() => {
            performanceAnalysisPluginInstance.performanceResultsData.scenarios.length = 0;
        });

        it('should increase the total execution time', () => {
            performanceAnalysisPluginInstance.performanceResultsData.totalTime.should.be.eql(0);
            performanceAnalysisPluginInstance.postTest(true, { durationMillis: 100 });
            performanceAnalysisPluginInstance.performanceResultsData.totalTime.should.be.eql(100);
            performanceAnalysisPluginInstance.postTest(true, { durationMillis: 100 });
            performanceAnalysisPluginInstance.performanceResultsData.totalTime.should.be.eql(200);
        });

        it('should call the getOrCreateScenario', () => {
            let spy = sandbox.spy(performanceAnalysisPluginInstance.performanceResultsData, 'getOrCreateScenario');
            performanceAnalysisPluginInstance.postTest(true, { durationMillis: 100, category: 'scenario1' });
            spy.should.have.been.calledWith('scenario1');
        });

        it('should call the addStep of the scenario', () => {
            performanceAnalysisPluginInstance.performanceResultsData.scenarios.push({ duration: 100, category: 'scenario1' });
            let scenario = performanceAnalysisPluginInstance.performanceResultsData.getOrCreateScenario('scenario1');
            let spy = sandbox.spy(scenario, 'addStep');
            performanceAnalysisPluginInstance.postTest(true, { durationMillis: 100, category: 'scenario1', name: 'step2' });
            spy.should.have.been.calledWith('step2');
        });

        it('should increase the duration of the scenario', () => {
            performanceAnalysisPluginInstance.performanceResultsData.scenarios.push({ duration: 100, category: 'scenario1' });
            let scenario = performanceAnalysisPluginInstance.performanceResultsData.getOrCreateScenario('scenario1');
            performanceAnalysisPluginInstance.postTest(true, { durationMillis: 100, category: 'scenario1', name: 'step2' });
            scenario.duration.should.be.eql(100);
        });
    });
});