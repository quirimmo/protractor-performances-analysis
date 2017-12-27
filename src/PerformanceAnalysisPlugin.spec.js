'use strict';

const PerformanceAnalysisPlugin = require('./PerformanceAnalysisPlugin');
const performanceAnalysisPluginInstance = new PerformanceAnalysisPlugin();
// const PerformanceResultsData = require('./PerformanceResultsData');
// let spy = sinon.spy(PerformanceResultsData, 'constructor');

// sinon.stubConstructor = function(constructor, fake) {
//     return sinon.spy((...args) => { // alternatively: sinon.stub().callsFake(..)
//         var i = Object.create(constructor.prototype);
//         fake.apply(i, args);
//         return i;
//     })
// }

// var stubbedConstructor = sinon.stubConstructor(PerformanceResultsData, function() {
//     this.baz = 42;
// });


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
            // const PerformanceResultsDataInstance = sinon.stub(PerformanceResultsData.prototype, 'constructor').returns(function() { console.log('aaa'); });
            performanceAnalysisPluginInstance.onPrepare();
            // spy.should.have.been.called;
        });
    });

    describe('setup', () => {
        it('should set the name', () => {
            performanceAnalysisPluginInstance.config = {};
            performanceAnalysisPluginInstance.setup();
            performanceAnalysisPluginInstance.name.should.be.eql('Protractor Performances Analysis Plugin');
        });

        describe('using cucumber', () => {
            it('should set using cucumber to true by default if no config parameter provided', () => {
                performanceAnalysisPluginInstance.config = {};
                performanceAnalysisPluginInstance.setup();
                performanceAnalysisPluginInstance.usingCucumber.should.be.eql(true);
            });


            it('should set using cucumber to true if true provided', () => {
                performanceAnalysisPluginInstance.config = { usingCucumber: true };
                performanceAnalysisPluginInstance.setup();
                performanceAnalysisPluginInstance.usingCucumber.should.be.eql(true);
            });

            it('should set using cucumber to true if false provided', () => {
                performanceAnalysisPluginInstance.config = { usingCucumber: false };
                performanceAnalysisPluginInstance.setup();
                performanceAnalysisPluginInstance.usingCucumber.should.be.eql(false);
            });
        });
    });

});