/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Forgot Password Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];
    
    beforeEach(() => {
        cy.fixture('user_new.json').as('new_user');
        cy.visit(Cypress.env('baseUrl'));
    });
    afterEach(() => {
        //Do the clean up
        cy.deleteUsersIfExist();
    });

    //Root
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Forgot Password flow Elements',()=>{
                cy.testForgotPasswordElements(viewport);
            });
            it('Testing Forgot Password bad Account',()=>{
                cy.testForgotPasswordActionBadEmail(viewport,"random@gmail.com");
            });
            it('Testing Forgot Password Good Acccount',()=>{
                cy.get('@new_user').then(user =>{
                    cy.addUser(user).then(() => {
                        cy.testForgotPasswordActionGoodEmail(viewport,user.email);
                    });
                });
            });
            it.only('Bad Request Error test', ()=>{
                cy.testBadRequestError(viewport, "anything@gmail.com");
            });
        });
    });
});