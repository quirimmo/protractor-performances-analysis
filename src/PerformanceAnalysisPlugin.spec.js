

describe("PerformanceAnalysisPlugin", () => {

    describe('Init', () => {
        it('should define the class', () => {
            const chai = require('chai');
            const PerformanceAnalysisPlugin = require(`/src/PerformanceAnalysisPlugin.es5`);
            console.log('AAAA');
            console.log(PerformanceAnalysisPlugin);

            PerformanceAnalysisPlugin.should.be.defined;
        });
    });

});