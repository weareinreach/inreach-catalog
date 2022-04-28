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
        organization:'Surprisingly Unique Org Name"'
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
        organization:'Surprisingly Unique Org Name"'
    } 
};

//Create Account Option Types
Cypress.Commands.add('testCreateAccountOptionTypes',(viewport)=>{
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

        cy.getElementByTestId('dialog-container-sign-up-question').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain('Which are you?');
        });
        cy.getElementByTestId('dialog-container-sign-up-attorney-button').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am an attorney or law student");
            expect($element).to.have.attr('type', 'submit');
            cy.wrap($element).click();
        });
        cy.getElementByTestId('sign-up-form-back-button').click();

        cy.getElementByTestId('dialog-container-sign-up-question').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain('Which are you?');
        });
        cy.getElementByTestId('dialog-container-sign-up-non-legal-service-provider-button').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am a non-legal service provider");
            expect($element).to.have.attr('type', 'submit');
            cy.wrap($element).click();
        });
        cy.getElementByTestId('sign-up-form-back-button').click();
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

            //country of origin - select a radio option
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

            //go back
            cy.getElementByTestId('sign-up-form-back-button').click();

            //change country value with 'Other' radio button and complete text field
            cy.getElementByTestId('about-you-country-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("My country of origin is in..");
            });
            cy.getElementByTestId('other').click();
            cy.get('[name="specifiedCountry"]').focus().type('a').blur();
            cy.get('[id=specifiedCountry-helper-text]').should('be.visible')
                      .should('contain', "'Country' field must contain at least 2 characters");
            cy.getElementByTestId('about-you-next-button').should('be.disabled');
            cy.get('[name="specifiedCountry"]').focus().type('abc').blur()
            cy.get('[id=specifiedCountry-helper-text]').should('be.visible')
                      .should('contain', "'Country' field is valid");
            cy.getElementByTestId('about-you-next-button').click();

            //identity
            cy.getElementByTestId('about-you-identity-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("I identify as..");
            });
            cy.getElementByTestId('asexual').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();
            
            //go back
            cy.getElementByTestId('sign-up-form-back-button').click();

            //select another identity
            cy.getElementByTestId('questioning').click();
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });

            //also select 'other'
            cy.getElementByTestId('other').click();
            cy.get('[name="specifiedIdentity"]').focus().type('id me').blur();
            cy.getElementByTestId('about-you-next-button').click();

            cy.getElementByTestId('sign-up-form-back-button').click();

            //deselect Other
            cy.getElementByTestId('other').click();
            cy.getElementByTestId('about-you-next-button').click();

            cy.getElementByTestId('sign-up-form-back-button').click();
            cy.getElementByTestId('prefer-not-to-say').click();
            cy.getElementByTestId('about-you-next-button').click();


            //ethnicity
            cy.getElementByTestId('about-you-ethnicity-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("My ethnicity/race is..");
            });
            cy.getElementByTestId('prefer-not-to-say').click();
            cy.get('form').find('[value="other"]').should('be.disabled');
            cy.getElementByTestId('about-you-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type','submit');
            });
            cy.getElementByTestId('about-you-next-button').click();
            cy.getElementByTestId('sign-up-form-back-button').click();
            cy.getElementByTestId('prefer-not-to-say').click();

            //also select 'other'
            cy.getElementByTestId('other').click();
            cy.get('[name="specifiedEthnicity"]').focus().type('ethnicity me').blur();
            cy.getElementByTestId('about-you-next-button').click();
            cy.getElementByTestId('sign-up-form-back-button').click();

            //deselect Other
            cy.getElementByTestId('other').click();
            cy.getElementByTestId('about-you-next-button').click();


            //age
            cy.getElementByTestId('about-you-age-form').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.contain("How old are you?");
            });
            cy.getElementByTestId('56-65').click();
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
                
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.be.disabled;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });

                cy.get('[type="radio"]').first().check({force:true});

                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.not.be.disabled;
                }).click({force:true});

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
                }).click({force: true});                
                
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
                    expect($element.children()).to.contain("Request to join organization"); 
                    cy.wrap($element).click();
                });

                //Confirmation
                cy.getElementByTestId('dialog-container-title').should('contain', 'Connect Your Organization');
                cy.getElementByTestId('sign-up-form-org-request-rcv').should('contain', "Thank you for requesting to join your organization!");
                cy.getElementByTestId('sign-up-form-org-request-next').should('contain', "Please be on the lookout for an email from the InReach team shortly with next steps.");
                
                //Click finish
                cy.getElementByTestId('sign-up-form-finish-registration-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Next"); 
                 }).click();
                

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
                }).click();

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

