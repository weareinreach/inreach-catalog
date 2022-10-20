Cypress.Commands.add('testSearchDetailPageAbout', (viewport, user, org) => {
	cy.viewport(viewport);
	cy.login(user, viewport);
	cy.searchOrganizationsByCityName(viewport, org.locations[0].city);
	cy.getElementByTestId('favorites-list-item').then(($element) => {
		expect($element).to.be.visible;
		cy.intercept('/v1/slug/organizations/*').as('clickedOrg');
		//click the org
		// cy.wrap($element[0]).click();
		cy.contains(org.name).click();
		cy.wait('@clickedOrg');
		cy.getElementByTestId('details-about').then(($element) => {
			expect($element).to.be.visible;
			expect($element).contain(org.description);
		});
		cy.getElementByTestId('details-header').then(($element) => {
			expect($element).to.be.visible;
			expect($element).contain(org.name);
		});
		cy.getElementByTestId('details-header-verified-icon').then(($element) => {
			expect($element).to.be.visible;
			expect($element).to.have.attr('width', '24');
			expect($element).to.have.attr('height', '24');
			expect($element).to.have.attr('version', '1.1');
		});
		cy.getElementByTestId('details-header-verified-text').then(($element) => {
			expect($element).to.be.visible;
			expect($element).contain('Verified Information');
		});
	});
});

Cypress.Commands.add('testSearchDetailsPageService', (viewport, user, org) => {
	cy.viewport(viewport);
	cy.login(user, viewport);
	cy.searchOrganizationsByCityName(viewport, org.locations[0].city);
	cy.intercept('/v1/slug/organizations/*').as('clickedOrg');

	cy.getElementByTestId('favorites-list-item').then(($element) => {
		expect($element).to.be.visible;
		//click the org
		cy.wrap($element[0]).click();
		cy.wait('@clickedOrg');

		cy.getElementByTestId('resource-details-services');
		cy.getElementByTestId('details-service-item').then(($element) => {
			expect($element[0]).to.be.visible;
			cy.wrap($element[0]).then(($child) => {
				cy.wrap($child.children()).click();
				//Test services details page
				cy.getElementByTestId('resource-details-communities').then(
					($element) => {
						expect($element).to.be.visible;
						expect($element).contain('Who this service helps');
					}
				);
				cy.getElementByTestId('resource-list').then(($element) => {
					expect($element).to.be.visible;
				});
				cy.getElementByTestId('resource-details-language-services').then(
					($element) => {
						expect($element).to.be.visible;
						expect($element).contain('Language Services');
					}
				);
			});
		});
	});
});

Cypress.Commands.add('testSearchDetailsPageReviews', (viewport, user, org) => {
	cy.viewport(viewport);
	cy.login(user, viewport);
	cy.searchOrganizationsByCityName(viewport, org.locations[0].city);
	cy.intercept('/v1/slug/organizations/*').as('clickedOrg');

	cy.getElementByTestId('favorites-list-item').then(($element) => {
		expect($element).to.be.visible;
		//click the org
		cy.wrap($element[0]).click();
		cy.wait('@clickedOrg');
		cy.getElementByTestId('tabs-value-reviews').click();

		cy.getElementByTestId('details-review-form-header').then(($element) => {
			expect($element).to.be.visible;
			expect($element).contain('Rate this resource');
		});

		switch (viewport) {
			case Cypress.env('mobile'):
				//do Nothing
				break;
			default:
				cy.getElementByTestId('details-review-form-body1')
					.scrollIntoView()
					.then(($element) => {
						expect($element).to.be.visible;
						expect($element).contain(
							'Is this resource LGBTQ-friendly? Is this resource friendly to asylum seekers? InReach will update our resource app based on your review.'
						);
					});
				break;
		}
		cy.getElementByTestId('details-review-form-input')
			.scrollIntoView()
			.then(($element) => {
				expect($element).to.be.visible;
				expect($element).to.have.attr('name', 'comment');
				expect($element).to.have.attr(
					'placeholder',
					'Start typing your review...'
				);
			});
	});
});

Cypress.Commands.add(
	'testSearchDetailsPageReviewsAction',
	(viewport, user, org) => {
		cy.viewport(viewport);
		cy.login(user, viewport);
		cy.searchOrganizationsByCityName(viewport, org.locations[0].city);
		cy.intercept('/v1/slug/organizations/*').as('clickedOrg');
		cy.getElementByTestId('favorites-list-item').then(($element) => {
			expect($element).to.be.visible;
			//click the org
			cy.wrap($element[0]).click();
			cy.wait('@clickedOrg');
			cy.getElementByTestId('tabs-value-reviews').click();
			cy.getElementByTestId('details-review-form-input').type(
				'This a great resource! I recommend it'
			);
			cy.getElementByTestId('details-review-form-submit-button').click();
			//Reload Page
			cy.reload();
			//Check that review is posted
			switch (viewport) {
				case Cypress.env('mobile'):
					cy.getElementByTestId('tabs-value-reviews').click();
					break;
				default:
					//Do Nothing
					break;
			}
			cy.getElementByTestId('review-list-title').then(($element) => {
				expect($element).to.be.visible;
				expect($element).contain('Reviews');
			});
			cy.getElementByTestId('review-list-comment').then(($element) => {
				expect($element).to.be.visible;
				expect($element).contain('This a great resource! I recommend it');
			});
		});
	}
);
