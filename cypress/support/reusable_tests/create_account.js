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
        name_placeholder_content:'John Smith',
        name_content: 'Test User Myself',
        email_placeholder_content:'john@gmail.com',
        email_content: 'automation-regular@gmail.com',
        password_placeholder_content: '***',
        password_content: '1111111Kl#',
        organization:organization
    },
    lawyer:{
        user:user_attorney,
        dialog_container_button:'dialog-container-sign-up-attorney-button',
        name_placeholder_content:'John Smith',
        name_content: 'Test User lawyer',
        email_placeholder_content:'john@gmail.com',
        email_content: 'automation-attorney@gmail.com',
        currentLocation_placeholder_content:'San Francisco',
        currentLocation_content: 'New York City, NY',
        password_placeholder_content: '***',
        password_content: '1111111Kl#',
        organization:'Another Test'
    },
    service_provider:{
        user:user_service_provider,
        dialog_container_button:'dialog-container-sign-up-non-legal-service-provider-button',
        name_placeholder_content:'John Smith',
        name_content: 'Test User Provider',
        email_placeholder_content:'john@gmail.com',
        email_content: 'automation-service-provider@gmail.com',
        currentLocation_placeholder_content:'San Francisco',
        currentLocation_content: 'New York City, NY',
        password_placeholder_content: '***',
        password_content: '1111111Kl#',
        organization:organization
    } 
};

//Create Account Option Types
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

//Create Account - already have account
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

//Create Account - Seeker 
Cypress.Commands.add('testCreateAccountSeeker',(viewport,userType)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        cy.wrap($element).click({force: true});
        cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
            cy.wrap($element).click({force: true});

            //create user - seeker
            cy.getElementByTestId('name-email-password-form').within(() => {
              cy.get('input[name="name"]').should('have.attr', 'placeholder', variables[userType].name_placeholder_content);
              cy.get('input[name="email"]').should('have.attr', 'placeholder', variables[userType].email_placeholder_content);
              cy.get('input[name="password"]').should('have.attr', 'placeholder', variables[userType].password_placeholder_content);
              cy.get('input[name="name"]').type(variables[userType].name_content);
              cy.get('input[name="email"]').type(variables[userType].email_content);
              cy.get('input[name="password"]').type(variables[userType].password_content);
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

            //new user about you dialogs - need to wait until the POST 
            //completes before accessing the About You dialog
            cy.intercept('/v1/*').as('user');
            cy.wait(['@user']);
            cy.getElementByTestId('dialog-container-title').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("About You");
            });
            cy.getElementByTestId('dialog-container-subtitle').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("Help us improve your experience by telling us more about yourself");
            });

            //immigration
            cy.getElementByTestId('about-you-immigration-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("I am a(n)..");
            });
            cy.getElementByTestId('asylum-seeker').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();

            //country of origin
            cy.getElementByTestId('about-you-country-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("My country of origin is in..");
            });
            cy.getElementByTestId('africa').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();

            //identity
            cy.getElementByTestId('about-you-identity-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("I identity as..");
            });
            cy.getElementByTestId('asexual').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();

            //ethnicity
            cy.getElementByTestId('about-you-ethnicity-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("My ethnicity/race is..");
            });
            cy.getElementByTestId('indian').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();

            //age
            cy.getElementByTestId('about-you-age-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("How old are you?");
            });
            cy.getElementByTestId('65').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Submit");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();

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
            }; 
        });
    });
});


//Create Account - Lawyer   
Cypress.Commands.add('testCreateAccountLawyer',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                
                //create user - lawyer
                cy.getElementByTestId('name-location-form').within(() => {
                  cy.get('input[name="name"]').should('have.attr', 'placeholder', variables[userType].name_placeholder_content);
                  cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', variables[userType].currentLocation_placeholder_content);
                  cy.get('input[name="name"]').type(variables[userType].name_content);
                  cy.get('input[name="currentLocation"]').type(variables[userType].currentLocation_content);
                });

                cy.getElementByTestId('name-location-form').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Where do you practice law? *");
                });
                cy.getElementByTestId('corp').click();
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });
                cy.getElementByTestId('sign-up-form-next-button').click();

                //create user - lawyer
                cy.getElementByTestId('name-email-password-form').within(() => {
                  cy.get('input[name="email"]').should('have.attr', 'placeholder', variables[userType].email_placeholder_content);
                  cy.get('input[name="password"]').should('have.attr', 'placeholder', variables[userType].password_placeholder_content);
                  cy.get('input[name="email"]').type(variables[userType].email_content);
                  cy.get('input[name="password"]').type(variables[userType].password_content);
                });

                cy.getElementByTestId('sign-up-form-submit-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Sign Up");
                    expect($element).to.have.attr('type','submit');
                });
                cy.getElementByTestId('sign-up-form-submit-button').click();
                
                
                //user is created, need to wait until POST  
                //completes before accessing the organization search dialog
                cy.intercept('/v1/*').as('user');
                cy.wait(['@user']);
                //Account Created
                //State 2
                cy.getElementByTestId('dialog-container-title').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Connect Your Organization');
                });

                cy.getElementByTestId('dialog-container-subtitle').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Find or add your organization in our Catalog');
                });

                cy.getElementByTestId('sign-up-form-body-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('You may also join your organization later in Account Settings.');
                });
                
                //valid organization
                cy.getElementByTestId('sign-up-form-find-organization').type(variables[userType].organization);
                cy.getElementByTestId('sign-up-form-searched-organization').then($elements=>{
                    cy.wrap($elements[0]).click();
                });

                cy.getElementByTestId('sign-up-form-join-organization-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Request to join Organization"); 
                    cy.wrap($element).click();
                });

                //Confirmation
                cy.getElementByTestId('dialog-container-title').should('contain', 'Connect Your Organization');
                cy.getElementByTestId('sign-up-form-org-request-rcv').should('contain', "Thank you for requesting to join your organization!");
                cy.getElementByTestId('sign-up-form-org-request-next').should('contain', "Please be on the lookout for an email from the AsylumConnect team shortly with next steps.");
                
                //Click finish
                cy.getElementByTestId('sign-up-form-finish-registration-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Next"); 
                 });
                cy.getElementByTestId('sign-up-form-finish-registration-button').click();
                

                //organization about you details
                if(viewport !== Cypress.env('mobile')){
                    cy.getElementByTestId('dialog-container-title').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.contain("About You");
                    });
                };
                cy.getElementByTestId('dialog-container-subtitle').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Help us improve your experience by telling us more about yourself");
                });
                cy.getElementByTestId('about-you-organization-form').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Name of your firm or organization");
                    expect($element).to.contain("Position title");
                    expect($element).to.contain("Your reason for joining");

                });
                cy.getElementByTestId('about-you-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });
                cy.getElementByTestId('about-you-next-button').click();

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
                }; 
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
                        expect($element).contain('Join Your Organization');
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
                    expect($element).contain('Join Your Organization');
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
                    expect($element).contain('Join Your Organization');
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


