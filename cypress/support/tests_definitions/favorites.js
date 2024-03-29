Cypress.Commands.add('testFavoritesComponentsNotLoggedIn', (viewport) => {
    cy.viewport(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-favorites').click();
            cy.getElementByTestId('favorites-page-header-text').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Once signed in, you’ll be able to quickly find the organizations and resources you have favorited.");
            });
            cy.getElementByTestId('favorites-page-login-button').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Sign In");
            });
            cy.getElementByTestId('favorites-page-signup-button').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("Sign Up");
            });
            break;
        default:
            //Switch to mobile -- AUTOMATION BUG(153) hack as Desktop and tablet do not have favorites button if not logged int
            cy.viewport(Cypress.env('mobile'));
            //click favorites in Mobile
            cy.getElementByTestId('mobile-nav-button-favorites').click();
            //revert back to viewport
            cy.viewport(viewport);
            //Releoad page and intercept
            cy.intercept('GET','/en_US/favorites').as('favorites');
            cy.reload();
            cy.wait('@favorites');
            cy.getElementByTestId('favorites-page-header-text').then($element => {
                expect($element).to.be.visible;
                expect($element).contain("You must be signed in to view Favorites.");
            });
            break;
    }
});

Cypress.Commands.add('testFavoritesComponents', (viewport, user) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.selectFavoritesList(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            //Do Nothing
            break;
        default:
            cy.getElementByTestId('favorites-page-create-new-list-button').click();
    }
    //No favorites list
    cy.getElementByTestId('favorites-page-title-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Favorites");
    });
    cy.getElementByTestId('favorites-page-header-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Your favorites lists are only visible to you and anyone you share them with.");
    });
    cy.getElementByTestId('favorites-page-body-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("You haven't created any lists yet.");
    });
    cy.getElementByTestId('favorites-page-create-new-list-button').then($element => {
        expect($element).to.be.visible;
        cy.wrap($element).click({
            force: true
        });
    });
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Create New Favorites List");
    });
    cy.getElementByTestId('favorites-create-new-page-header-text').then($element => {
        expect($element).to.be.visible;
        //expect($element).contain("Your favorites lists are only visible to you and anyone you share them with.");
    });
    cy.getElementByTestId('favorites-create-new-list-name-input').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Name your list by category, day of the week, or the name of whomever this list is for.");
    });
    cy.getElementByTestId('favorites-create-new-button').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Create New Favorites List");
    });
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('back-button').then($element => {
                cy.wrap($element[0]).click();
                cy.getElementByTestId('favorites-page-title-text').then($element => {
                    expect($element).to.be.visible;
                    expect($element).contain("Favorites");
                });
            });
            break;
        default:
            //do Nothing
            break;
    }

});


Cypress.Commands.add('testFavoritesCreateNewList', (viewport, user, listName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.selectFavoritesList(viewport);
    switch (viewport) {
        case Cypress.env('mobile'):
            cy.getElementByTestId('favorites-page-create-new-list-button').click();
            cy.getElementByTestId('favorites-create-new-list-name-input').children('.MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl').type(listName);

            break;
        default:
            cy.getElementByTestId('favorites-page-create-new-list-button').click();
            cy.getElementByTestId('favorites-create-new-list-name-input').type(listName);

    }
    cy.getElementByTestId('favorites-create-new-button').click();
    //New Item created
    cy.getElementByTestId('favorites-page-list').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).to.have.length(1);
        expect($element.children()).contain(listName);
    });
    cy.getElementByTestId('favorites-page-list-item').then($element => {
        expect($element).to.be.visible;
        expect($element).contain(listName);
    });
});

