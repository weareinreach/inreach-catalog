/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Organization Details Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });
    
    //Root
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Static Resource elements',()=>{
                cy.testStaticResource(viewport);
            });
        });
    });
});