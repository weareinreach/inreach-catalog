/// <reference types="cypress" />

//Create Account Option Types
Cypress.Commands.add('testCreateAccountOptionTypes', (viewport) => {
    //Set View Port
    cy.viewport(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').should('be.visible').click({
                force: true
            });
            cy.getElementByTestId('account-mobile-sign-up').should('be.visible').click({
                force: true
            });
            break;
        default:
            cy.getElementByTestId('nav-account-sign-up').should('be.visible').click({
                force: true
            });
            break;
    }
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
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

    cy.getElementByTestId('dialog-container-sign-up-reviewer-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain("I am a Local Community Reviewer");
        expect($element).to.have.attr('type', 'submit');
    });

    cy.getElementByTestId('dialog-container-sign-up-already-have-account').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain("Already have an account?");
    });
});


//Create Account - already have account
Cypress.Commands.add('testCreateAccountAlreadyHaveOne', (viewport) => {
    //Set View Port
    cy.viewport(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').click({
                force: true
            });
            cy.getElementByTestId('account-mobile-sign-up').click({
                force: true
            });
            cy.getElementByTestId('dialog-container-sign-up-already-have-account').click();
            cy.getElementByTestId('log-in-dialog-container-sign-in-button').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Sign In');
            });
            break;
        default:
            cy.getElementByTestId('nav-account-sign-up').click({
                force: true
            });
            cy.getElementByTestId('dialog-container-sign-up-already-have-account').click();
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Sign In');
            });
            break;
    }
});

Cypress.Commands.add('testCreateAccountBackButton', (viewport) => {
    //Set View Port
    cy.viewport(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').should('be.visible').click({
                force: true
            });
            cy.getElementByTestId('account-mobile-sign-up').should('be.visible').click({
                force: true
            });
            break;
        default:
            cy.getElementByTestId('nav-account-sign-up').should('be.visible').click({
                force: true
            });
            break;
    }
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
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
    
    cy.getElementByTestId('dialog-container-sign-up-question').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain('Which are you?');
    });
    cy.getElementByTestId('dialog-container-sign-up-reviewer-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain("I am a Local Community Reviewer");
        expect($element).to.have.attr('type', 'submit');
        cy.wrap($element).click();
    });
    cy.getElementByTestId('sign-up-form-back-button').click();
});