//Create Account - Provider   
Cypress.Commands.add('testCreateAccountProvider',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                
                //create user - provider
                cy.getElementByTestId('name-location-form').within(() => {
                  cy.get('input[name="name"]').should('have.attr', 'placeholder', variables[userType].name_placeholder_content);
                  cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', variables[userType].currentLocation_placeholder_content);
                  cy.get('input[name="name"]').type(variables[userType].name_content);
                  cy.get('input[name="currentLocation"]').type(variables[userType].currentLocation_content);
                });

                cy.getElementByTestId('name-location-form').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Where do you work or volunteer? *");
                });
                
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.be.disabled;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });

                cy.get('[type="radio"]').first().check({force:true});
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.not.be.disabled;
                }).click({force: true});

                cy.getElementByTestId('sign-up-form-back-button').click({force: true});
                cy.getElementByTestId('other').click();
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.be.disabled;
                });
                cy.get('[name="specifiedOrgType"]').focus().type('an organization').blur();
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.not.be.disabled;
                }).click({force: true});

                //create user - provider
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
                    expect($element).to.not.be.disabled;
                }).click({force:true});
                
                
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
                    expect($element.children()).to.contain("Request to join organization"); 
                    cy.wrap($element).click();
                });

                //Confirmation
                cy.getElementByTestId('dialog-container-title').should('contain', 'Connect Your Organization');
                cy.getElementByTestId('sign-up-form-org-request-rcv').should('contain', "Thank you for requesting to join your organization!");
                cy.getElementByTestId('sign-up-form-org-request-next').should('contain', "Please be on the lookout for an email from the InReach team shortly with next steps.");
                
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

//------
//Create Account check passwords  
Cypress.Commands.add('testCreateAccountPasswordTests',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                
                //sign up, password must be at least 10 characters with letters, numbers, and special characters
                //create user - seeker
                cy.getElementByTestId('name-email-password-form').within(() => {
                  cy.get('input[name="name"]').should('have.attr', 'placeholder', variables[userType].name_placeholder_content);
                  cy.get('input[name="email"]').should('have.attr', 'placeholder', variables[userType].email_placeholder_content);
                  cy.get('input[name="password"]').should('have.attr', 'placeholder', variables[userType].password_placeholder_content);
                  cy.get('input[name="name"]').type(variables[userType].name_content);
                  cy.get('input[name="email"]').type(variables[userType].email_content);
                  cy.get('input[name="password"]').type('no').blur();
                  cy.get('[id=password-helper-text]').should('be.visible')
                      .should('contain', 'Invalid password - your password must be at least 10 characters long; it must contain 1 uppercase character, 1 number, and 1 special character of the following !@#$%^&?')
                });
                

                if(viewport !== Cypress.env('mobile')){
                    cy.getElementByTestId('dialog-close-button').click({force:true});
                } 
            });
        });
    }); 

