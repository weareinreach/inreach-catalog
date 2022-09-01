Cypress.Commands.add('testSearchPageElements', (viewport) => {
	cy.viewport(viewport);
	switch (viewport) {
		case Cypress.env('mobile'):
			cy.reload();
			cy.getElementByTestId('search-page-next-button').click();
			break;
		default:
			cy.getElementByTestId('search-page-next-button').click();
			cy.getElementByTestId('search-form-body').then($element => {
				expect($element).to.be.visible;
				expect($element).contain('Welcome to InReach');
				expect($element).contain('United States');
			});

			cy.getElementByTestId('search-form-body-2').then(($element) => {
				expect($element).to.be.visible;
				expect($element).contain(
					"The world's first tech platform matching LGBTQ+ people with safe, verified resources."
				);
			});
			break;
	}
	cy.getElementByTestId('search-bar-input').then(($element) => {
		expect($element).to.be.visible;
	});

	cy.getElementByTestId('isNational').then(($element) => {
		expect($element).to.be.visible;
	});

	cy.getElementByTestId('100').then(($element) => {
		expect($element).to.be.visible;
	});

	cy.getElementByTestId('200').then(($element) => {
		expect($element).to.be.visible;
	});

	switch (viewport) {
		case Cypress.env('mobile'):
			cy.getElementByTestId('search-bar-search-by-location-button').then(($element) => {
				expect($element).to.be.visible;
				expect($element).to.have.attr('type', 'submit');
			});
			break;
		default:
			cy.getElementByTestId('search-bar-search-button').then(($element) => {
				expect($element).to.be.visible;
				expect($element).to.have.attr('type', 'submit');
			});
			break;
	}
});

Cypress.Commands.add('testSearchAction', (viewport, org) => {
	cy.viewport(viewport);
	switch (viewport) {
		case Cypress.env('mobile'):
			cy.reload();
			cy.getElementByTestId('search-page-next-button').click();
			break;
		default:
			cy.getElementByTestId('search-page-next-button').click();
			break;
	}
	cy.intercept('/v1/slug/organizations/*').as('clickedOrg');
	cy.getElementByTestId('search-bar-input').type(org.locations[0].city + ", " + org.locations[0].state);

	switch (viewport) {
		case Cypress.env('mobile'):
			cy.getElementByTestId('search-bar-search-by-location-button').click({force:true});
			break;
		default:
			cy.getElementByTestId('search-bar-item-suggestion').then(($element) => {
				cy.wrap($element[0]).click();
			});
			cy.getElementByTestId('search-bar-search-button').click();
			break;
	}
	cy.getElementByTestId('favorites-list-item').should('be.visible');
	cy.getElementByTestId('search-result-favorite-button').then(($element) => {
		expect($element).to.be.visible;
		expect($element).to.have.attr('data-name', 'Layer 1');
	});
	cy.getElementByTestId('favorites-list-item').then(($element) => {
		expect($element).to.be.visible;
		cy.wrap($element[0]).click();

		switch (viewport) {
			case Cypress.env('mobile'):
				cy.getElementByTestId('back-button').should('be.visible');
				cy.getElementByTestId('badge').should('be.visible');
				break;
			default:
				cy.getElementByTestId('back-button').then(($element) => {
					expect($element).to.be.visible;
					expect($element.children()).contain('Back to Search Results');
				});
				break;
		}

		cy.getElementByTestId('tabs-value-about').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('type', 'button');
			expect($element.children()).contain('About');
		});
		cy.getElementByTestId('tabs-value-visit').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('type', 'button');
		});

		cy.getElementByTestId('tabs-value-reviews').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('type', 'button');
			expect($element.children()).contain('Reviews');
		});

		cy.getElementByTestId('search-result-favorite-button').should('be.visible');
		cy.scrollTo('top');
		cy.getElementByTestId('resource-details-share').then(($element) => {
			expect($element).to.be.visible;
		});
		switch (viewport) {
			case Cypress.env('mobile'):
				//do Nothing
				break;
			case Cypress.env('tablet'):
				cy.getElementByTestId('resource-details-reviews').then(($element) => {
					expect($element).to.be.visible;
					expect($element).contain('Reviews');
				});
				break;
			default:
				cy.getElementByTestId('resource-star-rating').should('be.visible');
				cy.getElementByTestId('resource-details-reviews').then(($element) => {
					expect($element).to.be.visible;
					expect($element).contain('Reviews');
				});
				break;
		}
		cy.getElementByTestId('details-about').should('to.be.visible');
	});

	cy.getElementByTestId('resource-details-services').then(($element) => {
		expect($element).to.be.visible;
		expect($element).contain('Services');
	});

	cy.getElementByTestId('resource-details-services').then(($element) => {
		expect($element).to.be.visible;
		expect($element).contain('Services');
	});
	cy.getElementByTestId('resource-details-visit').then(($element) => {
		expect($element).to.be.visible;
		expect($element).contain('Visit');
	});

	cy.getElementByTestId('badge').then(($element) => {
		expect($element).to.be.visible;
	});
});