//Create Account - Seeker 
Cypress.Commands.add('testCreateAccountSeeker', (viewport, userType, userTypeObject) => {
    cy.viewport(viewport);
    cy.deleteUsersIfExist();
    if(viewport !== 'iphone-x'){
        cy.getElementByTestId('nav-account-sign-up').click({
            force: true
        });
    }else {
        cy.getElementByTestId('mobile-nav-button-account').click({
            force: true
        });
        cy.getElementByTestId('account-mobile-sign-up').click({
            force: true
        });
    }
    cy.getElementByTestId(userTypeObject.dialog_container_button).click({
        force: true
    });

    cy.getElementByTestId('name-email-password-form').within(() => {
        cy.getElementByTestId('sign-up-form-name-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Name (or Alias)');
        });
        cy.getElementByTestId('sign-up-form-name-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.name_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.name_content);
        });
        cy.getElementByTestId('sign-up-form-email-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Email');
        });
        cy.getElementByTestId('sign-up-form-email-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.email_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.email_content+viewport);
        });
        cy.getElementByTestId('sign-up-form-password-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Password');
        });
        cy.getElementByTestId('sign-up-form-password-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.password_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.password_content);
        });
    });
    cy.getElementByTestId('sign-up-form-agreement-statement').should('be.visible');

    cy.getElementByTestId('sign-up-form-privacy-link').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("Privacy Policy");
        expect($element).to.have.attr('href', 'https://inreach.org/privacy/');
        expect($element).to.have.attr('target', '_blank');
        expect($element).to.have.attr('rel', 'noopener noreferrer');
    });
    cy.getElementByTestId('sign-up-form-terms-link').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("Terms of Use");
        expect($element).to.have.attr('href', 'https://inreach.org/terms-of-use/');
        expect($element).to.have.attr('target', '_blank');
        expect($element).to.have.attr('rel', 'noopener noreferrer');
    });
    cy.intercept('/v1/users/**').as('user');
    cy.getElementByTestId('sign-up-form-submit-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Sign Up");
        expect($element).to.have.attr('type', 'submit');
        cy.wrap($element).click({
            force: true
        });
    })
    cy.wait(['@user']);

    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("About You");
    });
    cy.getElementByTestId('dialog-container-subtitle').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("Help us improve your experience by telling us more about yourself");
    });

    //immigration
    cy.getElementByTestId('about-you-immigration-form').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("I am a(n)..");
    });
    cy.getElementByTestId('asylum-seeker').click();
    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
    });
    cy.getElementByTestId('about-you-next-button').click();

    //country of origin - select a radio option
    cy.getElementByTestId('about-you-country-form').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("My country of origin is in..");
    });
    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
    });
    cy.getElementByTestId('about-you-next-button').click();
   
    //identity
    cy.getElementByTestId('about-you-identity-form').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("I identify as..");
    });
    cy.getElementByTestId('asexual').click();
    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
    });
    cy.getElementByTestId('about-you-next-button').click();

    //go back
    cy.getElementByTestId('sign-up-form-back-button').click();

    //select another identity
    cy.getElementByTestId('questioning').click();
    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
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
    cy.getElementByTestId('about-you-ethnicity-form').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("My ethnicity/race is..");
    });
    cy.getElementByTestId('prefer-not-to-say').click();
    cy.get('form').find('[value="other"]').should('be.disabled');
    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
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
    cy.getElementByTestId('about-you-age-form').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("How old are you?");
    });
    cy.getElementByTestId('56-65').click();
    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Submit");
        expect($element).to.have.attr('type', 'submit');
    });
    cy.getElementByTestId('about-you-next-button').click();

    switch (viewport) {
        case Cypress.env('tablet'):
            //thank you modal
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Thank you!");
            });
            //resources button
            cy.getElementByTestId('thank-you-resource-button').should('be.visible');
            //profile button
            cy.getElementByTestId('thank-you-profile-button').should('be.visible').click();
            break;
        default:
            //thank you modal
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Thank you!");
            });
            //resources button
            cy.getElementByTestId('thank-you-resource-button').should('be.visible');
            //profile button
            cy.getElementByTestId('thank-you-profile-button').should('be.visible').click();
            break;
    }

    cy.deleteUsersIfExist();
    cy.logout(viewport);
});

//Create Account - Reviwer
Cypress.Commands.add('testCreateAccountReviewer', (viewport, userType, userTypeObject) => {
    cy.viewport(viewport);
    cy.deleteUsersIfExist();
    if(viewport !== 'iphone-x'){
        cy.getElementByTestId('nav-account-sign-up').click({
            force: true
        });
    }else {
        cy.getElementByTestId('mobile-nav-button-account').click({
            force: true
        });
        cy.getElementByTestId('account-mobile-sign-up').click({
            force: true
        });
    }
    cy.getElementByTestId(userTypeObject.dialog_container_button).click({
        force: true
    });

        cy.getElementByTestId('name-email-password-form').within(() => {
        cy.getElementByTestId('sign-up-form-name-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('First and Last Name');
        });
        cy.getElementByTestId('sign-up-form-name-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.name_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.name_content);
        });
        
        cy.getElementByTestId('sign-up-form-location-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Email');
        });
        cy.getElementByTestId('sign-up-form-location-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.currentLocation_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.currentLocation_content+viewport);
        });

        cy.getElementByTestId('sign-up-form-email-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Email');
        });
        cy.getElementByTestId('sign-up-form-email-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.email_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.email_content+viewport);
        });
        cy.getElementByTestId('sign-up-form-password-label').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Password');
        });
        cy.getElementByTestId('sign-up-form-password-input').children().then($element => {
            expect($element.children()[0]).to.be.visible;
            expect($element.children()[0]).to.have.attr('placeholder', userTypeObject.password_placeholder_content);
            cy.wrap($element.children()[0]).type(userTypeObject.password_content);
        });
    });
});

