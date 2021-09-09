/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Favorites List Tests', () => {


    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user').then(user=>{
            //Add User
            cy.addUser(user);
        });

        
    });
    afterEach(() => {
        //Do the clean up
        cy.deleteUsersIfExist();
    });

    //Root
    it('Root Test - Elements', () => {
        cy.root().should('match', 'html');
    });

    //Components Not Logged In
    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
                it(`Favorites Components not logged in`,()=>{
                    cy.testFavoritesComponentsNotLoggedIn(viewport);
                });
                it(`Favorites Components logged in`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testFavoritesComponents(viewport,user);
                    });
                    
                });
                it(`Favorites List Components logged in`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testFavoritesCreateNewList(viewport,user,"Automation List");
                    });
                    
                });
                it(`Favorites List Components logged in with no items`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testFavoritesListNoItems(viewport,user,"Automation List");
                    });
                });
                it(`Favorites List adding item`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testFavoritesListWithItems(viewport,user,"Automation List","Denver");
                    }); 
                });
                it(`Favorites List removing item`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testRemovingItemsFromFavoritesList(viewport,user,"Automation List","Denver");
                    }); 
                });
                it(`Favorites List Sharing List`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testSharingFavoritesList(viewport,user,"Automation List","automation2@gmail.com");
                    }); 
                });
                it(`Favorites List Delete List - Cancel`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testCancelDeletingFavoritesList(viewport,user,"Automation List");
                    }); 
                });

        });
    });
});