Cypress.Commands.add('testFavoritesListNoItems', (viewport, user, listName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);
    //click on the item
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-title-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Favorites");
    });
    cy.getElementByTestId('favorites-page-header-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Your favorites lists are only visible to you and anyone you share them with.");
    });

    //Non Mobile Tests
    switch (viewport) {
        case Cypress.env('mobile'):
            //Mobile Only tests
            cy.getElementByTestId('back-button').then($element => {
                expect($element).to.be.visible;
            });
            break;
        default:
            cy.getElementByTestId('favorites-page-print-icon').then($element => {
                expect($element).to.be.visible;
                expect($element).to.have.attr('title', 'Print Favorites');
            });
            cy.getElementByTestId('favorites-page-list-name').then($element => {
                expect($element).to.be.visible;
                expect($element).contain(listName);
            });
            break;
    }
    cy.getElementByTestId('favorites-page-share-button').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Share");
    });

    cy.getElementByTestId('favorites-page-body-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("You haven't added any resources to this list yet.");
    });
});

Cypress.Commands.add('testFavoritesListWithItems', (viewport, user, listName, searchName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);
    //Back to Home Page
    // eslint-disable-next-line default-case
    cy.visit(Cypress.env('baseUrl'));
    //Search
    cy.getElementByTestId('search-page-next-button').click({
        multiple: true
    });
    cy.getElementByTestId('search-bar-input').type(searchName);
    //Click first option 
    cy.getElementByTestId('search-bar-item-suggestion').then($element => {
        cy.wrap($element[0]).click();
    });
    switch(viewport){
        case Cypress.env('mobile'):
            cy.getElementByTestId('search-bar-search-by-location-button').click();
        break;
        default:
            cy.getElementByTestId('search-bar-search-button').click();
        break;
    }
    cy.getElementByTestId('search-result-favorite-button').then($element => {
        cy.wrap($element[0]).click();
    });
    cy.getElementByTestId('search-result-favorite-list-item').then($element => {
        cy.wrap($element[0]).click();
    });
    //Favorites list
    cy.selectFavoritesList(viewport);
    //Verify Components that were not tested on empty list
    cy.getElementByTestId('favorites-page-list-item').then($element => {
        expect($element).to.be.visible;
        cy.wrap($element).click();
    });

    cy.getElementByTestId('favorites-list-remove-item-button').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('type', 'button');
    });
});

Cypress.Commands.add('testRemovingItemsFromFavoritesList', (viewport, user, listName, searchName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);
    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.addToFavoritesListFromSearchPage(searchName, viewport);
    cy.selectFavoritesList(viewport);
    //Verify favorites page is there and click
    cy.getElementByTestId('favorites-page-list').should('be.visible')
    cy.getElementByTestId('favorites-page-list-item').then($element => {
        expect($element).to.be.visible;
        cy.wrap($element).click();
    });
    //remove it
    cy.getElementByTestId('favorites-list-remove-item-button').click();
    //Verify empty body of list returns
    cy.getElementByTestId('favorites-page-body-text').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("You haven't added any resources to this list yet.")
    });
})


Cypress.Commands.add('testPrintingFavoritesList', (viewport, user, listName, shareEmail) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);
    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    if (viewport !== Cypress.env('mobile')) {
        // Assert printing was called once
        cy.window().then(function (win) {
            cy.stub(win, 'print')
            cy.getElementByTestId('favorites-page-print-icon').should('exist')
                .and('be.visible')
                .click()
                .then(() => {
                    expect(win.print).to.be.called;
                });
        });
    };
});

Cypress.Commands.add('testSharingFavoritesList', (viewport, user, listName, shareEmail) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);
    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-share-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });
    //Share with no email
    cy.getElementByTestId('favorites-list-share-dialog-button').click();
    cy.getElementByTestId('dialog-container-title').should('be.visible');
    cy.getElementByTestId('favorites-list-share-email-input').should('be.visible');

    //share with email
    cy.getElementByTestId('favorites-list-share-email-input').then($element => {
        expect($element).to.be.visible;
        cy.wrap($element).type(shareEmail);
    });
    cy.getElementByTestId('favorites-list-share-dialog-button').click();
    //Back to favorites list
    cy.getElementByTestId('favorites-page-title-text').should('be.visible');
    cy.getElementByTestId('favorites-page-header-text').should('be.visible');
    cy.getElementByTestId('favorites-page-share-button').should('be.visible');
});