//------
//Create Account check passwords  
Cypress.Commands.add('testCreateAccountPasswordTests', (viewport, userType, userTypeObject) => {
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').click({
        force: true
    });
    cy.getElementByTestId(userTypeObject.dialog_container_button).click({
        force: true
    });
    //sign up, password must be at least 10 characters with letters, numbers, and special characters
    //create user - seeker
    cy.getElementByTestId('name-email-password-form').within(() => {
        cy.get('input[name="name"]').should('have.attr', 'placeholder', userTypeObject.name_placeholder_content);
        cy.get('input[name="email"]').should('have.attr', 'placeholder', userTypeObject.email_placeholder_content);
        cy.get('input[name="password"]').should('have.attr', 'placeholder', userTypeObject.password_placeholder_content);
        cy.get('input[name="name"]').type(userTypeObject.name_content);
        cy.get('input[name="email"]').type(userTypeObject.email_content);
        cy.get('input[name="password"]').type('no').blur();
        cy.get('[id=password-helper-text]').should('be.visible')
            .should('contain', 'Invalid password - your password must be at least 10 characters long; it must contain 1 uppercase character, 1 number, and 1 special character of the following !@#$%^&?')
    });
});


//Create Account - Lawyer   
Cypress.Commands.add('testCreateAccountLawyer', (viewport, userType, org, userTypeObject) => {
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').click({
        force: true
    });
    cy.getElementByTestId(userTypeObject.dialog_container_button).click({
        force: true
    });
    //create user - lawyer
    cy.getElementByTestId('name-location-form').within(() => {
        cy.get('input[name="name"]').should('have.attr', 'placeholder', userTypeObject.name_placeholder_content);
        cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', userTypeObject.currentLocation_placeholder_content);
        cy.get('input[name="name"]').type(userTypeObject.name_content);
        cy.get('input[name="currentLocation"]').type(userTypeObject.currentLocation_content);
    });

    cy.getElementByTestId('name-location-form').then($element => {
        expect($element).to.be.visible;
        expect($element).to.contain("Where do you practice law? *");
    });

    cy.getElementByTestId('sign-up-form-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element).to.be.disabled;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
    });

    cy.get('[type="radio"]').first().check({
        force: true
    });

    cy.getElementByTestId('sign-up-form-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element).to.not.be.disabled;
        cy.wrap($element).click({
            force: true
        });
    })

    //create user - lawyer
    cy.getElementByTestId('name-email-password-form').within(() => {
        cy.get('input[name="email"]').should('have.attr', 'placeholder', userTypeObject.email_placeholder_content);
        cy.get('input[name="password"]').should('have.attr', 'placeholder', userTypeObject.password_placeholder_content);
        cy.get('input[name="email"]').type(userTypeObject.email_content);
        cy.get('input[name="password"]').type(userTypeObject.password_content);
    });

    cy.intercept('/v1/users/**').as('user');
    cy.getElementByTestId('sign-up-form-submit-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Sign Up");
        expect($element).to.have.attr('type', 'submit');
        cy.wrap($element).click({
            force: true
        });
    })
    cy.wait(['@user']);
    //Account Created
    //State 2
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Connect Your Organization');
    });

    cy.getElementByTestId('dialog-container-subtitle').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Find or add your organization in our App');
    });

    cy.getElementByTestId('sign-up-form-body-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('You may also join your organization later in Account Settings.');
    });


    //organization about you details
    switch (viewport) {
        case Cypress.env('mobile'):
            //valid organization
            cy.getElementByTestId('sign-up-form-find-organization').type(userTypeObject.organization);
            cy.getElementByTestId('sign-up-form-searched-organization').then($elements => {
                cy.wrap($elements[0]).click();
            });

            cy.getElementByTestId('sign-up-form-join-organization-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Request to join organization");
                cy.wrap($element).click();
            });
            //Confirmation
            cy.getElementByTestId('sign-up-form-org-request-rcv').should('contain', "Thank you for requesting to join your organization!");
            cy.getElementByTestId('sign-up-form-org-request-next').should('contain', "Please be on the lookout for an email from the InReach team shortly with next steps.");

            //Click finish
            cy.getElementByTestId('sign-up-form-finish-registration-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Next");
                cy.wrap($element).click({force:true});
            });
            break;
        default:

            //valid organization
            cy.getElementByTestId('sign-up-form-find-organization').type(userTypeObject.organization);
            cy.getElementByTestId('sign-up-form-searched-organization').then($elements => {
                cy.wrap($elements[0]).click();
            });

            cy.getElementByTestId('sign-up-form-join-organization-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Request to join organization");
                cy.wrap($element).click();
            });
            //Confirmation
            cy.getElementByTestId('dialog-container-title').should('contain', 'Connect Your Organization');
            cy.getElementByTestId('sign-up-form-org-request-rcv').should('contain', "Thank you for requesting to join your organization!");
            cy.getElementByTestId('sign-up-form-org-request-next').should('contain', "Please be on the lookout for an email from the InReach team shortly with next steps.");

            //Click finish
            cy.getElementByTestId('sign-up-form-finish-registration-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Next");
            }).click();

            cy.getElementByTestId('dialog-container-subtitle').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Help us improve your experience by telling us more about yourself");
            });
            cy.getElementByTestId('dialog-container-subtitle').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Help us improve your experience by telling us more about yourself");
            });
        cy.getElementByTestId('about-you-organization-form').then($element => {
            expect($element).to.be.visible;
            expect($element).to.contain("Name of your firm or organization");
            expect($element).to.contain("Position title");
            expect($element).to.contain("Your reason for joining");
        });
        break;
    }

    cy.getElementByTestId('about-you-next-button').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.contain("Next");
        expect($element).to.have.attr('type', 'submit');
        cy.wrap($element).click();
    });

    //organization about you details
    switch (viewport) {
        case Cypress.env('tablet'):
            //thank you modal
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Thank you!");
            });
            //resources button
            cy.getElementByTestId('thank-you-resource-button').should('be.visible');
            //profile button
            cy.getElementByTestId('thank-you-profile-button').should('be.visible').click();
            break;
        default:
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Thank you!");
            });
            //resources button
            cy.getElementByTestId('thank-you-resource-button').then($element => {
                expect($element).to.be.visible;
            });
            //profile button
            cy.getElementByTestId('thank-you-profile-button').then($element => {
                expect($element).to.be.visible;
                cy.getElementByTestId('thank-you-profile-button').click();
            });
            break;
    }
    cy.logout(viewport);
});

