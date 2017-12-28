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
        it('should blablabla', () => {
        });
    });
});