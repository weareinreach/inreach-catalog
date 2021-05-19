/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('new_user');
    });
    afterEach(() => {
        //Do the clean up
        cy.deleteUsersIfExist();
    });

    //Root
    it('Root Test - Visual', () => {
        cy.root().should('match', 'html');
    });

    //Create Account Visual
    context('Desktop Version of the application', () => {
        it('Sign Up Form Components - state 0', () => {
            cy.testCreateAccountElements('macbook-16');
        });
    });
    context('Tablet Version of the application', () => {
        it('Sign Up Form Components - state 0', () => {
            cy.testCreateAccountElements('ipad-2');
        });
    });
    context('Mobile Version of the application', () => {
        it('Sign Up Form Components - state 0', () => {
            cy.testCreateAccountElements('iphone-x');
        });
    });

});