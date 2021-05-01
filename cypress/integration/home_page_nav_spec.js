/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Suite of Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });

    //Root
    it('Root Test - Visual', () => {
        cy.root().should('match', 'html');
    });

    //NavBar
    //Desktop
    context('Desktop Version of the Application', () => {
        it('Navigation Bar', () => {
            cy.getElementByTestId('nav-button-logo').should('be.visible');
            cy.getElementByTestId('nav-button-about').should('be.visible');
            cy.getElementByTestId('nav-button-about').should('have.attr', 'href', 'https://asylumconnect.org/mission/');
            cy.getElementByTestId('nav-button-about').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/mission/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/mission/');
            });
            cy.go('back');
            cy.getElementByTestId('nav-button-take-action').should('be.visible');
            cy.getElementByTestId('nav-button-take-action').should('have.attr', 'href', 'https://asylumconnect.org/donate/');
            cy.getElementByTestId('nav-button-take-action').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/donate/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/donate/');
            });
            cy.go('back');
            cy.getElementByTestId('nav-button-get-help').should('be.visible');
            cy.getElementByTestId('nav-button-get-help').should('have.attr', 'href', 'https://asylumconnect.org/faqs/');
            cy.getElementByTestId('nav-button-get-help').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/faqs/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/faqs/');
            });
            cy.go('back');
            cy.getElementByTestId('nav-button-contact').should('be.visible');
            cy.getElementByTestId('nav-button-contact').should('have.attr', 'href', 'https://asylumconnect.org/contact/');
            cy.getElementByTestId('nav-button-contact').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/contact/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/contact/');
            });
            cy.go('back');
            cy.getElementByTestId('nav-button-safety-exit').should('be.visible');
            cy.getElementByTestId('nav-button-safety-exit').should('have.attr', 'href', 'https://www.google.com/');
            cy.getElementByTestId('nav-button-safety-exit').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://www.google.com/');
                expect(loc.hostname).to.be.eq('www.google.com');
            });
            cy.go('back');
            cy.getElementByTestId('nav-button-language').should('be.visible');
        });
    });

    //Tablet
    context('Tablet Version of the Application', () => {
        it('Navigation Bar', () => {
            //change viewport
            cy.viewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon').should('be.visible');
            cy.getElementByTestId('tablet-nav-button-icon').should('have.attr', 'aria-haspopup', 'true');
            cy.getElementByTestId('tablet-nav-button-icon-image').should('be.visible');
            cy.getElementByTestId('tablet-nav-button-icon').click();
            cy.getElementByTestId('tablet-nav-menu-button').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-button').should('have.attr', 'id', 'simple-menu');

            //Menu Items
            cy.getElementByTestId('tablet-nav-menu-item-home').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-home').should('have.attr', 'href', 'https://asylumconnect.org');
            cy.getElementByTestId('tablet-nav-menu-item-home').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
            });
            cy.goBackAndSwitchToViewport('ipad-2');

            cy.getElementByTestId('tablet-nav-button-icon').click();
            cy.getElementByTestId('tablet-nav-menu-item-about').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-about').should('have.attr', 'href', 'https://asylumconnect.org/mission/');
            cy.getElementByTestId('tablet-nav-menu-item-about').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/mission/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/mission/');
            });
            cy.goBackAndSwitchToViewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon').click();
            cy.getElementByTestId('tablet-nav-menu-item-take-action').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-take-action').should('have.attr', 'href', 'https://asylumconnect.org/donate/');
            cy.getElementByTestId('tablet-nav-menu-item-take-action').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/donate/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/donate/');
            });
            cy.goBackAndSwitchToViewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon').click();
            cy.getElementByTestId('tablet-nav-menu-item-faqs').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-faqs').should('have.attr', 'href', 'https://asylumconnect.org/faqs/');
            cy.getElementByTestId('tablet-nav-menu-item-faqs').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/faqs/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/faqs/');
            });
            cy.goBackAndSwitchToViewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon').click();
            cy.getElementByTestId('tablet-nav-menu-item-contact').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-contact').should('have.attr', 'href', 'https://asylumconnect.org/contact/');
            cy.getElementByTestId('tablet-nav-menu-item-contact').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://asylumconnect.org/contact/');
                expect(loc.hostname).to.be.eq('asylumconnect.org');
                expect(loc.pathname).to.be.eq('/contact/');
            });
            cy.goBackAndSwitchToViewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon').click();
            cy.getElementByTestId('tablet-nav-menu-item-safety-exit').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-safety-exit').should('have.attr', 'href', 'https://www.google.com/');
            cy.getElementByTestId('tablet-nav-menu-item-safety-exit').click();
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('https://www.google.com/');
                expect(loc.hostname).to.be.eq('www.google.com');
            });
        });

    });

    context('Mobile Version of the application', () => {
        it('Navigation Bar', () => {
            //change viewport
            cy.viewport('iphone-x');
            cy.getElementByTestId('mobile-nav-navigation').should('be.visible');
            cy.getElementByTestId('mobile-nav-button-search').should('be.visible');
            cy.getElementByTestId('mobile-nav-button-search').click();
            cy.location(loc =>{
                expect(loc.href).to.be.eq(cypress.env('baseUrl'));
                expect(loc.hostname).to.be.eq('localhost:3000');
            })
            cy.getElementByTestId('mobile-nav-button-favorites').should('be.visible');
            cy.getElementByTestId('mobile-nav-button-favorites').click();
            cy.location(loc =>{
                expect(loc.href).to.be.eq('http://localhost:3000/en_US/favorites');
                expect(loc.hostname).to.be.eq('localhost:3000');
                expect(loc.pathname).to.be.eq('/en_US/favorites')
            });
            cy.getElementByTestId('mobile-nav-button-language').should('be.visible');
            cy.getElementByTestId('mobile-nav-button-account').should('be.visible');
            cy.getElementByTestId('mobile-nav-button-account').click();
            cy.location(loc =>{
                expect(loc.href).to.be.eq('http://localhost:3000/en_US/account');
                expect(loc.hostname).to.be.eq('localhost:3000');
                expect(loc.pathname).to.be.eq('/en_US/account');
            });
            cy.getElementByTestId('mobile-nav-button-more').should('be.visible');

        });
    });


});