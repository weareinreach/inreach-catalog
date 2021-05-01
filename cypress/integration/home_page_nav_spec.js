
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Suite of Tests',()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('baseUrl'));
    });

    //Root
    it('Root Test - Visual',()=>{
        cy.root().should('match', 'html');
    });

    //NavBar
    //Desktop
    context('Desktop Version of the Application',()=>{
        it('Navigation Bar',()=>{
           cy.getElementByTestId('nav-button-logo').should('be.visible');
           cy.getElementByTestId('nav-button-about').should('be.visible');
           cy.getElementByTestId('nav-button-about').should('have.attr','href','https://asylumconnect.org/mission/');
           //Click
           cy.getElementByTestId('nav-button-about').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/mission/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/mission/');
           });
           //Return to website
           cy.go('back');
           cy.getElementByTestId('nav-button-take-action').should('be.visible');
           cy.getElementByTestId('nav-button-take-action').should('have.attr','href','https://asylumconnect.org/donate/');
           //Click
           cy.getElementByTestId('nav-button-take-action').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/donate/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/donate/');
           });
           //Return to website
           cy.go('back');
           cy.getElementByTestId('nav-button-get-help').should('be.visible');
           cy.getElementByTestId('nav-button-get-help').should('have.attr','href','https://asylumconnect.org/faqs/');
           //Click
           cy.getElementByTestId('nav-button-get-help').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/faqs/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/faqs/');
           });
           //Return to website
           cy.go('back');
           cy.getElementByTestId('nav-button-contact').should('be.visible');
           cy.getElementByTestId('nav-button-contact').should('have.attr','href','https://asylumconnect.org/contact/');
           //Click
           cy.getElementByTestId('nav-button-contact').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/contact/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/contact/');
           });
           //Return to website
           cy.go('back');
           cy.getElementByTestId('nav-button-safety-exit').should('be.visible');
           cy.getElementByTestId('nav-button-safety-exit').should('have.attr','href','https://www.google.com/');
           //Click
           cy.getElementByTestId('nav-button-safety-exit').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://www.google.com/');
            expect(loc.hostname).to.be.eq('www.google.com');
           });
           //Return to website
           cy.go('back');
           cy.getElementByTestId('nav-button-language').should('be.visible');
           //click
           //cy.getElementByTestId('nav-button-language').click({multiple:true});
           //cy.getElementByTestId('nav-button-language-item').should('be.visible');
           //cy.getElementByTestId('nav-button-language-item').should('')
        });
        });

        //Tablet
        context('Tablet Version of the Application',()=>{
            it('Navigation Bar',()=>{
            //change viewport
            cy.viewport('ipad-2');
            cy.getElementByTestId('tablet-nav-button-icon').should('be.visible');
            cy.getElementByTestId('tablet-nav-button-icon').should('have.attr','aria-haspopup','true');
            cy.getElementByTestId('tablet-nav-button-icon-image').should('be.visible');
            cy.getElementByTestId('tablet-nav-button-icon').click();
            
            cy.getElementByTestId('tablet-nav-menu-button').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-button').should('have.attr','id','simple-menu');
            
            //Menu Items
            cy.getElementByTestId('tablet-nav-menu-item-home').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-home').should('have.attr','href','https://asylumconnect.org');
             //Click
           cy.getElementByTestId('tablet-nav-menu-item-home').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
           });
           //Return to website
           cy.go('back');
           cy.viewport('ipad-2');

           cy.getElementByTestId('tablet-nav-button-icon').click({multiple:true});
           cy.getElementByTestId('tablet-nav-menu-item-about').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-about').should('have.attr','href','https://asylumconnect.org/mission/');
             //Click
           cy.getElementByTestId('tablet-nav-menu-item-about').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/mission/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/mission/');
           });
           //Return to website
           cy.go('back');
           cy.viewport('ipad-2');

           cy.getElementByTestId('tablet-nav-button-icon').click();
           cy.getElementByTestId('tablet-nav-menu-item-take-action').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-take-action').should('have.attr','href','https://asylumconnect.org/donate/');
             //Click
           cy.getElementByTestId('tablet-nav-menu-item-take-action').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/donate/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/donate/');
           });
           //Return to website
           cy.go('back');
           cy.viewport('ipad-2');

           cy.getElementByTestId('tablet-nav-button-icon').click();
           cy.getElementByTestId('tablet-nav-menu-item-faqs').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-faqs').should('have.attr','href','https://asylumconnect.org/faqs/');
              //Click
           cy.getElementByTestId('tablet-nav-menu-item-faqs').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/faqs/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/faqs/');
           });
           //Return to website
           cy.go('back');
           cy.viewport('ipad-2');

           cy.getElementByTestId('tablet-nav-button-icon').click();
           cy.getElementByTestId('tablet-nav-menu-item-contact').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-contact').should('have.attr','href','https://asylumconnect.org/contact/');
              //Click
           cy.getElementByTestId('tablet-nav-menu-item-contact').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://asylumconnect.org/contact/');
            expect(loc.hostname).to.be.eq('asylumconnect.org');
            expect(loc.pathname).to.be.eq('/contact/');
           });
           //Return to website
           cy.go('back');
           cy.viewport('ipad-2');

           cy.getElementByTestId('tablet-nav-button-icon').click();
           cy.getElementByTestId('tablet-nav-menu-item-safety-exit').should('be.visible');
            cy.getElementByTestId('tablet-nav-menu-item-safety-exit').should('have.attr','href','https://www.google.com/');
               //Click
           cy.getElementByTestId('tablet-nav-menu-item-safety-exit').click();
           cy.location().should(loc =>{
            expect(loc.href).to.be.eq('https://www.google.com/');
            expect(loc.hostname).to.be.eq('www.google.com');
           });
           //Return to website
           cy.go('back');
        
        });
           
        });

        context('Mobile Version of the application',()=>{
            it('Navigation Bar',()=>{
                //change viewport
                cy.viewport('iphone-x');
                cy.getElementByTestId('mobile-nav-navigation').should('be.visible');
                cy.getElementByTestId('mobile-nav-button-search').should('be.visible');
                cy.getElementByTestId('mobile-nav-button-favorites').should('be.visible');
                cy.getElementByTestId('mobile-nav-button-language').should('be.visible');
                cy.getElementByTestId('mobile-nav-button-account').should('be.visible');

            });
        });


    });
