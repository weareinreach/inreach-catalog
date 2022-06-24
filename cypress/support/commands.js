// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const MOBILE = 'mobile';
const TABLET = 'tablet';


Cypress.Commands.add('getElementByTestId',(id_name) =>{
    return cy.get(`[data-test-id=${id_name}]`);
});

Cypress.Commands.add('goBackAndSwitchToViewport',(viewport) =>{
    cy.go('back');
    cy.viewport(viewport);
});

Cypress.Commands.add('login',(user,viewport)=>{
	cy.intercept('/v1/auth').as('login');
	switch(viewport){
		case Cypress.env(MOBILE):
			cy.getElementByTestId('mobile-nav-button-account').click();
		break;
		default:
			cy.getElementByTestId('nav-account-sign-in').click({force:true});
		break;
	}
	 //Enter Creds
	 cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
	 cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
	 cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
	 cy.wait('@login');
});

Cypress.Commands.add('logout',(viewport)=>{
	switch(viewport){
		case Cypress.env(MOBILE):
			cy.getElementByTestId('mobile-nav-button-account').click()
            cy.getElementByTestId('account-page-logout').click({
                force: true
            });
		break;
		case Cypress.env(TABLET):
			cy.getElementByTestId('nav-button-account').click();
            cy.getElementByTestId('nav-account-sign-out').click({
                force: true
            });
		break;
		default:
			cy.getElementByTestId('nav-account-sign-out').click({
                force: true
            });
		break;
	}
});

Cypress.Commands.add('createFavoriteList',(viewport,listName)=>{
	switch(viewport){
		case Cypress.env(MOBILE):
			cy.getElementByTestId('mobile-nav-button-favorites').click();
			break;
		case Cypress.env(TABLET):
			cy.getElementByTestId('drop-down-selector-item').then($element=>{
				cy.wrap($element[2]).click();
				cy.getElementByTestId('nav-button-view-favorites').click();
			});
			break;
		default:
			cy.getElementByTestId('nav-button-view-favorites').click();
			break;
	}
    cy.getElementByTestId('favorites-page-create-new-list-button').click();

	switch(viewport){
		case Cypress.env(MOBILE):
			cy.getElementByTestId('favorites-create-new-list-name-input').children('.MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl').type(listName);
			break;
		default:
			cy.getElementByTestId('favorites-create-new-list-name-input').type(listName);
			break;
	}
    cy.getElementByTestId('favorites-create-new-button').click();
});

Cypress.Commands.add('addToFavoritesListFromSearchPage',(searchName, viewport)=>{
	//Search
    cy.getElementByTestId('search-page-next-button').click({multiple:true});
    cy.getElementByTestId('search-bar-input').type(searchName);
    //Click first option 
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    });
	cy.intercept('GET','/v1/organizations*').as('orgSearch');
	switch(viewport){
		case Cypress.env(MOBILE):
			cy.getElementByTestId('search-bar-search-by-location-button').click();
			
	    break;
		default:
			cy.getElementByTestId('search-bar-search-button').click();
		break;
	}
    //Let it load 
    cy.wait('@orgSearch');
    cy.getElementByTestId('search-result-favorite-button').then($element=>{
        cy.wrap($element[0]).click();
    });
    cy.getElementByTestId('search-result-favorite-list-item').then($element=>{
        cy.wrap($element[0]).click();
    });
});

Cypress.Commands.add('selectFavoritesList',(viewport)=>{
	switch(viewport){
        case Cypress.env(MOBILE):
            cy.getElementByTestId('mobile-nav-button-favorites').click({force:true});
            break;
        case Cypress.env(TABLET):
            cy.scrollTo('top');
            cy.getElementByTestId('drop-down-selector-item').then($element=>{
				cy.wrap($element[2]).click();
				cy.getElementByTestId('nav-button-view-favorites').click();
			});
            break;
        default:
            cy.getElementByTestId('nav-button-view-favorites').click();
            break;
    }
});



