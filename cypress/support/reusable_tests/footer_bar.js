Cypress.Commands.add('testFooterElements',(viewport)=>{
    cy.viewport(viewport);
    cy.scrollTo('bottom');
    cy.getElementByTestId('footer-contact-facebook').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.facebook.com/weareinreach');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-twitter').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://twitter.com/weareinreach');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-linkedin').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','http://linkedin.com/company/weareinreach');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-email').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','mailto:hello@inreach.org');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-instagram').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.instagram.com/weareinreach/');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-youtube').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.youtube.com/channel/UCJsVS5-0ymo40mRjCe4BIHA');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('download-mobile-app').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://inreach.org/mobile-app');
        expect($element.children()).contain('Download our App');
    });
    cy.getElementByTestId('footer-suggest-new').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Suggest a Resource');
    });
    cy.getElementByTestId('footer-newsletter-subscribe').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://inreach.org/newsletter/');
        expect($element.children()).contain('Subscribe to Newsletter');
    });
    cy.getElementByTestId('footer-share-feedback').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://bit.ly/inreach-app-share-feedback');
        expect($element.children()).contain('Share Feedback');
    });
    cy.getElementByTestId('footer-disclaimer').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element).click();
        cy.wait(500);
        cy.getElementByTestId('dialog-container-title').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('InReach Disclaimer');
        });
        cy.getElementByTestId('disclaimer-text').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('The InReach team will do its best to confirm the eligibility and basic facts about service providers listed on this website. However, we cannot guarantee the viability or capabilities of any such providers. Consequently, InReach assumes no responsibility for the actions of providers listed on this website and users who contact any such providers do so at their own risk.')
        });
        cy.getElementByTestId('dialog-button').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain('OK');
            expect($element).to.have.attr('type','submit');
            cy.wrap($element).click();
        });
    });
    cy.getElementByTestId('footer-privacy').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Privacy Statement');
        cy.wrap($element).click();
        cy.wait(500);
        cy.getElementByTestId('dialog-container-title').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('InReach Privacy Statement');
        });
        cy.getElementByTestId('dialog-button').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain('OK');
            expect($element).to.have.attr('type','submit');
            cy.wrap($element).click();
        });
    });
    cy.getElementByTestId('footer-copy-rights').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain(`InReach, Inc. ${new Date().getFullYear()}. All rights reserved.`);
    });
});