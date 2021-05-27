/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Navigation Bar Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });

    //Root
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    //NavBar
    //Desktop
    context('Desktop Version of the Application', () => {
        it('Navigation Bar', () => {
            cy.getElementByTestId('nav-button-logo').should($element =>{
                expect($element).to.be.visible; 
            });
            cy.getElementByTestId('nav-button-about').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('href','https://asylumconnect.org/mission/');
                expect($element.children()).contain("About Us");
                //click
                cy.wrap($element).click();
                cy.location().should(loc => {
                    expect(loc.href).to.be.eq('https://asylumconnect.org/mission/');
                    expect(loc.hostname).to.be.eq('asylumconnect.org');
                    expect(loc.pathname).to.be.eq('/mission/');
                });
                //go back
                cy.go('back');
            });
                        
            cy.getElementByTestId('nav-button-take-action').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('href','https://asylumconnect.org/donate/');
                expect($element.children()).contain("Take Action");
                //click
                cy.wrap($element).click();
                cy.location().should(loc => {
                    expect(loc.href).to.be.eq('https://asylumconnect.org/donate/');
                    expect(loc.hostname).to.be.eq('asylumconnect.org');
                    expect(loc.pathname).to.be.eq('/donate/');
                });
                //go back
                cy.go('back');
            });

            cy.getElementByTestId('nav-button-get-help').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('href','https://asylumconnect.org/faqs/');
                expect($element.children()).contain("Get Help");
                //click
                cy.wrap($element).click();
                cy.location().should(loc => {
                    expect(loc.href).to.be.eq('https://asylumconnect.org/faqs/');
                    expect(loc.hostname).to.be.eq('asylumconnect.org');
                    expect(loc.pathname).to.be.eq('/faqs/');
                });
                //go back
                cy.go('back');
            });

            cy.getElementByTestId('nav-button-contact').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('href','https://asylumconnect.org/contact/');
                expect($element.children()).contain("Contact Us");
                //click
                cy.wrap($element).click();
                cy.location().should(loc => {
                    expect(loc.href).to.be.eq('https://asylumconnect.org/contact/');
                    expect(loc.hostname).to.be.eq('asylumconnect.org');
                    expect(loc.pathname).to.be.eq('/contact/');
                });
                //go back
                cy.go('back');
            });

            cy.getElementByTestId('nav-button-safety-exit').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('href','https://www.google.com/');
                expect($element.children()).contain("Safety Exit");
                //click
                cy.wrap($element).click();
                cy.location().should(loc => {
                    expect(loc.href).to.be.eq('https://www.google.com/');
                    expect(loc.hostname).to.be.eq('www.google.com');
                });
                //go back
                cy.go('back');
            });
            cy.getElementByTestId('nav-button-language').should('be.visible');
            cy.getElementByTestId('nav-account-sign-in').then($element =>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Sign In");
                });
            
            cy.getElementByTestId('nav-account-sign-up').then($element =>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Sign Up");
                });


            });

        });

    //Tablet
    context('Tablet Version of the Application', () => {
        it('Navigation Bar', () => {
            // //change viewport
            cy.viewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon-image').should('be.visible');

            cy.getElementByTestId('tablet-nav-button-icon').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('aria-haspopup','true');
                cy.wrap($element).click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-button').then($element=>{
                        expect($element).to.be.visible;
                        expect($element).to.have.attr('id','simple-menu');
                    });
                    cy.reload();
                });
                //Menu Items

                cy.getElementByTestId('tablet-nav-button-icon').click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-item-home').then($element =>{
                        expect($element).to.have.attr('href','https://asylumconnect.org');
                        //click
                        cy.wrap($element).click();
                        cy.location().should(loc => {
                            expect(loc.href).to.be.eq('https://asylumconnect.org/');
                            expect(loc.hostname).to.be.eq('asylumconnect.org');
                        });
                        cy.goBackAndSwitchToViewport('ipad-2');
                    });
                });

                cy.getElementByTestId('tablet-nav-button-icon').click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-item-about').then($element =>{
                        expect($element).to.have.attr('href','https://asylumconnect.org/mission/');
                    //click
                    cy.wrap($element).click();
                    cy.location().should(loc => {
                        expect(loc.href).to.be.eq('https://asylumconnect.org/mission/');
                        expect(loc.hostname).to.be.eq('asylumconnect.org');
                        expect(loc.pathname).to.be.eq('/mission/');
                    });
                    cy.goBackAndSwitchToViewport('ipad-2');
                    });
                });

                cy.getElementByTestId('tablet-nav-button-icon').click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-item-take-action').then($element =>{
                        expect($element).to.have.attr('href','https://asylumconnect.org/donate/');
                        //click
                        cy.wrap($element).click();
                        cy.location().should(loc => {
                            expect(loc.href).to.be.eq('https://asylumconnect.org/donate/');
                            expect(loc.hostname).to.be.eq('asylumconnect.org');
                            expect(loc.pathname).to.be.eq('/donate/');
                        });
                        cy.goBackAndSwitchToViewport('ipad-2');
                    });
                });

                cy.getElementByTestId('tablet-nav-button-icon').click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-item-faqs').then($element =>{
                        expect($element).to.have.attr('href','https://asylumconnect.org/faqs/');
                        //click
                        cy.wrap($element).click();
                        cy.location().should(loc => {
                            expect(loc.href).to.be.eq('https://asylumconnect.org/faqs/');
                            expect(loc.hostname).to.be.eq('asylumconnect.org');
                            expect(loc.pathname).to.be.eq('/faqs/');
                        });
                        cy.goBackAndSwitchToViewport('ipad-2');
                    });
                });

                cy.getElementByTestId('tablet-nav-button-icon').click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-item-contact').then($element =>{
                        expect($element).to.have.attr('href','https://asylumconnect.org/contact/');
                        //click
                        cy.wrap($element).click();
                        cy.location().should(loc => {
                            expect(loc.href).to.be.eq('https://asylumconnect.org/contact/');
                            expect(loc.hostname).to.be.eq('asylumconnect.org');
                            expect(loc.pathname).to.be.eq('/contact/');
                        });
                        cy.goBackAndSwitchToViewport('ipad-2');
                    });
                });

                cy.getElementByTestId('tablet-nav-button-icon').click().then(()=>{
                    cy.getElementByTestId('tablet-nav-menu-item-safety-exit').then($element =>{
                        expect($element).to.have.attr('href','https://www.google.com/');
                        //click
                        cy.wrap($element).click();
                        cy.location().should(loc => {
                            expect(loc.href).to.be.eq('https://www.google.com/');
                            expect(loc.hostname).to.be.eq('www.google.com');
                        });
                        cy.goBackAndSwitchToViewport('ipad-2');
                    });
                });

            });
            cy.getElementByTestId('nav-button-language').should('be.visible');
            cy.getElementByTestId('nav-account-sign-in').then($element =>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Sign In");
                });
            
            cy.getElementByTestId('nav-account-sign-up').then($element =>{
                expect($element).to.be.visible;
                expect($element.children()).contain("Sign Up");
                });
            cy.getElementByTestId('nav-button-view-favorites').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('href','/en_US/favorites');
                expect($element.children()).contain("View Your Favorites");
                cy.wrap($element).click();
                cy.location(loc =>{
                    expect(loc.href).to.be.eq(cypress.env('baseUrl')+'/en_US/favorites');
                    expect(loc.hostname).to.be.eq('localhost:3000');
                    expect(loc.pathname).to.be.eq('/en_US/favorites');
                });
            })

        });

    });

    context('Mobile Version of the application', () => {
        it('Navigation Bar', () => {
            //change viewport
            cy.viewport('iphone-x');

            cy.getElementByTestId('mobile-nav-button-search').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('type','button');
                expect($element.children()).contain("Search");
                //Click
                cy.wrap($element).click();
                cy.location(loc =>{
                    expect(loc.href).to.be.eq(cypress.env('baseUrl'));
                    expect(loc.hostname).to.be.eq('localhost:3000');
                });
            });
            
            cy.getElementByTestId('mobile-nav-button-favorites').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('type','button');
                expect($element.children()).contain("Favorites");
                //Click
                cy.wrap($element).click();
                cy.location(loc =>{
                    expect(loc.href).to.be.eq('http://localhost:3000/en_US/favorites');
                    expect(loc.hostname).to.be.eq('localhost:3000');
                    expect(loc.pathname).to.be.eq('/en_US/favorites')
                });
            });
           
            cy.getElementByTestId('mobile-nav-button-language').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('type','button');
                expect($element.children()).contain("Language");
            });

            cy.getElementByTestId('mobile-nav-button-account').then($element =>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('type','button');
                expect($element.children()).contain("Account");
                //Click
                cy.wrap($element).click();
                cy.location(loc =>{
                    expect(loc.href).to.be.eq('http://localhost:3000/en_US/account');
                    expect(loc.hostname).to.be.eq('localhost:3000');
                    expect(loc.pathname).to.be.eq('/en_US/account');
                });
            });
            
            cy.getElementByTestId('mobile-nav-button-more').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.have.attr('type','button');
                expect($element.children()).contain("More");
            });

        });
    });


});