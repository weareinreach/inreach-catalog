Cypress.Commands.add('testNavigationBar', (viewport, user) => {
	//set viewport
	cy.viewport(viewport);
	// eslint-disable-next-line default-case
	switch (viewport) {
		case Cypress.env('desktop'):
			testNavigationBarDesktop(viewport, user);
			break;
		case Cypress.env('tablet'):
			testNavigationBarTablet(viewport, user);
			break;
		case Cypress.env('mobile'):
			testNavigationBarMobile();
			break;
	}
});

//desktop
function testNavigationBarDesktop(viewport, user) {
	cy.getElementByTestId('nav-button-logo').should(($element) => {
		expect($element).to.be.visible;
	});
	cy.getElementByTestId('nav-button-about').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/mission/');
		expect($element.children()).contain('About Us');
		//click
		//uncomment once inreach is live
		/*cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://inreach.org/mission/');
			expect(loc.hostname).to.be.eq('inreach.org');
			expect(loc.pathname).to.be.eq('/mission/');
		});*/
		//go back
		// cy.go('back');
	});

	cy.getElementByTestId('nav-button-take-action').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/donate/');
		expect($element.children()).contain('Take Action');
		//click
		//uncomment once inreach is live
		/*cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://inreach.org/donate/');
			expect(loc.hostname).to.be.eq('inreach.org');
			expect(loc.pathname).to.be.eq('/donate/');
		});*/
		//go back
		// cy.go('back');
	});

	cy.getElementByTestId('nav-button-get-help').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/faqs/');
		expect($element.children()).contain('Get Help');
		//click
		//uncomment once inreach is live
		/*cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://inreach.org/faqs/');
			expect(loc.hostname).to.be.eq('inreach.org');
			expect(loc.pathname).to.be.eq('/faqs/');
		})*/;
		//go back
		// cy.go('back');
	});

	cy.getElementByTestId('nav-button-contact').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/contact/');
		expect($element.children()).contain('Contact Us');
		//click
		//uncomment once inreach is live
		/*cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://inreach.org/contact/');
			expect(loc.hostname).to.be.eq('inreach.org');
			expect(loc.pathname).to.be.eq('/contact/');
		});*/
		//go back
		// cy.go('back');
	});

	cy.getElementByTestId('nav-button-safety-exit').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://www.google.com/');
		expect($element.children()).contain('Safety Exit');
		//click
		cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://www.google.com/');
			expect(loc.hostname).to.be.eq('www.google.com');
		});
		//go back
		cy.go('back');
	});
	cy.getElementByTestId('nav-button-language').should('be.visible');
	cy.getElementByTestId('nav-account-sign-in').then(($element) => {
		expect($element).to.be.visible;
		expect($element.children()).contain('Sign In');
	});

	cy.getElementByTestId('nav-account-sign-up').then(($element) => {
		expect($element).to.be.visible;
		expect($element.children()).contain('Sign Up');
	});
    cy.getElementByTestId('nav-button-view-favorites').should('not.to.exist');
    cy.login(user, viewport);
	cy.wait(1000);
    cy.getElementByTestId('nav-button-view-favorites').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', '/en_US/favorites');
		expect($element.children()).contain('View Your Favorites');
		cy.wrap($element).click();
		cy.location((loc) => {
			expect(loc.href).to.be.eq(cypress.env('baseUrl') + '/en_US/favorites');
			expect(loc.hostname).to.be.eq('localhost:3000');
			expect(loc.pathname).to.be.eq('/en_US/favorites');
		});
	});
}

