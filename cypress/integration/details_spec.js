/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Organization Details Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];
    //let viewports = [Cypress.env('tablet')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('organization_search.json').as('organization');
        cy.fixture('user_new.json').as('user').then(user=>{
            //Add User
            cy.addUser(user);
        });
    });
    afterEach(()=>{
        //Do the clean up
        cy.deleteUsersIfExist();
    });

    //Root
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Search page Detail Page About elements',()=>{
                cy.get('@organization').then(org=>{
                    cy.get('@user').then(user=>{
                        cy.testSearchDetailPageAbout(viewport,user,org);
                    });
                });
            });
            it('Testing Search page Detail Page Service elements',()=>{
                cy.get('@organization').then(org=>{
                    cy.get('@user').then(user=>{
                        cy.testSearchDetailsPageService(viewport,user,org);
                    });
                });
            });
            it('Testing Search page Detail Page Reviews elements',()=>{
                cy.get('@organization').then(org=>{
                    cy.get('@user').then(user=>{
                        cy.testSearchDetailsPageReviews(viewport,user,org);
                    });
                });
            });
        });
    });

});