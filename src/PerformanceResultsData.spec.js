'use strict';

const PerformanceResultsData = require('./PerformanceResultsData');
const performanceResultsDataInstance = new PerformanceResultsData();

describe("PerformanceResultsData", () => {

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

});