//Create Account Action as Provider then skip organization  
Cypress.Commands.add('testCreateAccountActionSkipOrganization',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});
                
                //create user - provider
                cy.getElementByTestId('name-location-form').within(() => {
                  cy.get('input[name="name"]').should('have.attr', 'placeholder', variables[userType].name_placeholder_content);
                  cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', variables[userType].currentLocation_placeholder_content);
                  cy.get('input[name="name"]').type(variables[userType].name_content);
                  cy.get('input[name="currentLocation"]').type(variables[userType].currentLocation_content);
                });

                cy.getElementByTestId('name-location-form').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.contain("Where do you work or volunteer? *");
                });
                cy.getElementByTestId('healthcare-provider').click({force:true});
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });
                cy.getElementByTestId('sign-up-form-next-button').click({force: true});

                //create user - provider
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
                cy.getElementByTestId('sign-up-form-submit-button').click({force: true});
                
                
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
                    expect($element).contain('Do you volunteer or work at an organization able to serve LGBTQ+ asylum seekers? Find or add your organization in our Catalog.');
                });

                cy.getElementByTestId('sign-up-form-body-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('You may also join your organization later in Account Settings.');
                });
                               
                //click skip - Don't join an organization
                cy.getElementByTestId('sign-up-form-skip-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('skip');
                });
                cy.getElementByTestId('sign-up-form-skip-text').click();

                
                //goes to organization about you details
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
                cy.getElementByTestId('about-you-next-button').click();

                //goes to thank you
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

//Create Account Actions as Lawyer skip organization, then click thank you resource  button
Cypress.Commands.add('testCreateAccountActionSkipOrganizationResource',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});

                //sign up as lawyer
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
                cy.getElementByTestId('corporate-law').click({force:true});
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });
                cy.getElementByTestId('sign-up-form-next-button').click({force: true});

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
                cy.getElementByTestId('sign-up-form-submit-button').click({force: true});
                
                
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
                
                //click skip - don't' join org
                cy.getElementByTestId('sign-up-form-skip-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('skip');
                });
                cy.getElementByTestId('sign-up-form-skip-text').click();

                
                //fill in about you details
                cy.getElementByTestId('about-you-organization-form').within(() => {
                  cy.get('input[name="orgName"]').should('have.attr', 'placeholder', 'Your firm or organization').type('a random org name');
                  cy.get('input[name="orgPositionTitle"]').should('have.attr', 'placeholder', 'Your position in the organization').type('a random org title');
                  cy.get('input[name="reasonForJoining"]').should('have.attr', 'placeholder', 'I joined InReach because..').type('a random reason');
                });
                cy.getElementByTestId('about-you-next-button').click();

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

//Create Account Actions as Lawyer skip organization, then click thank you my profile  button
Cypress.Commands.add('testCreateAccountActionSkipOrganizationProfile',(viewport,userType)=>{
        cy.viewport(viewport);
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            cy.wrap($element).click({force: true});
            cy.getElementByTestId(variables[userType].dialog_container_button).then($element=>{
                cy.wrap($element).click({force: true});

                //sign up as lawyer
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
                cy.getElementByTestId('corporate-law').click({force:true});
                cy.getElementByTestId('sign-up-form-next-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).to.contain("Next");
                    expect($element).to.have.attr('type','submit');
                });
                cy.getElementByTestId('sign-up-form-next-button').click({force: true});

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
                cy.getElementByTestId('sign-up-form-submit-button').click({force: true});
                
                
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
                
                //click skip - don't' join org
                cy.getElementByTestId('sign-up-form-skip-text').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('skip');
                });
                cy.getElementByTestId('sign-up-form-skip-text').click();

                
                //fill in about you details
                cy.getElementByTestId('about-you-organization-form').within(() => {
                  cy.get('input[name="orgName"]').should('have.attr', 'placeholder', 'Your firm or organization').type('a random org name');
                  cy.get('input[name="orgPositionTitle"]').should('have.attr', 'placeholder', 'Your position in the organization').type('a random org title');
                  cy.get('input[name="reasonForJoining"]').should('have.attr', 'placeholder', 'I joined InReach because..').type('a random reason');
                });
                cy.getElementByTestId('about-you-next-button').click();

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
                    cy.getElementByTestId('account-page-logout',{ timeout: 10000 }).should('exist');
                };
                
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
