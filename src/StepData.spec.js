'use strict';

const StepData = require('./StepData');
const STEP_NAME = 'Step Name';
const STEP_DURATION = 100;
const stepDataInstance = new StepData(STEP_NAME, STEP_DURATION);

describe("StepData", () => {

    describe('Init', () => {
        it('should define the instance of the class', () => {
            stepDataInstance.should.not.be.undefined;
            (stepDataInstance instanceof StepData).should.be.true;
        });

        it('should define the name property of the step', () => {
            stepDataInstance.name.should.be.eql(STEP_NAME);
        });
        
        it('should define the duration property of the step', () => {
            stepDataInstance.duration.should.be.eql(STEP_DURATION);
        });
    });

});