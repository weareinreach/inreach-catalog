Cypress.Commands.add('testAnnouncementBannerElementsAndActions',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('announcement-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Users contact service providers at their own risk.');
    });
    cy.getElementByTestId('announcement-disclaimer-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Disclaimer');
        cy.wrap($element).click();
        cy.wait(500);
        cy.getElementByTestId('dialog-container-title').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('AsylumConnect Disclaimer');
        });
        cy.getElementByTestId('disclaimer-text').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('The AsylumConnect team will do its best to confirm the eligibility and basic facts about service providers listed on this website. However, we cannot guarantee the viability or capabilities of any such providers. Consequently, AsylumConnect assumes no responsibility for the actions of providers listed on this website and asylum seekers who contact any such providers do so at their own risk.')
        });
        cy.getElementByTestId('dialog-button').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain('OK');
            expect($element).to.have.attr('type','submit');
            cy.wrap($element).click();
        });

    });
    cy.getElementByTestId('announcement-privacy-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('User Privacy Statement');
        cy.wrap($element).click();
        cy.wait(500);
        cy.getElementByTestId('dialog-container-title').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('AsylumConnect User Privacy Statement');
        });
        cy.getElementByTestId('dialog-button').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain('OK');
            expect($element).to.have.attr('type','submit');
            cy.wrap($element).click();
        });
    });
});