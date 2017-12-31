'use strict';

global.chai = require('chai');
global.sinon = require('sinon');
global.sinonChai = require('sinon-chai');
global.should = global.chai.should();
global.expect = global.chai.expect;
global.chai.use(global.sinonChai);

global.sandbox = sinon.sandbox.create();
beforeEach(() => {
    sandbox = sinon.sandbox.create();
});
afterEach(() => {
    sandbox.restore();
});