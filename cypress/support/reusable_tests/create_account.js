//---------------------- Create Account --------------------------
// Imports
import * as user_regular from '../../fixtures/sign_up_user_regular.json';
import * as user_attorney from  '../../fixtures/sign_up_user_attorney.json';
import * as user_service_provider from '../../fixtures/sign_up_user_service_provider.json';
import * as organization from '../../fixtures/organization.json';

// Variables
let variables =  {
    myself:{
        user:user_regular,
        dialog_container_button:'dialog-container-sign-up-help-myself-button',
        email_content:'Email',
        organization:organization
    },
    lawyer:{
        user:user_attorney,
        dialog_container_button:'dialog-container-sign-up-attorney-button',
        email_content:'Firm, Organization or School Email',
        organization:organization
    },
    service_provider:{
        user:user_service_provider,
        dialog_container_button:'dialog-container-sign-up-non-legal-service-provider-button',
        email_content:'Organization Email',
        organization:organization
    } 
};

//Create Account Elements State 0 
Cypress.Commands.add('testCreateAccountState0Elements',(viewport)=>{
    //Set View Port
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        expect($element).to.be.visible;
        //click
        cy.wrap($element).click({
            force: true
        });

        cy.getElementByTestId('dialog-container-sign-up-form').should('be.visible');
        cy.getElementByTestId('dialog-container-sign-up-question').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain('Which are you?');
        });
        cy.getElementByTestId('dialog-container-sign-up-help-myself-button').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am looking for help for myself");
            expect($element).to.have.attr('type', 'submit');
        });
        cy.getElementByTestId('dialog-container-sign-up-attorney-button').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am an attorney or law student");
            expect($element).to.have.attr('type', 'submit');
        });
        cy.getElementByTestId('dialog-container-sign-up-non-legal-service-provider-button').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am a non-legal service provider");
            expect($element).to.have.attr('type', 'submit');
        });
        cy.getElementByTestId('dialog-container-sign-up-already-have-account').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("Already have an account?");
        });
    });
});

//back button
Cypress.Commands.add('testCreateAccountBackButton',(viewport)=>{
    //Set View Port
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        expect($element).to.be.visible;
        //click
        cy.wrap($element).click({
            force: true
        });

        cy.getElementByTestId('dialog-container-sign-up-form').should('be.visible');
        cy.getElementByTestId('dialog-container-sign-up-question').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain('Which are you?');
        });
        cy.getElementByTestId('dialog-container-sign-up-help-myself-button').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am looking for help for myself");
            expect($element).to.have.attr('type', 'submit');
            cy.wrap($element).click();
        });
        cy.getElementByTestId('sign-up-form-back-button').click();
        cy.getElementByTestId('dialog-container-sign-up-question').should('be.visible');
    });
});

//Create Account Elements State 0  - already click
Cypress.Commands.add('testCreateAccountAlreadyHaveOne',(viewport)=>{
    //Set View Port
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        expect($element).to.be.visible;
        //click
        cy.wrap($element).click({
            force: true
        });
        cy.getElementByTestId('dialog-container-sign-up-already-have-account').click();        
        if(viewport !== Cypress.env('mobile')){
            cy.getElementByTestId('dialog-container-title').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("Sign In"); 
             });
        }
        if(viewport === Cypress.env('mobile')){
            cy.getElementByTestId('account-mobile-sign-in').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("Sign In"); 
             });
        }
    });
});

//Create Account Elements State 1
Cypress.Commands.add('testCreateAccountState1Elements',(viewport,userType)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        cy.wrap($element).click({force: true});
    cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
        cy.wrap($element).click({force: true});
        cy.getElementByTestId('sign-up-form-email-input').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain(variables[userType].email_content);

        });
        cy.getElementByTestId('sign-up-form-password-input').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Password");
        });
        cy.getElementByTestId('sign-up-form-password-confirmation-input').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Confirm Password");
        });
        cy.getElementByTestId('sign-up-form-agreement-statement').then($element=>{
            expect($element).to.be.visible;
        });
        cy.getElementByTestId('sign-up-form-privacy-link').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.contain("Privacy Policy");
            expect($element).to.have.attr('href','https://asylumconnect.org/privacy');
            expect($element).to.have.attr('target','_blank');
            expect($element).to.have.attr('rel','noopener noreferrer');
        });
        cy.getElementByTestId('sign-up-form-terms-link').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.contain("Terms of Use");
            expect($element).to.have.attr('href','https://asylumconnect.org/terms-of-use');
            expect($element).to.have.attr('target','_blank');
            expect($element).to.have.attr('rel','noopener noreferrer');
        });
        cy.getElementByTestId('sign-up-form-submit-button').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).to.contain("Sign Up");
            expect($element).to.have.attr('type','submit');
        });
        cy.getElementByTestId('sign-up-form-submit-button').click();

        //Only Test if Mobile
        if(viewport == Cypress.env('mobile')){
            cy.getElementByTestId('sign-up-form-back-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Back");
            });
        }
        });
    });
});

