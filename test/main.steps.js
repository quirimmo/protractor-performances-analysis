var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(chaiAsPromised);

module.exports = function() {

    this.Given(/^I load the page$/, () => browser.get('/'));
    this.When(/^I do some useless operation$/, () => browser.sleep(5000));
    this.Then(/^I check the expectation$/, () => expect(1).toBe(1));

}