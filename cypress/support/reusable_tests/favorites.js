Cypress.Commands.add('testFavoritesComponentsNotLoggedIn',(viewport)=>{
    cy.viewport(viewport);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-favorites').click();
        cy.getElementByTestId('favorites-page-header-text').then($element =>{
            expect($element).to.be.visible;
            expect($element).contain("Once logged in, you’ll be able to quickly find the organizations and resources you have favorited.");
        });
        cy.getElementByTestId('favorites-page-login-button').then($element =>{
            expect($element).to.be.visible;
            expect($element).contain("Log In");
        });
        cy.getElementByTestId('favorites-page-signup-button').then($element =>{
            expect($element).to.be.visible;
            expect($element).contain("Sign Up");
        });
    }else{
        //Switch to mobile -- hack as Desktop and tablet do not have favorites button if not logged int
        cy.viewport(Cypress.env('mobile'));
        //click favorites in Mobile
        cy.getElementByTestId('mobile-nav-button-favorites').click();
        //revert back to viewport
        cy.viewport(viewport);
        cy.wait(2000);
        cy.getElementByTestId('favorites-page-header-text').then($element =>{
            expect($element).to.be.visible;
            expect($element).contain("You must be logged in to use favorites.");
        });
    }
});

Cypress.Commands.add('testFavoritesComponents',(viewport,user)=>{
    cy.viewport(viewport);
    cy.login(user);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-favorites').click();
    }else{
        cy.getElementByTestId('nav-button-view-favorites').click();
    }
    //No favorites list
    cy.getElementByTestId('favorites-page-title-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Favorites");
    });
    cy.getElementByTestId('favorites-page-header-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Your favorites lists are only visible to you and anyone you choose to share your lists with.");
    });
    cy.getElementByTestId('favorites-page-body-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("You haven't created any lists yet.");
    });
});