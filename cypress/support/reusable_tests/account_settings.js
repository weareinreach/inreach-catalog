Cypress.Commands.add('testAccountSettingsElements',(viewport,user)=>{
    cy.viewport(viewport);
    cy.login(user);
    viewport === Cypress.env('mobile') ? cy.getElementByTestId('mobile-nav-button-account').click() : cy.getElementByTestId('nav-account-account-settings').click();
    cy.getElementByTestId('account-page-tabs').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('account-page-email').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Change Email Address');
        cy.wrap($element).click().then(()=>{
            cy.getElementByTestId('account-settings-email-old-address').then($element=>{
                expect($element.children()).contain('Enter Old Email Address:');
            });
            cy.getElementByTestId('account-settings-email-new-address').then($element=>{
                expect($element.children()).contain('Enter New Email Address:');
            });
            cy.getElementByTestId('account-settings-email-new-address-confirm').then($element=>{
                expect($element.children()).contain('Confirm New Email Address:');
            });
            cy.getElementByTestId('account-settings-email-button').then($element=>{
                expect($element).contain('Change Email Address');
            });
        });
        //Close the element
        cy.wrap($element).click();
    });
    cy.getElementByTestId('account-page-change-password').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Change Password');
        cy.wrap($element).click().then(()=>{
            cy.getElementByTestId('account-settings-password-old-password').then($element=>{
                expect($element.children()).contain('Enter Old Password:');
            });
            cy.getElementByTestId('account-settings-password-new-password').then($element=>{
                expect($element.children()).contain('Enter New Password:');
            });
            cy.getElementByTestId('account-settings-password-new-password-confirm').then($element=>{
                expect($element.children()).contain('Confirm New Password:');
            });
            cy.getElementByTestId('account-settings-password-button').then($element=>{
                expect($element).contain('Change Password');
            });
        });
         //Close the element
         cy.wrap($element).click();
    });
    cy.getElementByTestId('account-page-logout').then($element=>{
        expect($element).contain('Logout');
    });
    cy.getElementByTestId('account-page-delete-account').then($element=>{
        expect($element).contain('Delete Account');
        //AUTOMATION BUG Mobile delete account does nothing
        if(viewport !== Cypress.env('mobile')){
        cy.wrap($element).click().then(()=>{
            cy.getElementByTestId('dialog-container-title').then($element=>{
                expect($element).contain('Delete Account');
            });
            cy.getElementByTestId('delete-account-body-1').then($element=>{
                expect($element).contain('Are you sure you want to delete your account? Your account will be delete permanently, and any stored information will be erased.');
            });
            cy.getElementByTestId('delete-account-body-2').then($element=>{
                expect($element).contain('Deleting your account requires your password.');
            });
            cy.getElementByTestId('delete-account-password').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('delete-account-delete-button').then($element=>{
                expect($element).contain('delete account');
            });
            cy.getElementByTestId('delete-account-cancel-button').then($element=>{
                expect($element).contain('cancel');
            });
        });
        cy.getElementByTestId('dialog-close-button').click();
    }
         
    });
});