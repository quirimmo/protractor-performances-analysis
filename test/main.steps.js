const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { Given, When, Then } = require('cucumber')
const expect = chai.expect;

chai.use(chaiAsPromised);


Given(/^I load the page$/, () => browser.get('/'));
When(/^I do some useless operation$/, () => browser.sleep(2500));
Then(/^I check the expectation$/, () => expect(1).to.equal(1));