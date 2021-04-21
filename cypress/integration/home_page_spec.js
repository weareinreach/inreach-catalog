
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url
let compoundURL = null;

//Test Suite
describe('Login Page Suite of Tests',()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('baseUrl'));
    });

    //Root
    it('Root Test - Visual',()=>{
        cy.root().should('match', 'html');
    });
});