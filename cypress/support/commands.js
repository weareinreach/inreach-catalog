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

Cypress.Commands.add('login',(user)=>{
	cy.getElementByTestId('nav-account-sign-in').click({force:true});
	 //Enter Creds
	 cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
	 cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
	 cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
});




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