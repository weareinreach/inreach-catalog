Cypress.Commands.add('testFooterElements',(viewport)=>{
    cy.viewport(viewport);
    cy.scrollTo('bottom');
    cy.getElementByTestId('footer-contact-facebook').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.facebook.com/asylumconnect');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-twitter').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://twitter.com/AsylumConnect');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-linkedin').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.linkedin.com/company/asylumconnect');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-email').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','mailto:catalog@asylumconnect.org');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-instagram').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.instagram.com/asylumconnect/');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-contact-youtube').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.youtube.com/channel/UCJsVS5-0ymo40mRjCe4BIHA');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-apple-store-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://apps.apple.com/us/app/asylumconnect-lgbtq-help/id1482908383');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-apple-store-image').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('alt','Download on the App Store badge');
        expect($element).to.have.attr('height','35');
    });
    cy.getElementByTestId('footer-google-play-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://play.google.com/store/apps/details?id=org.asylumconnect.app');
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
    });
    cy.getElementByTestId('footer-google-play-image').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('alt','Get it on Google Play badge');
        expect($element).to.have.attr('height','35');
    });
    cy.getElementByTestId('footer-suggest-new').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Suggest a Resource');
    });
    cy.getElementByTestId('footer-newsletter-subscribe').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://asylumconnect.org/newsletter/');
        expect($element.children()).contain('Subscribe to Newsletter');

    });
    cy.getElementByTestId('footer-share-feedback').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL');
        expect($element.children()).contain('Share Feedback');
    });
    cy.getElementByTestId('footer-copy-rights').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain(`InReach, Inc. ${new Date().getFullYear()}. All rights reserved.`);
    });
});