//Create Account Actions And Elements State 2 and 3    
Cypress.Commands.add('testCreateAccountAction',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                //sign up
                cy.getElementByTestId('sign-up-form-email-input').type(variables[userType].user.email);
                cy.getElementByTestId('sign-up-form-password-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-password-confirmation-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                if(userType !== 'myself'){
                    //Account Created
                    //State 2
                    cy.getElementByTestId('sign-up-form-header-text').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).contain('Connect to Your Organization');
                    });

                    cy.getElementByTestId('sign-up-form-body-text').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).contain('You may also join your organization later in account settings.');
                    });
                    
                    // try to join with no org specified
                    cy.getElementByTestId('sign-up-form-join-organization-button').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.contain("Join Organization"); 
                        cy.wrap($element).click();
                    });
                     //look for error message
                    cy.getElementByTestId('snackbar-message').should('be.visible').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).contain("Please enter a valid organization name.");
                        cy.getElementByTestId('snackbar-close-button').should('be.visible');
                        cy.getElementByTestId('snackbar-close-button').click();
                        cy.getElementByTestId('snackbar-message').should('not.exist');
                    });

                    //valid organization
                    cy.getElementByTestId('sign-up-form-find-organization').type(variables[userType].organization.name);
                    cy.getElementByTestId('sign-up-form-searched-organization').then($elements=>{
                        cy.wrap($elements[0]).click();
                    });

                    cy.getElementByTestId('sign-up-form-join-organization-button').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.contain("Join Organization"); 
                        cy.wrap($element).click();
                    });

                    //Confirmation
                    cy.getElementByTestId('sign-up-form-header-text').should('contain', 'Confirmation');
                    cy.getElementByTestId('sign-up-form-body-text').should('contain', "Thank you for requesting to join an organization's profile page on AsylumConnect. Our team will review your request shortly. We will reach out if we need more information to verify your connection to the requested organization.");
                    
                    //Click finish
                    cy.getElementByTestId('sign-up-form-finish-registration-button').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.contain("Finish Registration"); 
                     });
                    cy.getElementByTestId('sign-up-form-finish-registration-button').click();
                    

                    if(viewport !== Cypress.env('mobile')){
                        //thank you modal
                        cy.getElementByTestId('dialog-container-title').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).to.contain("Thank you!"); 
                         });
                        //resources button
                        cy.getElementByTestId('thank-you-resource-button').then($element=>{
                            expect($element).to.be.visible;
                         });
                        //profile button
                        cy.getElementByTestId('thank-you-profile-button').then($element=>{
                            expect($element).to.be.visible;
                         });
                    }
                };
                
                //logout
                if(viewport === Cypress.env('mobile')){
                    //close thank you dialog
                    cy.getElementByTestId('thank-you-profile-button').click();
                    //then log out
                    cy.getElementByTestId('mobile-nav-button-account').click()
                    cy.getElementByTestId('account-page-logout').click();
                }else{
                    cy.getElementByTestId('nav-account-sign-out').click({force:true});
                } 
            });
        });
    }); 

//Create Account check passwords   
Cypress.Commands.add('testCreateAccountPasswordTests',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                
                //sign up, password must be at least 8 characters
                cy.getElementByTestId('sign-up-form-email-input').type(variables[userType].user.email);
                cy.getElementByTestId('sign-up-form-password-input').type('1111111');
                cy.getElementByTestId('sign-up-form-password-confirmation-input').type('1111111');
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                 //look for error message
                cy.getElementByTestId('snackbar-message').should('be.visible').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Password must be at least 8 characters.');
                    cy.getElementByTestId('snackbar-close-button').should('be.visible');
                    cy.getElementByTestId('snackbar-close-button').click();
                    cy.getElementByTestId('snackbar-message').should('not.exist');
                });

                //sign up, passwords must match
                cy.getElementByTestId('sign-up-form-email-input').click().clear().type(variables[userType].user.email);
                cy.getElementByTestId('sign-up-form-password-input').click().clear().type('11111111');
                cy.getElementByTestId('sign-up-form-password-confirmation-input').click().clear().type('1111111x');
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                
                 //look for error message
                cy.getElementByTestId('snackbar-message').should('be.visible').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('The passwords you have entered do not match.');
                    cy.getElementByTestId('snackbar-close-button').should('be.visible');
                    cy.getElementByTestId('snackbar-close-button').click();
                    cy.getElementByTestId('snackbar-message').should('not.exist');
                });

                if(viewport !== Cypress.env('mobile')){
                    cy.getElementByTestId('dialog-close-button').click({force:true});
                } 
            });
        });
    }); 

