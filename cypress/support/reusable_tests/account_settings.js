Cypress.Commands.add('testAccountSettingsElements',(viewport,user)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
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

Cypress.Commands.add('testChangeUserEmail',(viewport,user,user_update)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    viewport === Cypress.env('mobile') ? cy.getElementByTestId('mobile-nav-button-account').click() : cy.getElementByTestId('nav-account-account-settings').click();
    
    cy.getElementByTestId('account-page-email').click();

    //cy.getElementByTestId('account-settings-email-old-address').type(user.email);
    cy.getElementByTestId('account-settings-email-new-address').type(user_update.email);
    cy.getElementByTestId('account-settings-email-new-address-confirm').type(user_update.email);
    cy.getElementByTestId('account-settings-email-button').click();
    //Close dropdown
    cy.getElementByTestId('account-page-email').click();
    //logout 
    cy.getElementByTestId('account-page-logout').click();
    cy.wait(1000);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('snackbar-close-button').click()
        cy.getElementByTestId('mobile-nav-button-account').click();
    } 
    //Log back in with new creds
    cy.login({
        email:user_update.email,
        password:user.password
    },viewport);
    //Verify Login
    cy.wait(1000);

    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('account-page-header').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Your Account"); 
        });
    }else{
        cy.getElementByTestId('nav-account-account-settings').then($element => {
            expect($element).to.be.visible;
            expect($element).to.have.attr('href', '/en_US/account');
            expect($element.children()).contain("Account Settings");
        });
    }
});


Cypress.Commands.add('testChangeUserPassword',(viewport,user,user_update)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    viewport === Cypress.env('mobile') ? cy.getElementByTestId('mobile-nav-button-account').click() : cy.getElementByTestId('nav-account-account-settings').click();
    
    cy.getElementByTestId('account-page-change-password').click();
    cy.getElementByTestId('account-settings-password-old-password').type(user.password);
    cy.getElementByTestId('account-settings-password-new-password').type(user_update.password);
    cy.getElementByTestId('account-settings-password-new-password-confirm').type(user_update.password);
    cy.getElementByTestId('account-settings-password-button').click();
    //Close dropdown
    cy.getElementByTestId('account-page-change-password').click();
    //logout 
    cy.getElementByTestId('account-page-logout').click();
    //Logback in with new creds
    cy.wait(1000);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('snackbar-close-button').click()
    } 
    cy.login({
        email:user.email,
        password:user_update.password
    },viewport);
    cy.wait(1000);
    //Verify Login
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('account-page-header').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Your Account"); 
        });
    }else{
        cy.getElementByTestId('nav-account-account-settings').then($element => {
            expect($element).to.be.visible;
            expect($element).to.have.attr('href', '/en_US/account');
            expect($element.children()).contain("Account Settings");
        });
    }
});

Cypress.Commands.add('testDeleteAccount',(viewport,user)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    viewport === Cypress.env('mobile') ? cy.getElementByTestId('mobile-nav-button-account').click() : cy.getElementByTestId('nav-account-account-settings').click();
    //AUTOMATION BUG - Delete Account button does noting on Mobile
    if(viewport !== Cypress.env('mobile')){
        cy.getElementByTestId('account-page-delete-account').click();
        cy.getElementByTestId('delete-account-password').type(user.password);
        cy.getElementByTestId('delete-account-delete-button').click();
    }
    
});