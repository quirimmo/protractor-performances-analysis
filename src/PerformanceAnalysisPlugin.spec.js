'use strict';

const PerformanceAnalysisPlugin = require('./PerformanceAnalysisPlugin');

describe("PerformanceAnalysisPlugin", () => {

    describe('Init', () => {
        it('should define the class', () => {
            PerformanceAnalysisPlugin.should.not.be.undefined;
        });
    });

});