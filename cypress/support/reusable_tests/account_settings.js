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
        //AUTOMATION BUG Mobile delete account does nothing(152)
        if(viewport !== Cypress.env('mobile')){
        cy.wrap($element).click().then(()=>{
            cy.getElementByTestId('dialog-container-title').then($element=>{
                expect($element).contain('Delete Account');
            });
            cy.getElementByTestId('delete-account-body-1').then($element=>{
                expect($element).contain('Are you sure you want to delete your account? Your account will be deleted permanently and any stored information will be erased.');
            });
            cy.getElementByTestId('delete-account-body-2').then($element=>{
                expect($element).contain('Please re-enter your password.');
            });
            cy.getElementByTestId('delete-account-password').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('delete-account-delete-button').then($element=>{
                expect($element).contain('Delete Account');
            });
            cy.getElementByTestId('delete-account-cancel-button').then($element=>{
                expect($element).contain('Cancel');
            });
        });
        cy.getElementByTestId('dialog-close-button').click();
    }
         
    });
});

Cypress.Commands.add('testChangeUserName',(viewport,user,user_update)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    viewport === Cypress.env('mobile') ? cy.getElementByTestId('mobile-nav-button-account').click() : cy.getElementByTestId('nav-account-account-settings').click();
    
    cy.getElementByTestId('account-page-name').click();
    cy.get('input[name="currentName"]').should('have.value', user.name);
    cy.getElementByTestId('account-settings-name-new').type(user_update.name);
    cy.getElementByTestId('account-settings-name-new-confirm').type(user_update.name);
    cy.getElementByTestId('account-settings-name-button').click();

    //make sure UI is updated (new name appears and form is cleared)
    cy.get('input[name="currentName"]').should('have.value', user_update.name);
    cy.get('input[name="newName"]').should('have.value', '');
    cy.get('input[name="confirmedName"]').should('have.value', '');

    //Close dropdown
    cy.getElementByTestId('account-page-name').click();
    //logout 
    cy.getElementByTestId('account-page-logout').click();
    cy.wait(1000);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('snackbar-close-button').click()
        cy.getElementByTestId('mobile-nav-button-account').click();
    } 
    //Log back in to verify name change
    cy.viewport(viewport);
    cy.login(user,viewport);
    //Verify Login
    cy.wait(1000);

    viewport === Cypress.env('mobile') ? cy.getElementByTestId('mobile-nav-button-account').click() : cy.getElementByTestId('nav-account-account-settings').click();
    cy.getElementByTestId('account-page-name').click();
    cy.get('input[name="currentName"]').should('have.value', user_update.name);

    //check for empty values - error should appear
    cy.get('input[name="currentName"]').clear();
    cy.getElementByTestId('account-settings-name-button').click();
    cy.get('input:invalid').should('have.length', 3)
    cy.get('input[name="currentName"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })

    //new name and confirmed name should match
    cy.getElementByTestId('account-settings-name-old').type(user.name);
    cy.getElementByTestId('account-settings-name-new').type(user_update.name);
    cy.getElementByTestId('account-settings-name-new-confirm').type('xx');
    cy.getElementByTestId('account-settings-name-button').click();

    //look for error message
    cy.getElementByTestId('snackbar-message').should('be.visible').then($element=>{
        expect($element).contain("The new name values you have entered do not match.");
    });
    
    //check default values
    cy.get('input[name="currentName"]').clear()
        .should('have.attr', 'placeholder', 'John Smith')
        .should('be.visible');
    
    cy.get('input[name="newName"]').clear()
        .should('have.attr', 'placeholder', 'New name')
        .should('be.visible');

    cy.get('input[name="confirmedName"]').clear()
        .should('have.attr', 'placeholder', 'Confirm new name')
        .should('be.visible');

    cy.getElementByTestId('account-page-logout').click();
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
    //AUTOMATION BUG - Delete Account button does noting on Mobile(152)
    if(viewport !== Cypress.env('mobile')){
        cy.getElementByTestId('account-page-delete-account').click();
        cy.getElementByTestId('delete-account-password').type(user.password);
        cy.getElementByTestId('delete-account-delete-button').click();
    }
    
});