//Create Account Actions, Elements State 2 and 3, skip organization  
Cypress.Commands.add('testCreateAccountActionSkipOrganization',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                //sign up
                cy.getElementByTestId('sign-up-form-email-input').type(variables[userType].user.email);
                cy.getElementByTestId('sign-up-form-password-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-password-confirmation-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                if(userType !== 'myself'){
                    //Account Created
                    //State 2
                    cy.getElementByTestId('sign-up-form-header-text').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).contain('Connect to Your Organization');
                    });

                    cy.getElementByTestId('sign-up-form-body-text').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).contain('You may also join your organization later in account settings.');
                    });
                    
                    //click skip
                    cy.getElementByTestId('sign-up-form-skip-text').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).contain('skip');
                    });
                    cy.getElementByTestId('sign-up-form-skip-text').click();

                    if(viewport !== Cypress.env('mobile')){
                        //thank you modal
                        cy.getElementByTestId('dialog-container-title').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).to.contain("Thank you!"); 
                         });
                        //resources button
                        cy.getElementByTestId('thank-you-resource-button').then($element=>{
                            expect($element).to.be.visible;
                         });
                        //profile button
                        cy.getElementByTestId('thank-you-profile-button').then($element=>{
                            expect($element).to.be.visible;
                         });
                    }
                };
                //logout
                if(viewport === Cypress.env('mobile')){
                    cy.getElementByTestId('thank-you-resource-button').click();
                    cy.getElementByTestId('mobile-nav-button-account').click()
                    cy.getElementByTestId('account-page-logout').click();
                }else{
                    cy.getElementByTestId('nav-account-sign-out').click({force:true});
                } 
            });
        });
    }); 

//Create Account Actions, Elements State 2 and 3, skip organization, thank you resource  
Cypress.Commands.add('testCreateAccountActionSkipOrganizationResource',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                //sign up
                cy.getElementByTestId('sign-up-form-email-input').type(variables[userType].user.email);
                cy.getElementByTestId('sign-up-form-password-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-password-confirmation-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                if(userType !== 'myself'){
                //Account Created
                //State 2
                cy.getElementByTestId('sign-up-form-header-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Connect to Your Organization');
                });

                cy.getElementByTestId('sign-up-form-body-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('You may also join your organization later in account settings.');
                });
                
                //click skip
                cy.getElementByTestId('sign-up-form-skip-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('skip');
                });
                cy.getElementByTestId('sign-up-form-skip-text').click();

                if(viewport !== Cypress.env('mobile')){
                    //thank you modal
                    cy.getElementByTestId('dialog-container-title').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.contain("Thank you!"); 
                     });
                    //resources button
                    cy.getElementByTestId('thank-you-resource-button');
                    cy.getElementByTestId('thank-you-resource-button').click();
                    cy.getElementByTestId('thank-you-header').should('not.exist');
                    cy.getElementByTestId('search-form-body',{ timeout: 10000 }).should('exist');
                    };
                }
                //logout
                if(viewport === Cypress.env('mobile')){
                    cy.getElementByTestId('thank-you-profile-button').click();
                    cy.getElementByTestId('mobile-nav-button-account').click()
                    cy.getElementByTestId('account-page-logout').click();
                }else{
                    cy.getElementByTestId('nav-account-sign-out').click({force:true});
                } 
            });
        });
    }); 

//Create Account Actions, Elements State 2 and 3, skip organization, thank you profile  
Cypress.Commands.add('testCreateAccountActionSkipOrganizationProfile',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                //sign up
                cy.getElementByTestId('sign-up-form-email-input').type(variables[userType].user.email);
                cy.getElementByTestId('sign-up-form-password-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-password-confirmation-input').type(variables[userType].user.password);
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                if(userType !== 'myself'){
                //Account Created
                //State 2
                cy.getElementByTestId('sign-up-form-header-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Connect to Your Organization');
                });

                cy.getElementByTestId('sign-up-form-body-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('You may also join your organization later in account settings.');
                });
                
                //click skip
                cy.getElementByTestId('sign-up-form-skip-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('skip');
                });
                cy.getElementByTestId('sign-up-form-skip-text').click();

                if(viewport !== Cypress.env('mobile')){
                    //thank you modal
                    cy.getElementByTestId('dialog-container-title').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.contain("Thank you!"); 
                     });
                    //resources button
                    cy.getElementByTestId('thank-you-profile-button');
                    cy.getElementByTestId('thank-you-profile-button').click();
                    cy.getElementByTestId('thank-you-header').should('not.exist');
                    cy.getElementByTestId('account-page-header',{ timeout: 10000 }).should('exist');
                    };
                }
                //logout
                if(viewport === Cypress.env('mobile')){
                    cy.getElementByTestId('thank-you-resource-button').click();
                    cy.getElementByTestId('mobile-nav-button-account').click();
                    cy.getElementByTestId('account-page-logout').click();
                }else{
                    cy.getElementByTestId('nav-account-sign-out').click({force:true});
                } 
            });
        });
    }); 


