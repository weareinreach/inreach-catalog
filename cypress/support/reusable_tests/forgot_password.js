Cypress.Commands.add('testForgotPasswordElements',(viewport)=>{
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
cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element=>{
    cy.wrap($element).click();
if(viewport !== Cypress.env('mobile')){
    cy.getElementByTestId('dialog-container-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Reset Password");
    });
}
    cy.getElementByTestId('forgot-password-body').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("We'll send you an email to reset your password.");
    });
    cy.getElementByTestId('forgot-password-email').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Email');
    });
    cy.getElementByTestId('forgot-password-send-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','submit');
    });
    cy.getElementByTestId('forgot-password-back-button').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Back');
        cy.wrap($element).click();
    });
});

});


Cypress.Commands.add('testForgotPasswordAction',(viewport,email)=>{
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
cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element=>{
    cy.wrap($element).click();
    cy.getElementByTestId('forgot-password-email').type(email);
    cy.getElementByTestId('forgot-password-send-button').click();

});
});