//Create Account - Provider   
Cypress.Commands.add('testCreateAccountProvider', (viewport, userType,userTypeObject) => {
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').click({force: true});
        cy.getElementByTestId(userTypeObject.dialog_container_button).click({force: true});

            //create user - provider
            cy.getElementByTestId('name-location-form').within(() => {
                cy.get('input[name="name"]').should('have.attr', 'placeholder', userTypeObject.name_placeholder_content);
                cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', userTypeObject.currentLocation_placeholder_content);
                cy.get('input[name="name"]').type(userTypeObject.name_content);
                cy.get('input[name="currentLocation"]').type(userTypeObject.currentLocation_content);
            });

            cy.getElementByTestId('name-location-form').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Where do you work or volunteer? *");
            });

            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.be.disabled;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type', 'submit');
            });

            cy.get('[type="radio"]').first().check({
                force: true
            });
            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.not.be.disabled;
            }).click({
                force: true
            });

            cy.getElementByTestId('sign-up-form-back-button').click({
                force: true
            });
            cy.getElementByTestId('other').click();
            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.be.disabled;
            });
            cy.get('[name="specifiedOrgType"]').focus().type('an organization').blur();
            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.not.be.disabled;
            }).click({
                force: true
            });

            //create user - provider
            cy.getElementByTestId('name-email-password-form').within(() => {
                cy.get('input[name="email"]').should('have.attr', 'placeholder', userTypeObject.email_placeholder_content);
                cy.get('input[name="password"]').should('have.attr', 'placeholder', userTypeObject.password_placeholder_content);
                cy.get('input[name="email"]').type(userTypeObject.email_content);
                cy.get('input[name="password"]').type(userTypeObject.password_content);
            });


            //user is created, need to wait until POST  
            //completes before accessing the organization search dialog
            cy.intercept('/v1/users/*').as('user');

            cy.getElementByTestId('sign-up-form-submit-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Sign Up");
                expect($element).to.have.attr('type', 'submit');
                expect($element).to.not.be.disabled;
            }).click({
                force: true
            });
            cy.wait(['@user']);
            //Account Created
            //State 2
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Connect Your Organization');
            });

            cy.getElementByTestId('dialog-container-subtitle').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Find or add your organization in our App');
            });

            cy.getElementByTestId('sign-up-form-body-text').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('You may also join your organization later in Account Settings.');
            });

            //valid organization
            cy.getElementByTestId('sign-up-form-find-organization').type(userTypeObject.organization);
            cy.getElementByTestId('sign-up-form-searched-organization').then($elements => {
                cy.wrap($elements[0]).click();
            });

            cy.getElementByTestId('sign-up-form-join-organization-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Request to join organization");
                cy.wrap($element).click();
            });

            //Confirmation
            cy.getElementByTestId('dialog-container-title').should('contain', 'Connect Your Organization');
            cy.getElementByTestId('sign-up-form-org-request-rcv').should('contain', "Thank you for requesting to join your organization!");
            cy.getElementByTestId('sign-up-form-org-request-next').should('contain', "Please be on the lookout for an email from the InReach team shortly with next steps.");

            //Click finish
            cy.getElementByTestId('sign-up-form-finish-registration-button').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Next");
            });
            cy.getElementByTestId('sign-up-form-finish-registration-button').click();


            //organization about you details
            switch(viewport){
                case Cypress.env('mobile'):
                    //Do Nothing
                break;
                default:
                cy.getElementByTestId('dialog-container-title').then($element => {
                    expect($element).to.be.visible;
                    expect($element).to.contain("About You");
                });
                break;
            };
            cy.getElementByTestId('dialog-container-subtitle').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Help us improve your experience by telling us more about yourself");
            });
            cy.getElementByTestId('about-you-organization-form').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Name of your firm or organization");
                expect($element).to.contain("Position title");
                expect($element).to.contain("Your reason for joining");

            });
            cy.getElementByTestId('about-you-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type', 'submit');
            });
            cy.getElementByTestId('about-you-next-button').click();

            switch(viewport){
                case Cypress.env('mobile'):
                    //thank you modal
                cy.getElementByTestId('dialog-container-title').then($element => {
                    expect($element).to.be.visible;
                    expect($element).to.contain("Thank you!");
                });
                //resources button
                cy.getElementByTestId('thank-you-resource-button').then($element => {
                    expect($element).to.be.visible;
                });
                //profile button
                cy.getElementByTestId('thank-you-profile-button').then($element => {
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('thank-you-profile-button').click();
                break;
                case Cypress.env('tablet'):
                    //thank you modal
                    cy.getElementByTestId('dialog-container-title').then($element => {
                        expect($element).to.be.visible;
                        expect($element).contain("Thank you!");
                    });
                    //resources button
                    cy.getElementByTestId('thank-you-resource-button').should('be.visible');
                    //profile button
                    cy.getElementByTestId('thank-you-profile-button').should('be.visible').click();
                    break;
                default:
                     //thank you modal
                    cy.getElementByTestId('dialog-container-title').then($element => {
                        expect($element).to.be.visible;
                        expect($element).contain("Thank you!");
                    });
                    //resources button
                    cy.getElementByTestId('thank-you-resource-button').should('be.visible');
                    //profile button
                    cy.getElementByTestId('thank-you-profile-button').should('be.visible').click();
                break;
            }
            cy.logout(viewport);
    });



