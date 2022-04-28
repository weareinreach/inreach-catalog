/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Suggest New Resource Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];
    
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('organization.json').as('organization');
        cy.fixture('user_new.json').as('user');
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
                        cy.testSuggestionElements(viewport,org);
                    });
                });
                it(`Suggest New Organization Action Already Exists`,()=>{
                    cy.get('@user').then(user=>{
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then(()=>{
                                cy.testSuggestionAlreadyExists(viewport,org);
                            });
                        });
                    });
                });
                it(`Suggest New Organization Action`,()=>{
                    cy.get('@user').then(user=>{
                        cy.addUser(user).then(()=>{
                            cy.get('@organization').then(org=>{
                                cy.testSuggestionAction(viewport,user,org);
                            });
                        });
                        
                    });
                });
        });
    });
});