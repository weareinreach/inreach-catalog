Cypress.Commands.add('testLogInAndLogOutAction', (viewport,user) => {
    cy.viewport(viewport);

    //Sign in Button
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-account').then($element =>{
            cy.wrap($element).click();
        });
        
    }else{
        cy.getElementByTestId('nav-account-sign-in').then($element => {
            cy.wrap($element).click({force:true});
        });
    }
    //Enter Creds
    cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
    cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
    cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
   
   cy.wait(1000);
    //Logeed In
    switch(viewport){
        case Cypress.env('mobile'):
            cy.getElementByTestId('account-page-header').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Your Account"); 
            });
            cy.getElementByTestId('account-page-tabs').should('be.visible');
            cy.getElementByTestId('account-page-tab-your-account').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Your Account");
            });
            cy.getElementByTestId('account-page-email').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Update email address");
            });
            cy.getElementByTestId('account-page-change-password').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Update password");
            });
            cy.getElementByTestId('account-page-delete-account').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Delete Account");
            });
            break;
        case Cypress.env('tablet'):
            cy.getElementByTestId('drop-down-selector-item').then($element=>{
                expect($element[2]).contain('Account');
				cy.wrap($element[2]).click();
                cy.getElementByTestId('nav-button-view-favorites').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('View Your Favorites');
                });
                cy.getElementByTestId('nav-account-account-settings').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Account Settings');
                });
                cy.getElementByTestId('nav-account-sign-out').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Sign Out');
                });

            });
            break;
        default:
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
            break;
    }

    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('account-page-logout').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Sign Out");
            cy.wrap($element).click();
        });
    }else{
        cy.getElementByTestId('nav-account-sign-out').click();
        cy.getElementByTestId('nav-account-sign-in').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("Sign In");
        });
        cy.getElementByTestId('nav-account-sign-up').then($element => {
            expect($element).to.be.visible;
            expect($element.children()).contain("Sign Up");
        });
    }
});

Cypress.Commands.add('testLoginFormComponents', (viewport) => {
    cy.viewport(viewport);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-account').then($element =>{
            expect($element).to.be.visible;
            //click
            cy.wrap($element).click();
        });
    }else{
        cy.getElementByTestId('nav-account-sign-in').then($element => {
            expect($element).to.be.visible;
            //click
            cy.wrap($element).click({force:true});
            cy.getElementByTestId('log-in-dialog-container').should('be.visible');
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).contain("Sign In");
                expect($element).to.be.visible;
            });
        });
    }
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
        expect($element).to.have.attr('href', 'https://inreach.org/privacy/');
        expect($element).contain("Privacy Policy");
        expect($element).to.have.attr('target', '_blank');
        expect($element).to.have.attr('rel', 'noopener noreferrer');
    });
    cy.getElementByTestId('log-in-dialog-container-terms-of-use').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('href', 'https://inreach.org/terms-of-use/');
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
