'use strict';

const proxyquire = require('proxyquire');
const fs = require('fs');

const PerformanceResultsData = require('./PerformanceResultsData');
const DEFAULT_SCENARIO = { durationMillis: 100, category: 'scenario1', name: 'step2', sourceLocation: { filePath: 'scenario_path' } };

const existsSyncStub = sandbox.stub().withArgs('results').returns(true);
const mkdirSyncStub = sandbox.stub().withArgs('results').returns(true);
const writeFileSync = sandbox.stub().withArgs('results/data.json').returns(true);
const PerformanceAnalysisPlugin = proxyquire('./PerformanceAnalysisPlugin', { fs: { existsSync: existsSyncStub } });
const performanceAnalysisPluginInstance = new PerformanceAnalysisPlugin();



describe.only("PerformanceAnalysisPlugin", () => {
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
            performanceAnalysisPluginInstance.postTest(true, DEFAULT_SCENARIO);
            performanceAnalysisPluginInstance.performanceResultsData.totalTime.should.be.eql(100);
            performanceAnalysisPluginInstance.postTest(true, DEFAULT_SCENARIO);
            performanceAnalysisPluginInstance.performanceResultsData.totalTime.should.be.eql(200);
        });

        it('should call the getOrCreateScenario', () => {
            let spy = sandbox.spy(performanceAnalysisPluginInstance.performanceResultsData, 'getOrCreateScenario');
            performanceAnalysisPluginInstance.postTest(true, DEFAULT_SCENARIO);
            spy.should.have.been.calledWith('scenario1', 'scenario_path');
        });

        it('should call the addStep of the scenario', () => {
            performanceAnalysisPluginInstance.performanceResultsData.scenarios.push(DEFAULT_SCENARIO);
            let scenario = performanceAnalysisPluginInstance.performanceResultsData.getOrCreateScenario('scenario1', 'scenario_path');
            let spy = sandbox.spy(scenario, 'addStep');
            performanceAnalysisPluginInstance.postTest(true, DEFAULT_SCENARIO);
            spy.should.have.been.calledWith('step2');
        });

        it('should increase the duration of the scenario', () => {
            performanceAnalysisPluginInstance.performanceResultsData.scenarios.push(DEFAULT_SCENARIO);
            let scenario = performanceAnalysisPluginInstance.performanceResultsData.getOrCreateScenario('scenario1', 'scenario_path');
            performanceAnalysisPluginInstance.postTest(true, DEFAULT_SCENARIO);
            scenario.duration.should.be.eql(100);
        });

        it('should set the scenario file path', () => {
            performanceAnalysisPluginInstance.performanceResultsData.scenarios.push(DEFAULT_SCENARIO);
            let scenario = performanceAnalysisPluginInstance.performanceResultsData.getOrCreateScenario('scenario1', 'scenario_path');
            performanceAnalysisPluginInstance.postTest(true, DEFAULT_SCENARIO);
            scenario.filePath.should.be.eql(DEFAULT_SCENARIO.sourceLocation.filePath);
        });
    });

    describe('teardown', () => {
        it('should set the name', () => {
            performanceAnalysisPluginInstance.teardown();
            existsSyncStub.should.have.been.called;
        });
    });

});