//Create Account Action as Provider then skip organization  
Cypress.Commands.add('testCreateAccountActionSkipOrganization', (viewport, userType, userTypeObject) => {
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').click({
            force: true
        });
        cy.getElementByTestId(userTypeObject.dialog_container_button).click({
                force: true
            });

            //create user - provider
            cy.getElementByTestId('name-location-form').within(() => {
                cy.get('input[name="name"]').should('have.attr', 'placeholder', userTypeObject.name_placeholder_content);
                cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', userTypeObject.currentLocation_placeholder_content);
                cy.get('input[name="name"]').type(userTypeObject.name_content);
                cy.get('input[name="currentLocation"]').type(userTypeObject.currentLocation_content);
            });

            cy.getElementByTestId('name-location-form').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Where do you work or volunteer? *");
            });
            cy.getElementByTestId('healthcare-provider').click({
                force: true
            });
            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type', 'submit');
            });
            cy.getElementByTestId('sign-up-form-next-button').click({
                force: true
            });

            //create user - provider
            cy.getElementByTestId('name-email-password-form').within(() => {
                cy.get('input[name="email"]').should('have.attr', 'placeholder', userTypeObject.email_placeholder_content);
                cy.get('input[name="password"]').should('have.attr', 'placeholder', userTypeObject.password_placeholder_content);
                cy.get('input[name="email"]').type(userTypeObject.email_content);
                cy.get('input[name="password"]').type(userTypeObject.password_content);
            });

            cy.getElementByTestId('sign-up-form-submit-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Sign Up");
                expect($element).to.have.attr('type', 'submit');
            });
            //user is created, need to wait until POST  
            //completes before accessing the organization search dialog
            cy.intercept('/v1/users/*').as('user');

            cy.getElementByTestId('sign-up-form-submit-button').click({
                force: true
            });
            cy.wait(['@user']);
            //Account Created
            //State 2
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Connect Your Organization');
            });

            cy.getElementByTestId('dialog-container-subtitle').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Do you volunteer or work at an organization able to serve LGBTQ+ asylum seekers? Find or add your organization in our App.');
            });

            cy.getElementByTestId('sign-up-form-body-text').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('You may also join your organization later in Account Settings.');
            });

            //click skip - Don't join an organization
            cy.getElementByTestId('sign-up-form-skip-text').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('skip');
            });
            cy.getElementByTestId('sign-up-form-skip-text').click();


            //goes to organization about you details
            switch(viewport){
                case Cypress.env('mobile'):
                    //do nothing
                break;
                default:
                    cy.getElementByTestId('dialog-container-title').then($element => {
                        expect($element).to.be.visible;
                        expect($element).to.contain("About You");
                    });
                break;
            };
            cy.getElementByTestId('dialog-container-subtitle').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Help us improve your experience by telling us more about yourself");
            });
            cy.getElementByTestId('about-you-next-button').click();

            //goes to thank you
            switch(viewport){
                case Cypress.env('mobile'):
                    //Do nothing
                break;
                default:
                //thank you modal
                cy.getElementByTestId('dialog-container-title').then($element => {
                    expect($element).to.be.visible;
                    expect($element).to.contain("Thank you!");
                });
                //resources button
                cy.getElementByTestId('thank-you-resource-button').then($element => {
                    expect($element).to.be.visible;
                });
                //profile button
                cy.getElementByTestId('thank-you-profile-button').then($element => {
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('thank-you-resource-button').click();
                break;
            }
           cy.logout(viewport);
    });


