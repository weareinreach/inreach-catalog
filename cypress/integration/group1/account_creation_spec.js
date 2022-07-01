/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />


//compound url

//Test Suite
describe('Home Page Create Account Form Tests', () => {
    
    let viewports = [
        Cypress.env('desktop'),
        Cypress.env('tablet'),
        Cypress.env('mobile')];
    let userTypes = [Cypress.env('createAccountUserTypeMyself'),Cypress.env('createAccountUserTypeLawyer'),Cypress.env('createAccountUserTypeServiceProvider')];

    beforeEach(() => {
        cy.fixture('organization.json').as('organization');
        cy.fixture('sign_up_user_regular.json').as('regular_user');
        cy.fixture('sign_up_user_attorney.json').as('attorney');
        cy.fixture('sign_up_user_service_provider.json').as('provider');
        cy.fixture('user_types.json').as('user_types');
        cy.visit(Cypress.env('baseUrl'));
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

    //Create Account Elements 
    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            userTypes.forEach(userType=>{
                it(`Create account ${userType} all account options`,()=>{
                    cy.testCreateAccountOptionTypes(viewport,userType);
                });
                it(`Create account ${userType} - already have account`,()=>{
                    cy.testCreateAccountAlreadyHaveOne(viewport,userType);
                });
                it(`Create account ${userType} - back button`,()=>{
                    cy.testCreateAccountBackButton(viewport,userType);
                });
            // eslint-disable-next-line default-case
            switch(userType){
                case Cypress.env('createAccountUserTypeMyself'):
                    it(`Create account ${userType} - Seeker`,()=>{
                        cy.get('@user_types').then(userTypesObject=>{
                            cy.testCreateAccountSeeker(viewport,userType,userTypesObject[userType]);
                        });
                    });
                    it(`Create account ${userType} - password tests`,()=>{
                        cy.get('@user_types').then(userTypesObject=>{
                            cy.testCreateAccountPasswordTests(viewport,userType,userTypesObject[userType]);
                        });
                    });
                break;
            }
            });
        });
    });
});