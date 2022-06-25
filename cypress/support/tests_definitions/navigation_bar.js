Cypress.Commands.add('testNavigationBar', (viewport, user) => {
	cy.viewport(viewport);
	switch (viewport) {
		case Cypress.env('mobile'):
			testNavigationBarMobile(viewport, user);
			break;
		case Cypress.env('tablet'):
			testNavigationBarTablet(viewport, user);
			break;
		default:
			testNavigationBarDesktop(viewport, user);
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
		expect($element).to.have.attr('target', '_blank');
		expect($element.children()).contain('About Us');
	});

	cy.getElementByTestId('nav-button-take-action').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/donate/');
		expect($element).to.have.attr('target', '_blank');
		expect($element.children()).contain('Take Action');
	});

	cy.getElementByTestId('nav-button-get-help').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/faqs/');
		expect($element).to.have.attr('target', '_blank');
		expect($element.children()).contain('Questions?');
	});

	cy.getElementByTestId('nav-button-contact').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://inreach.org/contact/');
		expect($element).to.have.attr('target', '_blank');
		expect($element.children()).contain('Contact Us');
	});

	cy.getElementByTestId('nav-button-safety-exit').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', 'https://www.google.com/');
		expect($element).to.have.attr('target', '_blank');
		expect($element.children()).contain('Safety Exit');
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
    cy.getElementByTestId('nav-button-view-favorites').should('exist').then(($element) => {
		expect($element).to.have.attr('class', 'hide--on-print');
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
	cy.getElementByTestId('nav-button-safety-exit').then(
		($element) => {
			expect($element).to.have.attr('href', 'https://www.google.com/');
      expect($element).to.have.attr('target', '_blank');
			expect($element.children()).contain('Safety Exit');
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
    cy.wait(1000);
    //account menu drop down when logged in - favorites
	cy.getElementByTestId('nav-button-account').should('exist').then(($element) => {
		cy.wrap($element).click();
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
	});
   
   //account menu drop down when logged in - account settings
	cy.getElementByTestId('nav-button-account').should('exist').then(($element) => {
		cy.wrap($element).click();
		cy.getElementByTestId('nav-account-account-settings').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', '/en_US/account');
		expect($element.children()).contain('Account Settings');
		cy.wrap($element).click();
			cy.location((loc) => {
				expect(loc.href).to.be.eq(cypress.env('baseUrl') + '/en_US/account');
				expect(loc.hostname).to.be.eq('localhost:3000');
				expect(loc.pathname).to.be.eq('/en_US/account');
			});
		});
	});

	//account menu drop down when logged in - sign out
	cy.getElementByTestId('nav-button-account').should('exist').then(($element) => {
		cy.wrap($element).click();
		cy.getElementByTestId('nav-account-sign-out').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('href', '/');
		expect($element.children()).contain('Sign Out');
		cy.wrap($element).click();
			cy.location((loc) => {
				expect(loc.href).to.be.eq(cypress.env('baseUrl'));
				expect(loc.hostname).to.be.eq('localhost:3000');
				expect(loc.pathname).to.be.eq('');
			});
		});
	});

	//tablet menu dropdown
	cy.getElementByTestId('drop-down-selector-container').then(($element) => {
		cy.wrap($element[0]).click();
		//look for the drop down options
		cy.getElementByTestId('tablet-nav-menu-item-about').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('href', 'https://inreach.org/mission/');
			expect($element).to.have.attr('target', '_blank');
			expect($element.children()).contain('About Us');
		});
		cy.getElementByTestId('tablet-nav-menu-item-take-action').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('href', 'https://inreach.org/donate/');
			expect($element).to.have.attr('target', '_blank');
			expect($element.children()).contain('Take Action');
		});
		cy.getElementByTestId('tablet-nav-menu-item-faqs').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('href', 'https://inreach.org/faqs/');
			expect($element).to.have.attr('target', '_blank');
			expect($element.children()).contain('Questions?');
		});
		cy.getElementByTestId('tablet-nav-menu-item-contact').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('href', 'https://inreach.org/contact/');
			expect($element).to.have.attr('target', '_blank');
			expect($element.children()).contain('Contact Us');
		});
	});
}

function testNavigationBarMobile(viewport, user) {
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

    //user not logged in
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
		cy.getElementByTestId('favorites-page-login-button').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('type', 'submit');
			expect($element.children()).contain('Sign In');
		});
		cy.getElementByTestId('favorites-page-signup-button').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('type', 'submit');
			expect($element.children()).contain('Sign Up');
		});
	});

	cy.getElementByTestId('mobile-nav-button-language').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('type', 'button');
		expect($element.children()).contain('Language');
		//Click
		cy.wrap($element).click();
		//using this loc since favorites was the last page viewed
		cy.location((loc) => {
			expect(loc.href).to.be.eq('http://localhost:3000/en_US/favorites');
			expect(loc.hostname).to.be.eq('localhost:3000');
			expect(loc.pathname).to.be.eq('/en_US/favorites');
		});
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
		cy.wrap($element).click();
		//using this loc since account was the last page viewed
		cy.location((loc) => {
			expect(loc.href).to.be.eq('http://localhost:3000/en_US/account');
			expect(loc.hostname).to.be.eq('localhost:3000');
			expect(loc.pathname).to.be.eq('/en_US/account');
		});
	});

	//log in user to verify Favorites list is shown and account details are shown
	cy.getElementByTestId('mobile-nav-button-account').then(($element) => {
		//Click
		cy.wrap($element).click();
    	cy.login(user, viewport);
		cy.getElementByTestId('account-page-tab-your-account').should('be.visible');
	});
	cy.getElementByTestId('mobile-nav-button-favorites').then(($element) => {
		//Click
		cy.wrap($element).click();
		cy.getElementByTestId('favorites-page-title-text').should('be.visible');
		});
};