//Create Account Actions as Lawyer skip organization, then click thank you resource  button
Cypress.Commands.add('testCreateAccountActionSkipOrganizationResource', (viewport, userType,userTypeObject) => {
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').click({force:true});
    cy.getElementByTestId(userTypeObject.dialog_container_button).click({force:true});

            //sign up as lawyer
            cy.getElementByTestId('name-location-form').within(() => {
                cy.get('input[name="name"]').should('have.attr', 'placeholder', userTypeObject.name_placeholder_content);
                cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', userTypeObject.currentLocation_placeholder_content);
                cy.get('input[name="name"]').type(userTypeObject.name_content);
                cy.get('input[name="currentLocation"]').type(userTypeObject.currentLocation_content);
            });

            cy.getElementByTestId('name-location-form').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Where do you practice law? *");
            });
            cy.getElementByTestId('corporate-law').click({
                force: true
            });
            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type', 'submit');
            });
            cy.getElementByTestId('sign-up-form-next-button').click({
                force: true
            });

            //create user - lawyer
            cy.getElementByTestId('name-email-password-form').within(() => {
                cy.get('input[name="email"]').should('have.attr', 'placeholder', userTypeObject.email_placeholder_content);
                cy.get('input[name="password"]').should('have.attr', 'placeholder', userTypeObject.password_placeholder_content);
                cy.get('input[name="email"]').type(userTypeObject.email_content);
                cy.get('input[name="password"]').type(userTypeObject.password_content);
            });

            cy.getElementByTestId('sign-up-form-submit-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Sign Up");
                expect($element).to.have.attr('type', 'submit');
            });
            //user is created, need to wait until POST  
            //completes before accessing the organization search dialog
            cy.intercept('/v1/users/*').as('user');
            cy.getElementByTestId('sign-up-form-submit-button').click({
                force: true
            });
            cy.wait(['@user']);
            //Account Created
            //State 2
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Connect Your Organization');
            });

            //click skip - don't' join org
            cy.getElementByTestId('sign-up-form-skip-text').then($element => {
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
            switch(viewport){
                case Cypress.env('mobile'):
                    cy.getElementByTestId('thank-you-profile-button').click();
                    cy.getElementByTestId('mobile-nav-button-account').click()
                    cy.getElementByTestId('account-page-logout').click();
                break;
                case Cypress.env('tablet'):
                    //thank you modal
                cy.getElementByTestId('dialog-container-title').then($element => {
                    expect($element).to.be.visible;
                    expect($element).to.contain("Thank you!");
                });
                //resources button
                cy.getElementByTestId('thank-you-resource-button');
                cy.getElementByTestId('thank-you-resource-button').click();
                cy.getElementByTestId('thank-you-header').should('not.exist');
                cy.getElementByTestId('search-form-body', {
                    timeout: 10000
                }).should('exist');
                cy.getElementByTestId('nav-button-account').click()
                cy.getElementByTestId('nav-account-sign-out').click({
                    force: true
                });
                break;
                default:
                    //thank you modal
                cy.getElementByTestId('dialog-container-title').then($element => {
                    expect($element).to.be.visible;
                    expect($element).to.contain("Thank you!");
                });
                //resources button
                cy.getElementByTestId('thank-you-resource-button');
                cy.getElementByTestId('thank-you-resource-button').click();
                cy.getElementByTestId('thank-you-header').should('not.exist');
                cy.getElementByTestId('search-form-body', {
                    timeout: 10000
                }).should('exist');
                cy.getElementByTestId('nav-account-sign-out').click({
                    force: true
                });
                break;
            }
          
        });

