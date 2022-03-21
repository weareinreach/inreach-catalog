/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Suggest New Resource Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];
    
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        //user
        cy.fixture('user_new.json').as('user').then(user=>{
            //Add User
            cy.addUser(user);
        });
        //org
        cy.fixture('organization.json').as('organization').then(organization=>{
            //Add Org
            cy.addOrg(organization);
        });
    });

    afterEach(() => {
        //Do the clean up
        cy.deleteUsersIfExist();
        cy.deleteOrgsIfExist();
    });

    //Root
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    //Components and Action
    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
                it(`Suggest New Organization Elements`,()=>{
                    cy.get('@organization').then(org=>{
                        cy.addOrg(org).then(()=>{
                            cy.testSuggestionElements(viewport,org);
                        }); 
                    });
                });
                it(`Suggest New Organization Action`,()=>{
                    cy.get('@user').then(user=>{
                        cy.get('@organization').then(org=>{
                            cy.testSuggestionAction(viewport,user,org);
                        });
                    });
                });
        });
    });
});