Cypress.Commands.add('testDeleteDialogBackButtonMobile', (viewport, user, listName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });
    //delete dialog back button - mobile only
    switch(viewport){
        case Cypress.env('mobile'):
            cy.getElementByTestId('back-button').should('be.visible');
            cy.getElementByTestId('back-button').click();
            cy.getElementByTestId('favorites-page-share-button').should('be.visible');
            cy.getElementByTestId('favorites-page-delete-button').should('be.visible');
        break;
        default:
            cy.getElementByTestId('delete-list-cancel-button').should('be.visible');
            cy.getElementByTestId('delete-list-cancel-button').click();
            //Back to list details
            cy.getElementByTestId('favorites-page-title-text').should('be.visible');
            cy.getElementByTestId('favorites-page-header-text').should('be.visible');
            cy.getElementByTestId('back-button').should('be.visible');
            cy.getElementByTestId('favorites-page-list-name').should('be.visible');
        break;
    }
});


Cypress.Commands.add('testCancelDeletingFavoritesListNotShared', (viewport, user, listName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });
    //delete dialog cancel button
    cy.getElementByTestId('delete-list-cancel-button').should('be.visible');
    cy.getElementByTestId('delete-list-cancel-button').click();


    //Back to list details
    cy.getElementByTestId('favorites-page-title-text').should('be.visible');
    cy.getElementByTestId('favorites-page-header-text').should('be.visible');
    cy.getElementByTestId('back-button').should('be.visible');

   switch(viewport){
    case Cypress.env('mobile'):
           cy.getElementByTestId('favorites-page-share-button').should('be.visible');
           cy.getElementByTestId('favorites-page-delete-button').should('be.visible');
        break;
        default:
            cy.getElementByTestId('favorites-page-list-name').should('be.visible');
        break;
   }   
});

Cypress.Commands.add('testCancelDeletingFavoritesListShared', (viewport, user, listName, shareEmail) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //share the list
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-share-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });

    //share with email
    cy.getElementByTestId('favorites-list-share-email-input').then($element => {
        cy.wrap($element).type(shareEmail);
    });
    cy.getElementByTestId('favorites-list-share-dialog-button').click();

    //go back to the main favorites list and select the list again (needed because the list data in the page does not update after Sharing)
    switch(viewport){
        case Cypress.env('mobile'):
            //do nothing
        break;
        default:
        cy.getElementByTestId('back-button').should('be.visible');
        cy.getElementByTestId('back-button').click();
        cy.getElementByTestId('favorites-page-list-item').click();
        cy.getElementByTestId('favorites-page-title-text').should('be.visible');
        cy.getElementByTestId('favorites-page-header-text').should('be.visible');
        break;
    }

    //open Delete Dialog
    cy.getElementByTestId('favorites-page-delete-button').should('be.visible');
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });

    // verify shared message is displayed, click cancel button
    cy.getElementByTestId('delete-list-shared').should('be.visible');
    cy.getElementByTestId('delete-list-cancel-button').should('be.visible');
    cy.getElementByTestId('delete-list-cancel-button').click();


    //Back to list details
    cy.getElementByTestId('favorites-page-title-text').should('be.visible');
    cy.getElementByTestId('favorites-page-header-text').should('be.visible');
    cy.getElementByTestId('back-button').should('be.visible');
    switch(viewport){
        case Cypress.env('mobile'):
            //do nothing
        break;
        default:
        cy.getElementByTestId('favorites-page-list-name').should('be.visible');
        break;
    }
    cy.getElementByTestId('favorites-page-share-button').should('be.visible');
    cy.getElementByTestId('favorites-page-delete-button').should('be.visible');
});

Cypress.Commands.add('testDeletingFavoritesListNotShared', (viewport, user, listName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });

    //delete dialog delete button
    cy.getElementByTestId('delete-list-delete-button').should('be.visible');
    cy.getElementByTestId('delete-list-delete-button').click();


    //Back to favorites list main page
    cy.getElementByTestId('favorites-page-title-text').should('be.visible');
    cy.getElementByTestId('favorites-page-header-text').should('be.visible');
    cy.getElementByTestId('favorites-page-create-new-list-button').should('be.visible');
    cy.contains(listName).should('not.exist');

    //look for the succesfully deleted message
    cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Your list has been deleted.");
        cy.getElementByTestId('snackbar-close-button').should('be.visible');
        cy.getElementByTestId('snackbar-close-button').click();
        cy.getElementByTestId('snackbar-message').should('not.exist');
    });
});

