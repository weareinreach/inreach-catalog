// Re-usable Tests are written here. Some take a viewport as a parameter and execute
//---------------- Login -------------------------------
Cypress.Commands.add('testLoginFromComponents', () => {
    cy.getElementByTestId('log-in-dialog-container-login-form').should('be.visible');
    cy.getElementByTestId('log-in-dialog-container-email-input').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain("Email");
    });
    cy.getElementByTestId('log-in-dialog-container-password-input').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain("Password");
    });
    cy.getElementByTestId('log-in-dialog-container-privacy').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('href', 'https://asylumconnect.org/privacy');
        expect($element).contain("Privacy Policy");
        expect($element).to.have.attr('target', '_blank');
        expect($element).to.have.attr('rel', 'noopener noreferrer');
    });
    cy.getElementByTestId('log-in-dialog-container-terms-of-use').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('href', 'https://asylumconnect.org/terms-of-use');
        expect($element).contain("Terms of Use");
        expect($element).to.have.attr('target', '_blank');
        expect($element).to.have.attr('rel', 'noopener noreferrer');
    });
    cy.getElementByTestId('log-in-dialog-container-sign-in-button').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('type', 'submit');
        expect($element.children()).contain("Sign In");
    });
    cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Forgot Password?");
    });
    cy.getElementByTestId('log-in-dialog-container-no-acount').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain("Don't have an account?");
    });
});

Cypress.Commands.add('logInAndLogOutAction', (user) => {
    cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
    cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
    cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
    //Logeed In
    cy.getElementByTestId('nav-account-account-settings').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('href', '/en_US/account');
        expect($element.children()).contain("Account Settings");
    });
    cy.getElementByTestId('nav-account-sign-out').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('href', '/');
        expect($element.children()).contain("Sign Out");
    });
});

// ---------------------- Create Account ---------------------------
Cypress.Commands.add('testCreateAccountElements', (viewport) => {
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
        cy.getElementByTestId('dialog-container-sign-up-attorney').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("I am an attorney or law student");
            expect($element).to.have.attr('type', 'submit');
        });
        cy.getElementByTestId('dialog-container-sign-up-non-legal-service-provider').then($element => {
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

Cypress.Commands.add('testCreateAccountForMyselfElements',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        cy.wrap($element).click({force: true});
    cy.getElementByTestId('dialog-container-sign-up-help-myself-button').then($element=>{
        cy.wrap($element).click({force: true});
        cy.getElementByTestId('sign-up-form-email-input').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Email");

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

Cypress.Commands.add('testCreateAccountForLawyerElements',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        cy.wrap($element).click({force: true});
    cy.getElementByTestId('dialog-container-sign-up-attorney').then($element=>{
        cy.wrap($element).click({force: true});
        cy.getElementByTestId('sign-up-form-email-input').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Firm, Organization or School Email");

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

Cypress.Commands.add('testCreateAccountForNonLegalServiceProviderElements',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('nav-account-sign-up').then($element => {
        cy.wrap($element).click({force: true});
    cy.getElementByTestId('dialog-container-sign-up-non-legal-service-provider').then($element=>{
        cy.wrap($element).click({force: true});
        cy.getElementByTestId('sign-up-form-email-input').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Firm, Organization or School Email");

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
//dialog-container-sign-up-non-legal-service-provider