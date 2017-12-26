'use strict';

const PerformanceAnalysisPlugin = require('./PerformanceAnalysisPlugin');
const performanceAnalysisPluginInstance = new PerformanceAnalysisPlugin();

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

});