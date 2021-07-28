Cypress.Commands.add('testStaticResource',(viewport)=>{
    cy.viewport(viewport);

cy.getElementByTestId('language-selector-container').then($element=>{
    cy.wrap($element[2]).click();
    cy.getElementByTestId('list-item').then($element=>{
            expect($element[3]).to.be.visible;
            expect($element[3]).contain("Other / Travel Support");
            cy.wrap($element[3]).click();
            cy.getElementByTestId('search-page-next-button').click();
        });
    //Test Static Page
    if(viewport !== Cypress.env('mobile')){
    cy.getElementByTestId('subannouncement-link').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.be.attr('href','https://asylumconnect.org/mobile-app/');
        });
    }
    });
    cy.getElementByTestId('static-page-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Information for LGBTQ+ People Who Are Still In Their Home Country Or A Transit Country ');
    });
    cy.getElementByTestId('static-page-body-1').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Are you looking for help in your home country or a transit country (outside of the US, Mexico or Canada)? See below for a list of international resources.  ');
    });
    cy.getElementByTestId('icon').then($element=>{
        expect($element).to.be.visible;
    })
});