/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Organization Details Tests', () => {
	let viewports = [
		Cypress.env('desktop'),
		Cypress.env('tablet'),
		Cypress.env('mobile')
	];
	beforeEach(() => {
		cy.fixture('organization_suggestion.json').as('organization');
		cy.fixture('user_new.json').as('user');
		cy.visit(Cypress.env('baseUrl'));
	});
	afterEach(() => {
		//Do the clean up
		cy.deleteUsersIfExist();
		cy.deleteOrgsIfExist();
		cy.deleteCommentsOrgsIfExist('surprisingly-unique-organizations-slug');
	});

	//Root
	it('Root Test - Elements', () => {
		cy.root().should('match', 'html');
	});

	viewports.forEach((viewport) => {
		context(`Testing the ${viewport} Version of the application`, () => {
			it('Testing Search page Detail Page About elements', () => {
				cy.get('@organization').then((org) => {
					cy.addOrg(org).then(() => {
						cy.get('@user').then((user) => {
							cy.addUser(user).then(() => {
								cy.testSearchDetailPageAbout(viewport, user, org);
							});
						});
					});
				});
			});
			it('Testing Search page Detail Page Service elements', () => {
				cy.get('@organization').then((org) => {
					cy.addOrg(org).then(() => {
						cy.get('@user').then((user) => {
							cy.addUser(user).then(() => {
								cy.testSearchDetailsPageService(viewport, user, org);
							});
						});
					});
				});
			});
			it('Testing Search page Detail Page Reviews elements', () => {
				cy.get('@organization').then((org) => {
					cy.addOrg(org).then(() => {
						cy.get('@user').then((user) => {
							cy.addUser(user).then(() => {
								cy.testSearchDetailsPageReviews(viewport, user, org);
							});
						});
					});
				});
			});
			it('Testing Search page Detail Page Reviews Action', () => {
				cy.get('@organization').then((org) => {
					cy.addOrg(org).then(() => {
						cy.get('@user').then((user) => {
							cy.addUser(user).then(() => {
								cy.testSearchDetailsPageReviewsAction(viewport, user, org);
							});
						});
					});
				});
			});
		});
	});
});