//Create Account Actions as Lawyer skip organization, then click thank you my profile  button
Cypress.Commands.add('testCreateAccountActionSkipOrganizationProfile', (viewport, userType,userTypeObject) => {
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').click({
            force: true
        });
        cy.getElementByTestId(userTypeObject.dialog_container_button).click({
                force: true
            });

            //sign up as lawyer
            cy.getElementByTestId('name-location-form').within(() => {
                cy.get('input[name="name"]').should('have.attr', 'placeholder', userTypeObject.name_placeholder_content);
                cy.get('input[name="currentLocation"]').should('have.attr', 'placeholder', userTypeObject.currentLocation_placeholder_content);
                cy.get('input[name="name"]').type(userTypeObject.name_content);
                cy.get('input[name="currentLocation"]').type(userTypeObject.currentLocation_content);
            });

            cy.getElementByTestId('name-location-form').then($element => {
                expect($element).to.be.visible;
                expect($element).to.contain("Where do you practice law? *");
            });
            cy.getElementByTestId('corporate-law').click({
                force: true
            });
            cy.getElementByTestId('sign-up-form-next-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Next");
                expect($element).to.have.attr('type', 'submit');
            });
            cy.getElementByTestId('sign-up-form-next-button').click({
                force: true
            });

            //create user - lawyer
            cy.getElementByTestId('name-email-password-form').within(() => {
                cy.get('input[name="email"]').should('have.attr', 'placeholder', userTypeObject.email_placeholder_content);
                cy.get('input[name="password"]').should('have.attr', 'placeholder', userTypeObject.password_placeholder_content);
                cy.get('input[name="email"]').type(userTypeObject.email_content);
                cy.get('input[name="password"]').type(userTypeObject.password_content);
            });

            cy.getElementByTestId('sign-up-form-submit-button').then($element => {
                expect($element).to.be.visible;
                expect($element.children()).to.contain("Sign Up");
                expect($element).to.have.attr('type', 'submit');
            });

             //user is created, need to wait until POST  
            //completes before accessing the organization search dialog
            cy.intercept('/v1/users/*').as('user');

            cy.getElementByTestId('sign-up-form-submit-button').click({
                force: true
            });

            cy.wait(['@user']);
            //Account Created
            //State 2
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain('Connect Your Organization');
            });

            //click skip - don't' join org
            cy.getElementByTestId('sign-up-form-skip-text').then($element => {
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

            switch(viewport){
                case Cypress.env('mobile'):
                    cy.getElementByTestId('thank-you-profile-button').click();
                break;
                default:
                    cy.getElementByTestId('dialog-container-title').then($element => {
                        expect($element).to.be.visible;
                        expect($element).to.contain("Thank you!");
                    });
                    //resources button
                    cy.getElementByTestId('thank-you-profile-button');
                    cy.getElementByTestId('thank-you-profile-button').click();
                    cy.getElementByTestId('thank-you-header').should('not.exist');
                break;
            }

        cy.logout(viewport);
    });