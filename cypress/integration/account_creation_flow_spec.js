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

    //Create Account
    context('Desktop Version of the application', () => {
        it.only('Sign Up Form Components - state 0', () => {
            cy.getElementByTestId('nav-account-sign-up').then($element => {
                expect($element).to.be.visible;
                //click
                cy.wrap($element).click({force:true});

                cy.getElementByTestId('dialog-container-sign-up').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-title').then($element => {
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('dialog-container-sign-up-form').should('be.visible');
                cy.getElementByTestId('dialog-container-sign-up-question').then($element => {
                    expect($element).to.be.visible;
                    expect($element.children()).contain('Which are you?');
                });
                cy.getElementByTestId('dialog-container-sign-up-help-myself-button').then($element => {
                    expect($element).to.be.visible;
                    expect($element.children()).contain("I am looking for help for myself");
                    expect($element).to.have.attr('type', 'submit');
                });
                cy.getElementByTestId('dialog-container-sign-up-attorney').then($element => {
                    expect($element).to.be.visible;
                    expect($element.children()).contain("I am an attorney or law student");
                    expect($element).to.have.attr('type', 'submit');
                });
                cy.getElementByTestId('dialog-container-sign-up-non-legal-service-provider').then($element => {
                    expect($element).to.be.visible;
                    expect($element.children()).contain("I am a non-legal service provider");
                    expect($element).to.have.attr('type', 'submit');
                });
                cy.getElementByTestId('dialog-container-sign-up-already-have-account').then($element => {
                    expect($element).to.be.visible;
                    expect($element.children()).contain("Already have an account?");
                });
            });

        });
    });

});