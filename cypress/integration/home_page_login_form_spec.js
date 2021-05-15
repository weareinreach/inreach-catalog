/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Suite of Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });

    //Root
    it('Root Test - Visual', () => {
        cy.root().should('match', 'html');
    });

    //Login Form
    //Desktop
    context('Desktop Version of the application',()=>{
        it('Login Form Components',()=>{

        });
        it('Login Action',()=>{
            cy.getElementByTestId('nav-account-sign-in').then($element =>{
                expect($element).to.be.visible;
                //click
                cy.wrap($element).click();
                cy.getElementByTestId('log-in-dialog-container').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-title').then($element=>{
                    expect($element).to.contain('Log In');
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('log-in-dialog-container-login-form').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-email-input').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain('Email');
                });
                cy.getElementByTestId('log-in-dialog-container-password-input').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain('Password');
                });


            });
        });
    });

});