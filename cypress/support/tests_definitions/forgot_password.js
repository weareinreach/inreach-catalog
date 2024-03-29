Cypress.Commands.add('testForgotPasswordElements', (viewport) => {
    cy.viewport(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').click();
            break;
        default:
            cy.getElementByTestId('nav-account-sign-in').click({
                force: true
            });
            break;
    }
    cy.getElementByTestId('log-in-dialog-container-forgot-password').click();

    switch (viewport) {
        case Cypress.env('mobile'):
            //do Nothing
            break;
        default:
            cy.getElementByTestId('dialog-container-title').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Reset Your Password");
            });
            break;
    }

    cy.getElementByTestId('forgot-password-body').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Enter your email address and we will send you an email to reset your password.");
    });
    cy.getElementByTestId('forgot-password-email').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain('Email');
    });
    cy.getElementByTestId('forgot-password-send-button').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('type', 'submit');
    });
    cy.getElementByTestId('forgot-password-back-button').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Back');
        cy.wrap($element).click();
    });
});

Cypress.Commands.add('testForgotPasswordActionGoodEmail', (viewport, email) => {
    cy.viewport(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').click();
            break;
        default:
            cy.getElementByTestId('nav-account-sign-in').click({
                force: true
            });
            break;
    }

    cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element => {
        cy.wrap($element).click();
        cy.getElementByTestId('forgot-password-email').type(email);
        cy.getElementByTestId('forgot-password-send-button').click();

        //look for success message
        cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
            expect($element).to.be.visible;
            expect($element).contain("Your password has been reset successfully! Please check your email.");
            cy.getElementByTestId('snackbar-close-button').should('be.visible');
            cy.getElementByTestId('snackbar-close-button').click();
            cy.getElementByTestId('snackbar-message').should('not.exist');
        });
    });
});

Cypress.Commands.add('testForgotPasswordActionBadEmail', (viewport, email) => {
    cy.viewport(viewport);
    //Sign in Button
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').click();
            break;
        default:
            cy.getElementByTestId('nav-account-sign-in').click({
                force: true
            });
            break;
    }
    cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element => {
        cy.wrap($element).click();
        cy.getElementByTestId('forgot-password-email').type(email);
        cy.getElementByTestId('forgot-password-send-button').click();

        //look for error message
        cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
            expect($element).to.be.visible;
            expect($element).contain("Oops! Please check that you entered the correct email address.");
            cy.getElementByTestId('snackbar-close-button').should('be.visible');
            cy.getElementByTestId('snackbar-close-button').click();
            cy.getElementByTestId('snackbar-message').should('not.exist');
        });
    });
});

Cypress.Commands.add('testBadRequestError', (viewport, email) => {
    cy.viewport(viewport);
     switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-account').click();
            break;
        default:
            cy.getElementByTestId('nav-account-sign-in').click({
                force: true
            });
            break;
    }
    cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element => {
        cy.wrap($element).click();
        cy.getElementByTestId('forgot-password-email').type(email);

        //intercept and force 400 error
        cy.intercept('POST', '/v1/users/forgotPassword', {
            statusCode: 400
        }).as('forgotPassword');
        cy.getElementByTestId('forgot-password-send-button').then($element => {
            expect($element).to.be.visible;
            expect($element).contain('Send');
            cy.wrap($element).click().then(() => {
                cy.wait('@forgotPassword');
                cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
                    expect($element).to.be.visible;
                    expect($element.children()).contain("Oops! Please check that you entered the correct email address.");
                    cy.getElementByTestId('snackbar-close-button').should('be.visible');
                    cy.getElementByTestId('snackbar-close-button').click();
                    cy.getElementByTestId('snackbar-message').should('not.exist');
                });
            });
        });
    });
});