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
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    //Create Account Elements
    context('Desktop Version of the application', () => {
        it('Sign Up Form Components - state 0', () => {
            cy.testCreateAccountElements(Cypress.env('desktop'));
        });
    });
    context('Tablet Version of the application', () => {
        it('Sign Up Form Components - state 0', () => {
            cy.testCreateAccountElements(Cypress.env('tablet'));
        });
    });
    context('Mobile Version of the application', () => {
        it('Sign Up Form Components - state 0', () => {
            cy.testCreateAccountElements(Cypress.env('mobile'));
        });
    });

    //Create Account For Myself Elements
    context('Desktop Version of the application', () => {
        it.only('Sign Up For Myself - state 1', () => {
            cy.testCreateAccountForMyselfElements(Cypress.env('desktop'));
        });
    });
    context('Tablet Version of the application', () => {
        it.only('Sign Up For Myself - state 1', () => {
            cy.testCreateAccountForMyselfElements(Cypress.env('tablet'));
        });
    });
    context('Mobile Version of the application', () => {
        it.only('Sign Up For Myself - state 1', () => {
            cy.testCreateAccountForMyselfElements(Cypress.env('mobile'));
        });
    });
});