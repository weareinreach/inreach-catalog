Cypress.Commands.add('testAnnouncementBannerElementsAndActions',(viewport)=>{
    cy.viewport(viewport);
    cy.get('#announcement-div').then($element=>{
        cy.get($element).children().should('have.length', 2);
        cy.getElementByTestId('announcement-header').then($element=>{
            expect($element).to.have.attr('href','https://prn.to/3lMPU5Y');
            expect($element.children()).contain('AsylumConnect is now InReach');
        });
    });
});