function testNavigationBarTablet(viewport, user) {
	cy.getElementByTestId('nav-button-logo').should('be.visible');
	cy.wait(1000)
	cy.getElementByTestId('drop-down-selector-container').should('be.visible').then($element=>{
		cy.wrap($element[0]).click();
	});
	cy.getElementByTestId('tablet-nav-menu-item-about').then(($element) => {
		expect($element).to.have.attr(
			'href',
			'https://inreach.org/mission/'
		);
		//click
		//uncomment once inreach is live	
		/*cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://inreach.org/mission/');
			expect(loc.hostname).to.be.eq('inreach.org');
			expect(loc.pathname).to.be.eq('/mission/');
		});*/
		cy.visitAndViewport(Cypress.env('baseUrl'),Cypress.env('tablet'));
	});
	cy.getElementByTestId('drop-down-selector-container').should('be.visible').then($element=>{
		cy.wrap($element[0]).click();
	});
	cy.getElementByTestId('tablet-nav-menu-item-take-action').then(
		($element) => {
			expect($element).to.have.attr(
				'href',
				'https://inreach.org/donate/'
			);
			//click
			//uncomment once inreach is live
			/*cy.wrap($element).click();
			cy.location().should((loc) => {
				expect(loc.href).to.be.eq('https://inreach.org/donate/');
				expect(loc.hostname).to.be.eq('inreach.org');
				expect(loc.pathname).to.be.eq('/donate/');
			});*/
			cy.visitAndViewport(Cypress.env('baseUrl'),Cypress.env('tablet'));
		});
		cy.getElementByTestId('drop-down-selector-container').should('be.visible').then($element=>{
			cy.wrap($element[0]).click();
		});
		cy.getElementByTestId('tablet-nav-menu-item-faqs').then(($element) => {
		expect($element).to.have.attr(
			'href',
			'https://inreach.org/faqs/'
		);
		//click
		/*cy.wrap($element).click();
		cy.location().should((loc) => {
			expect(loc.href).to.be.eq('https://inreach.org/faqs/');
			expect(loc.hostname).to.be.eq('inreach.org');
			expect(loc.pathname).to.be.eq('/faqs/');
		});*/
		cy.visitAndViewport(Cypress.env('baseUrl'),Cypress.env('tablet'));
	});
	cy.getElementByTestId('drop-down-selector-container').should('be.visible').then($element=>{
		cy.wrap($element[0]).click();
	});
				cy.getElementByTestId('tablet-nav-menu-item-contact').then(
					($element) => {
						expect($element).to.have.attr(
							'href',
							'https://inreach.org/contact/'
						);
						//click
						/*cy.wrap($element).click();
						cy.location().should((loc) => {
							expect(loc.href).to.be.eq('https://inreach.org/contact/');
							expect(loc.hostname).to.be.eq('inreach.org');
							expect(loc.pathname).to.be.eq('/contact/');
						});*/
						cy.visitAndViewport(Cypress.env('baseUrl'),Cypress.env('tablet'));
					}
				);

			cy.getElementByTestId('nav-button-safety-exit').then(
					($element) => {
						expect($element).to.have.attr('href', 'https://www.google.com/');
						//click
						cy.wrap($element).click();
						cy.location().should((loc) => {
							expect(loc.href).to.be.eq('https://www.google.com/');
							expect(loc.hostname).to.be.eq('www.google.com');
						});
						cy.visitAndViewport(Cypress.env('baseUrl'),Cypress.env('tablet'));
					}
				);
	cy.getElementByTestId('nav-button-language').should('be.visible');
	cy.getElementByTestId('nav-account-sign-in').then(($element) => {
		expect($element).to.be.visible;
		expect($element.children()).contain('Sign In');
	});

	cy.getElementByTestId('nav-account-sign-up').then(($element) => {
		expect($element).to.be.visible;
		expect($element.children()).contain('Sign Up');
	});

	cy.getElementByTestId('nav-button-view-favorites').should('not.to.exist');
    cy.login(user, viewport);
	cy.getElementByTestId('drop-down-selector-container').should('be.visible').then($element=>{
		cy.wrap($element[2]).click();
	});
    cy.getElementByTestId('nav-button-view-favorites').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', '/en_US/favorites');
		expect($element.children()).contain('View Your Favorites');
		cy.wrap($element).click();
		cy.location((loc) => {
			expect(loc.href).to.be.eq(cypress.env('baseUrl') + '/en_US/favorites');
			expect(loc.hostname).to.be.eq('localhost:3000');
			expect(loc.pathname).to.be.eq('/en_US/favorites');
		});
	});
}

function testNavigationBarMobile() {
	cy.getElementByTestId('mobile-nav-button-search').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('type', 'button');
		expect($element.children()).contain('Search');
		//Click
		cy.wrap($element).click();
		cy.location((loc) => {
			expect(loc.href).to.be.eq(cypress.env('baseUrl'));
			expect(loc.hostname).to.be.eq('localhost:3000');
		});
	});
    cy.getElementByTestId('mobile-nav-button-favorites').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('type', 'button');
		expect($element.children()).contain('Favorites');
		//Click
		cy.wrap($element).click();
		cy.location((loc) => {
			expect(loc.href).to.be.eq('http://localhost:3000/en_US/favorites');
			expect(loc.hostname).to.be.eq('localhost:3000');
			expect(loc.pathname).to.be.eq('/en_US/favorites');
		});
	});

	cy.getElementByTestId('mobile-nav-button-language').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('type', 'button');
		expect($element.children()).contain('Language');
	});

	cy.getElementByTestId('mobile-nav-button-account').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('type', 'button');
		expect($element.children()).contain('Account');
		//Click
		cy.wrap($element).click();
		cy.location((loc) => {
			expect(loc.href).to.be.eq('http://localhost:3000/en_US/account');
			expect(loc.hostname).to.be.eq('localhost:3000');
			expect(loc.pathname).to.be.eq('/en_US/account');
		});
	});

	cy.getElementByTestId('mobile-nav-button-more').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('type', 'button');
		expect($element.children()).contain('More');
	});
}
