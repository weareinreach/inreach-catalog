Cypress.Commands.add('testMexicoCrimeMap',(viewport)=>{
cy.viewport(viewport);

cy.getElementByTestId('drop-down-selector-container').then($element=>{
    cy.wrap($element[2]).click();
    cy.getElementByTestId('list-item').then($element=>{
            expect($element[1]).to.be.visible;
            expect($element[1]).contain("Mexico");
            cy.wrap($element[1]).click();
            cy.getElementByTestId('search-page-next-button').click();
        });
    });
});