Cypress.Commands.add('testDeletingFavoritesListShared', (viewport, user, listName, shareEmail) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //share the list
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-share-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });

    //share with email
    cy.getElementByTestId('favorites-list-share-email-input').then($element => {
        cy.wrap($element).type(shareEmail);
    });
    cy.getElementByTestId('favorites-list-share-dialog-button').click();

    //go back to the main favorites list and select the list again (needed because the list data in the page does not update after Sharing)
    switch(viewport){
        case Cypress.env('mobile'):
            //do nothing
        break;
        default:
        cy.getElementByTestId('back-button').should('be.visible');
        cy.getElementByTestId('back-button').click();
        cy.getElementByTestId('favorites-page-list-item').click();
        cy.getElementByTestId('favorites-page-title-text').should('be.visible');
        cy.getElementByTestId('favorites-page-header-text').should('be.visible');
        break;
    }

    //open Delete Dialog
    cy.getElementByTestId('favorites-page-delete-button').should('be.visible');
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });

    // verify shared message is displayed, click delete button
    cy.getElementByTestId('delete-list-shared').should('be.visible');
    cy.getElementByTestId('delete-list-delete-button').should('be.visible');
    cy.getElementByTestId('delete-list-delete-button').click();


    //Automatically goes back to favorites list main page after delete
    cy.getElementByTestId('favorites-page-title-text').should('be.visible');
    cy.getElementByTestId('favorites-page-header-text').should('be.visible');
    cy.getElementByTestId('favorites-page-create-new-list-button').should('be.visible')
    cy.contains(listName).should('not.exist');

    //look for the succesfully deleted message
    cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Your list has been deleted.");
        cy.getElementByTestId('snackbar-close-button').should('be.visible');
        cy.getElementByTestId('snackbar-close-button').click();
        cy.getElementByTestId('snackbar-message').should('not.exist');
    });
});

//testing error paths for Deleting a List
Cypress.Commands.add('testDeletingFavoritesListErrorErrorCode', (viewport, user, listName,errorCode, message) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });
    cy.intercept('DELETE', '/v1/users/**', {
        error: true,
        status: {
            status: errorCode
        }
    });

    //delete dialog delete button
    cy.getElementByTestId('delete-list-delete-button').should('be.visible');
    cy.getElementByTestId('delete-list-delete-button').click();

    //look for error message
    cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
        expect($element).to.be.visible;
        expect($element).contain(message);
        cy.getElementByTestId('snackbar-close-button').should('be.visible');
        cy.getElementByTestId('snackbar-close-button').click();
        cy.getElementByTestId('snackbar-message').should('not.exist');
    });
});

Cypress.Commands.add('testDeletingFavoritesListErrorSomethingElse', (viewport, user, listName) => {
    cy.viewport(viewport);
    cy.login(user, viewport);
    cy.createFavoriteList(viewport, listName);

    //Back to Home Page
    cy.visit(Cypress.env('baseUrl'));
    cy.selectFavoritesList(viewport);
    cy.getElementByTestId('favorites-page-list-item').click();
    cy.getElementByTestId('favorites-page-delete-button').click();
    cy.getElementByTestId('dialog-container-title').then($element => {
        expect($element).contain(listName);
    });

    //delete dialog delete button
    cy.intercept('DELETE', '/v1/users/**', {
        forceNetworkError: true
    }).as('networkError');
    cy.getElementByTestId('delete-list-delete-button').should('be.visible');
    cy.getElementByTestId('delete-list-delete-button').click();

    cy.wait('@networkError')
    //look for error message
    cy.getElementByTestId('snackbar-message').should('be.visible').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Oops! Something went wrong.");
        cy.getElementByTestId('snackbar-close-button').should('be.visible');
        cy.getElementByTestId('snackbar-close-button').click();
        cy.getElementByTestId('snackbar-message').should('not.exist');
    });
});