Feature: Main Test
	As Main Test I want to check if it works

	Scenario: First Scenario
		Given I load the page
		When I do some useless operation
		Then I check the expectation

	Scenario: Second Scenario
		Given I load the page
		When I do some useless operation
		Then I check the expectation

	Scenario Outline: Third Scenario - Outline Example
		Given I load the page
		When I do some useless operation
		Then I check the expectation

		Examples:
		| test    | 
		| Value 1 | 
		| Value 2 | 