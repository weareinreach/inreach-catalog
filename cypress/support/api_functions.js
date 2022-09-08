
/*
Here are located the functions that related to the API. These are mostly used to seed and clear up test data.
*/
//----------------- API HELPING FUNCTIONS -------------------------
let compoundURL;
let backendUrl = Cypress.env('environment') === "TEST" ? Cypress.env('localUrl') : Cypress.env('stagingAPIUrl')
;

//Add User
Cypress.Commands.add('addUser', (user_data) => {
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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
				user.email === 'automation-regular@gmail.commacbook-16' ||
				user.email === 'automation-regular@gmail.comipad-mini' ||
				user.email === 'automation-regular@gmail.comiphone-x' ||
				user.email === 'automation-service-provider@gmail.com' ||
				user.email === 'automation-reviewer@gmail.com'
			) {
				cy.deleteUser(user._id);
			}
		});
	});
});

//Organizations
//Add Org
Cypress.Commands.add('addOrg', (org) => {
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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

//Deleted Comments if Exist
Cypress.Commands.add('deleteCommentsIfExist',(orgId)=>{
	cy.log('Cleaning Comments...');
	compoundURL = backendUrl.concat(
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

//Delete Comment by Id
Cypress.Commands.add('deleteCommentById',(orgId,commentId)=>{
	compoundURL = backendUrl.concat(
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
	compoundURL = backendUrl.concat(
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

//Delete Ratings if Exist
Cypress.Commands.add('deleteRatingsIfExist',(orgId)=>{
	cy.log('Cleaning Ratings...');
	compoundURL = backendUrl.concat(
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

//Delete Rating
Cypress.Commands.add('deleteRatingById',(orgId,ratingId)=>{
	compoundURL = backendUrl.concat(
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
