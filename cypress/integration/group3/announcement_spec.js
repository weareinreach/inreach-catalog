/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Suggest New Resource Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet')];
    
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });

     //Root
     it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    //Components and Action
    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
                it(`Announcement Testing`,()=>{
                        cy.testAnnouncementBannerElementsAndActions(viewport);
                    }); 
                });
            });


});