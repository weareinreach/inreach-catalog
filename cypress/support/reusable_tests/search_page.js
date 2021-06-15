Cypress.Commands.add('testSearchPageElements',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('search-page-next-button').click();
    cy.waitFor(2000);
    cy.getElementByTestId('search-form-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("On March 20, 2020, the United States announced the borders with Mexico and Canada will be closed. Asylum seekers will be turned back from all borders.");
    });
    if(viewport!==Cypress.env('mobile')){
        cy.getElementByTestId('search-form-body').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Welcome to the United States AsylumConnect Catalog!');
        });
    }

    cy.getElementByTestId('search-form-body-2').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Search for verified LGBTQ- and immigrant-friendly services near you');
    });

    cy.getElementByTestId('search-bar-input').then($element=>{
        expect($element).to.be.visible;
    })

    cy.getElementByTestId('search-form-checkbox').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('search-bar-search-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','submit');
    });

    cy.getElementByTestId('search-form-download-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
        expect($element).contain("Download Legal Guides on LGBTQ Asylum in the U.S.");
    });
});