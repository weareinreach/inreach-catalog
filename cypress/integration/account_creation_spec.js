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
                if(userType === 'myself'){
                    it(`Create account ${userType} - Seeker`,()=>{
                        cy.testCreateAccountSeeker(viewport,userType);
                    });
                    it(`Create account ${userType} - password tests`,()=>{
                        cy.testCreateAccountPasswordTests(viewport,userType);
                    });
                };
                if(userType === 'lawyer'){
                    it(`Create account ${userType} - Lawyer`,()=>{
                        cy.testCreateAccountLawyer(viewport,userType);
                    });
                    it(`Creating account for ${userType} - click resource`,()=>{
                        cy.get('@organization').then(org=>{
                            //Add Org
                            cy.addOrg(org).then(()=>{
                                cy.testCreateAccountActionSkipOrganizationResource(viewport,userType);
                            }); 
                        });
                    });
                    it(`Creating account for ${userType} - click profile`,()=>{
                        cy.get('@organization').then(org=>{
                            //Add Org
                            cy.addOrg(org).then(()=>{
                                cy.testCreateAccountActionSkipOrganizationProfile(viewport,userType);
                            }); 
                        });
                    });
                };
                if(userType === 'service_provider'){
                    it(`Create account ${userType} - Provider`,()=>{
                        cy.testCreateAccountProvider(viewport,userType);
                    });
                    it(`Creating account for ${userType} -Provider skip org`,()=>{
                        cy.get('@organization').then(org=>{
                            //Add Org
                            cy.addOrg(org).then(()=>{
                                cy.testCreateAccountActionSkipOrganization(viewport,userType);
                            }); 
                        });
                    });
                };
            });
        });
    });
});