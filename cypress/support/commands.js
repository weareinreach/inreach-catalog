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

Cypress.Commands.add('getElementByTestId',(id_name =>{
    return cy.get(`[data-test-id=${id_name}]`);
}));

Cypress.Commands.add('goBackAndSwitchToViewport',(viewport) =>{
    cy.go('back');
    cy.viewport(viewport);
});

Cypress.Commands.add('login',(user,viewport)=>{
	if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-account').then($element =>{
            cy.wrap($element).click();
        });
        
    }else{
        cy.getElementByTestId('nav-account-sign-in').then($element => {
            cy.wrap($element).click({force:true});
        });
    }

	 //Enter Creds
	 cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
	 cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
	 cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
});

Cypress.Commands.add('createFavoriteList',(viewport,listName)=>{
	if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-favorites').click();
    }else{
        cy.getElementByTestId('nav-button-view-favorites').click();
    }
    cy.getElementByTestId('favorites-page-create-new-list-button').click();
    viewport === Cypress.env('mobile') ? cy.getElementByTestId('favorites-create-new-list-name-input').children('.MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl').type(listName) : cy.getElementByTestId('favorites-create-new-list-name-input').type(listName);
    cy.getElementByTestId('favorites-create-new-button').click();
});

Cypress.Commands.add('addToFavoritesListFromSearchPage',(searchName, viewport)=>{
	cy.viewport(viewport);
	//Search
    cy.getElementByTestId('search-page-next-button').click({multiple:true});
    cy.getElementByTestId('search-bar-input').type(searchName);
    //Click first option 
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    })
    if (viewport !== Cypress.env('mobile')) {
		cy.getElementByTestId('search-bar-search-button').click();
	} else {
        cy.getElementByTestId('search-bar-search-by-location-button').click();
    }
    //Let it load 
    cy.wait(1000);
    cy.getElementByTestId('search-result-favorite-button').then($element=>{
        cy.wrap($element[0]).click();
    });
    cy.getElementByTestId('search-result-favorite-list-item').then($element=>{
        cy.wrap($element[0]).click();
    });
});

Cypress.Commands.add('selectFavoritesList',(viewport)=>{
	// eslint-disable-next-line default-case
	switch(viewport){
        case Cypress.env('mobile'):
            cy.getElementByTestId('mobile-nav-button-favorites').click({force:true}) 
            break;
        case Cypress.env('tablet'):
            cy.scrollTo('top');
            cy.getElementByTestId('nav-button-view-favorites').click();
            break;
        case Cypress.env('desktop'):
            cy.getElementByTestId('nav-button-view-favorites').click();
            break;
    }
})





//----------------- API HELPING FUNCTIONS -------------------------
let compoundURL;
//Add User
Cypress.Commands.add('addUser', (user_data) => {
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_users')
	);
	cy.request({
		method: 'POST',
		url: compoundURL,
		body: user_data
	});
});

//Delete User
Cypress.Commands.add('deleteUser', (user_id) => {
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_users'),
		`/${user_id}`
	);
	cy.request({
		method: 'DELETE',
		url: compoundURL
	});
});

//Users
Cypress.Commands.add('deleteUsersIfExist', () => {
	cy.log('Cleaning Users...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_users')
	);
	cy.request({
		method: 'GET',
		url: compoundURL
	}).then((response) => {
		let usersArray = response.body.users;
		usersArray.forEach((user) => {
			//Regular User
			if (
				user.email === 'automation@gmail.com' ||
				user.email === 'automation-update@gmail.com' ||
				user.email === 'automation-updated@gmail.com' ||
				user.email === 'automation-attorney@gmail.com' ||
				user.email === 'automation-regular@gmail.com' ||
				user.email === 'automation-service-provider@gmail.com'
			) {
				cy.deleteUser(user._id);
			}
		});
	});
});

//Organizations
//Add Org
Cypress.Commands.add('addOrg', (org) => {
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations')
	);
	cy.request({
		method: 'POST',
		url: compoundURL,
		body: org
	});
});
//Delete Org
Cypress.Commands.add('deleteOrgsIfExist', () => {
	cy.log('Cleaning Orgs...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_slug_organizations'),
		'/surprisingly-unique-organizations-slug'
	);
	cy.request({
		method: 'GET',
		url: compoundURL,
		failOnStatusCode: false
	}).then((response) => {
		if (!response.body.notFound) {
			cy.deleteOrgById(response.body._id);
		}
	});
});

//Delete Org by ID
Cypress.Commands.add('deleteOrgById', (id) => {
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
		`/${id}`
	);
	cy.request({
		method: 'DELETE',
		url: compoundURL
	});
});


//Suggestions
Cypress.Commands.add('deleteAutomationSuggestions', () => {
	cy.log('Cleaning Suggestions...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_suggestions'),
		'/automation@gmail.com'
	);
	cy.request({
		method: 'GET',
		url: compoundURL
	}).then((response) => {
		let suggestionArray = response.body;
		suggestionArray.forEach((suggestion) => {
			cy.deleteSuggestionById(suggestion._id);
		});
	});
});

//Delete Suggestion by Id
Cypress.Commands.add('deleteSuggestionById', (id) => {
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_suggestions'),
		`/${id}`
	);
	cy.request({
		method: 'DELETE',
		url: compoundURL
	});
});


//Delete Comments for Org
Cypress.Commands.add('deleteCommentsOrgsIfExist',(orgSlug) => {
	cy.log('Cleaning Orgs...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_slug_organizations'),
		`/${orgSlug}`
	);
	cy.request({
		method: 'GET',
		url: compoundURL,
		failOnStatusCode: false
	}).then((response) => {
		if (!response.body.notFound) {
			cy.deleteCommentsIfExist(response.body._id);
		}
	});
});


Cypress.Commands.add('deleteCommentsIfExist',(orgId)=>{
	cy.log('Cleaning Comments...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
		`/${orgId}`,
		Cypress.env('route_comments')
	);
	cy.request({
		method:'GET',
		url:compoundURL
	}).then(response=>{
		cy.log(response.body);
		response.body.comments.forEach(comment =>{
			cy.deleteCommentById(orgId,comment._id);
		});
	});
});

Cypress.Commands.add('deleteCommentById',(orgId,commentId)=>{
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
		`/${orgId}`,
		Cypress.env('route_comments'),
		`/${commentId}`
	);
	cy.request({
		method:'DELETE',
		url:compoundURL
	});
});

//Delete Ratings for Org
Cypress.Commands.add('deleteRatingsOrgsIfExist',(orgSlug) => {
	cy.log('Cleaning Orgs...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_slug_organizations'),
		`/${orgSlug}`
	);
	cy.request({
		method: 'GET',
		url: compoundURL,
		failOnStatusCode: false
	}).then((response) => {
		if (!response.body.notFound) {
			cy.deleteRatingsIfExist(response.body._id);
		}
	});
});


Cypress.Commands.add('deleteRatingsIfExist',(orgId)=>{
	cy.log('Cleaning Ratings...');
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
		`/${orgId}`,
		Cypress.env('route_ratings')
	);
	cy.request({
		method:'GET',
		url:compoundURL
	}).then(response=>{
		response.body.comments.forEach(comment =>{
			cy.deleteRatingById(orgId,comment._id);
		});
	});
});

Cypress.Commands.add('deleteRatingById',(orgId,ratingId)=>{
	compoundURL = Cypress.env('stagingAPIUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
		`${orgId}`,
		Cypress.env('route_ratings'),
		`/${ratingId}`
	);
	cy.request({
		method:'DELETE',
		url:compoundURL
	});
});