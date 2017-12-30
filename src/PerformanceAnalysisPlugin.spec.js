'use strict';

const proxyquire = require('proxyquire');
const fs = require('fs');

const PerformanceResultsData = require('./PerformanceResultsData');
const DEFAULT_SCENARIO = { durationMillis: 100, category: 'scenario1', name: 'step2', sourceLocation: { filePath: 'scenario_path' } };

let existsSyncStub, mkdirSyncStub, writeFileSyncStub;
let PerformanceAnalysisPlugin, performanceAnalysisPluginInstance;

function instantiateFile(resultsFolderExists = true) {
    existsSyncStub = sandbox.stub().withArgs('results').returns(resultsFolderExists);
    mkdirSyncStub = sandbox.stub().withArgs('results').returns(true);
    writeFileSyncStub = sandbox.stub().withArgs('results/data.json').returns(true);
    PerformanceAnalysisPlugin = proxyquire('./PerformanceAnalysisPlugin', { fs: { existsSync: existsSyncStub, mkdirSync: mkdirSyncStub, writeFileSync: writeFileSyncStub } });
    performanceAnalysisPluginInstance = new PerformanceAnalysisPlugin();
}


describe.only("PerformanceAnalysisPlugin", () => {
    describe('Init', () => {
        before(() => {
            instantiateFile();
        });

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
        before(() => {
            instantiateFile();
        });

        it('should instantiate the PerformanceResultsData instance', () => {
            should.not.exist(performanceAnalysisPluginInstance.performanceResultsData);
            performanceAnalysisPluginInstance.onPrepare();
            performanceAnalysisPluginInstance.performanceResultsData.should.be.an('object');
            (performanceAnalysisPluginInstance.performanceResultsData instanceof PerformanceResultsData).should.be.true;
        });
    });

    describe('setup', () => {
        before(function() {
            instantiateFile();
        });

        it('should set the name', () => {
            performanceAnalysisPluginInstance.config = {};
            performanceAnalysisPluginInstance.setup();
            performanceAnalysisPluginInstance.name.should.be.eql('Protractor Performances Analysis Plugin');
        });
    });

    describe('postTest', () => {
        before(() => {
            instantiateFile();
            performanceAnalysisPluginInstance.onPrepare();
        });

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
        it('should call the fs.existsSync method', () => {
            instantiateFile();
            performanceAnalysisPluginInstance.teardown();
            existsSyncStub.should.have.been.called;
        });

        describe('results folder already exists', () => {
            before(() => {
                instantiateFile();
            });
            
            it('should not call the fs.mkdirSync because the folder already exists', () => {
                performanceAnalysisPluginInstance.teardown();
                mkdirSyncStub.should.not.have.been.called;
            });
        });

        describe('results folder doesn\'t exist yet', () => {
            before(() => {
                instantiateFile(false);
            });
            
            it('should call the fs.mkdirSync with the right argument because the folder doesn\'t exist yet', () => {
                performanceAnalysisPluginInstance.teardown();
                mkdirSyncStub.should.have.been.calledWith('results');
            });
        });

        it('should call the fs.writeFileSync with the right arguments', () => {
            instantiateFile();
            performanceAnalysisPluginInstance.performanceResultsData = {
                test: 'hello'
            };
            performanceAnalysisPluginInstance.teardown();
            writeFileSyncStub.should.have.been.calledWith('results/data.json', JSON.stringify(performanceAnalysisPluginInstance.performanceResultsData, null, 4), 'utf8');
        });
    });
});