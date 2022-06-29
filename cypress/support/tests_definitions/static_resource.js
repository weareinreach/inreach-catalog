Cypress.Commands.add('testStaticResource',(viewport)=>{
    switch(viewport){
        case Cypress.env('mobile'):
            cy.reload();
        break;
        default:
            //Do Nothing
        break;
    }
   

cy.getElementByTestId('drop-down-selector-container').then($element=>{
    cy.wrap($element[2]).click();
    cy.getElementByTestId('list-item').then($element=>{
            expect($element[3]).to.be.visible;
            expect($element[3]).contain("Other / Travel Support");
            cy.wrap($element[3]).click();
            cy.getElementByTestId('search-page-next-button').click();
        });
    //Test Static Page
    switch(viewport){
        case Cypress.env('mobile'):
        break;
        default:
            cy.getElementByTestId('subannouncement-link').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.be.attr('href','https://inreach.org/mobile-app/');
            });
        break;
    }

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
    });
    cy.getElementByTestId('static-page-body-1').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Are you looking for help in your home country or a transit country (outside of the US, Mexico or Canada)? See below for a list of international resources.");
    });
    cy.getElementByTestId('static-page-body-2').then($element=>{
        expect($element).to.have.length(3);
        expect($element[0]).contain('Support in Your Home or Transit Country');
        expect($element[1]).contain('Travel Support');
        expect($element[2]).contain('Online Emotional Support');
    });
    cy.getElementByTestId('static-page-body-3').then($element=>{
        expect($element).to.have.length(3);
        expect($element[0]).contain('Looking for local LGBTQ-friendly help in your country of origin or a transit country?');
        expect($element[1]).contain('Looking for travel assistance to leave your home country or a transit country?');
        expect($element[2]).contain('Looking for LGBTQ+ chat rooms and psychological support online?');
    });
    cy.getElementByTestId('static-page-body-4').then($element=>{
        expect($element).to.have.length(3);
        expect($element[0]).contain('Sample LGBTQ-friendly organizations offering support and local information in countries where it is dangerous to identify as lesbian, gay, bisexual, transgender or queer (LGBTQ+). Select your region from the dropdown menu below.');
        expect($element[1]).contain('Sample organizations who may be able to assist you in physically reaching safety. ');
        expect($element[2]).contain('Sample organizations who offer LGBTQ+ people emotional and psychological support online.');
    });
    cy.getElementByTestId('static-resource-title').then($element=>{
        expect($element[0]).to.be.visible;
        expect($element).to.have.length(7);
    });
    cy.getElementByTestId('static-resource-body-1').then($element=>{
        expect($element[0]).to.be.visible;
        expect($element).to.have.length(7);
    });
    cy.getElementByTestId('static-resource-body-2').then($element=>{
        expect($element[0]).to.be.visible;
        expect($element).to.have.length(7);
    });
    cy.getElementByTestId('static-resource-header-1').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(7);
        expect($element).contain('Who this resource serves:');
    });
    cy.getElementByTestId('static-resource-header-3').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(7);
        expect($element).contain('How to visit this resource:');
    });
});
});