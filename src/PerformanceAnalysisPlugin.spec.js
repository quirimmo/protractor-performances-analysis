'use strict';

global.chai = require('chai');
global.sinon = require('sinon');
global.sinonChai = require('sinon-chai');
global.chai.should();
global.expect = global.chai.expect;
global.chai.use(global.sinonChai);


const PerformanceAnalysisPlugin = require('./PerformanceAnalysisPlugin');

describe("PerformanceAnalysisPlugin", () => {

    describe('Init', () => {
        it('should define the class', () => {
            PerformanceAnalysisPlugin.should.not.be.undefined;
        });
    });

});