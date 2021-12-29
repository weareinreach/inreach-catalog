/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />


//compound url

//Test Suite
describe('Home Page Create Account Form Tests', () => {

    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];
    let userTypes = [Cypress.env('createAccountUserTypeMyself'),Cypress.env('createAccountUserTypeLawyer'),Cypress.env('createAccountUserTypeServiceProvider')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('organization.json').as('organization');

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

    //Create Account Elements state 0
    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            userTypes.forEach(userType=>{
                it(`Create account ${userType} elements state 0`,()=>{
                    cy.testCreateAccountState0Elements(viewport,userType);
                });
                it(`Create account ${userType} elements state 1`,()=>{
                    cy.testCreateAccountState1Elements(viewport,userType);
                });
                it(`Create account ${userType} - already have account`,()=>{
                    cy.testCreateAccountAlreadyHaveOne(viewport,userType);
                });
                it(`Create account ${userType} - back button`,()=>{
                    cy.testCreateAccountBackButton(viewport,userType);
                });
                it(`Create account ${userType} - password tests`,()=>{
                    cy.testCreateAccountPasswordTests(viewport,userType);
                });
                it(`Creating account for ${userType}`,()=>{
                    cy.get('@organization').then(org=>{
                        //Add Org
                        cy.addOrg(org).then(()=>{
                            cy.testCreateAccountAction(viewport,userType);
                        }); 
                    });
                });
                it(`Creating account for ${userType} skip org`,()=>{
                    cy.get('@organization').then(org=>{
                        //Add Org
                        cy.addOrg(org).then(()=>{
                            cy.testCreateAccountActionSkipOrganization(viewport,userType);
                        }); 
                    });
                });
                it(`Creating account for ${userType} skip org click resource`,()=>{
                    cy.get('@organization').then(org=>{
                        //Add Org
                        cy.addOrg(org).then(()=>{
                            cy.testCreateAccountActionSkipOrganizationResource(viewport,userType);
                        }); 
                    });
                });
                it(`Creating account for ${userType} skip org click profile`,()=>{
                    cy.get('@organization').then(org=>{
                        //Add Org
                        cy.addOrg(org).then(()=>{
                            cy.testCreateAccountActionSkipOrganizationProfile(viewport,userType);
                        }); 
                    });
                });
            });
        });
    });
});