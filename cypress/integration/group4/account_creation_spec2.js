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
            // eslint-disable-next-line default-case
            switch(userType){
                case Cypress.env('createAccountUserTypeLawyer'):
                    it(`Create account ${userType} - Lawyer`,()=>{
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then(()=>{
                                cy.get('@user_types').then(userTypesObject=>{
                                    cy.testCreateAccountLawyer(viewport,userType,org,userTypesObject[userType]);
                                });
                            });
                        });
                    });
                    it(`Creating account for ${userType} - click resource`,()=>{
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then(()=>{
                                cy.get('@user_types').then(userTypesObject=>{
                                    cy.testCreateAccountActionSkipOrganizationResource(viewport,userType,userTypesObject[userType]);
                                });
                            }); 
                        });
                    });
                    it(`Creating account for ${userType} - click profile`,()=>{
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then(()=>{
                                cy.get('@user_types').then(userTypesObject=>{
                                    cy.testCreateAccountActionSkipOrganizationProfile(viewport,userType,userTypesObject[userType]);
                                });
                            }); 
                        });
                    });
                break;
                case Cypress.env('createAccountUserTypeServiceProvider'):
                    it(`Create account ${userType} - Provider`,()=>{
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then(()=>{
                                cy.get('@user_types').then(userTypesObject=>{  
                                    cy.testCreateAccountProvider(viewport,userType,userTypesObject[userType]);
                                });
                            });
                        });
                    });
                    it(`Creating account for ${userType} -Provider skip org`,()=>{
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then(()=>{
                                cy.get('@user_types').then(userTypesObject=>{  
                                    cy.testCreateAccountActionSkipOrganization(viewport,userType,userTypesObject[userType]);
                                });
                            }); 
                        });
                    });
                break;
            }
        });
    });
});
