Cypress.Commands.add('testSearchDetailPageAbout',(viewport,user,org)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    if(viewport === Cypress.env('mobile')){ 
        cy.getElementByTestId('mobile-nav-button-search').click() 
    }
    cy.getElementByTestId('search-page-next-button').click();
    cy.getElementByTestId('search-page-checkbox').click();
    cy.waitFor(1000);
    cy.getElementByTestId('search-bar-input').type(org.locations[0].city);
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    });
    if (viewport !== Cypress.env('mobile')) {
		cy.getElementByTestId('search-bar-search-button').click();
	} else {
        cy.getElementByTestId('search-bar-search-by-location-button').click();
    }
    cy.wait(500);
    
    cy.getElementByTestId('favorites-list-item').then($element=>{
        expect($element).to.be.visible;
        //click the org
        cy.wrap($element[0]).click();
        cy.wait(200);
        cy.getElementByTestId('details-about').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain(org.description);
        });
        cy.getElementByTestId('details-header').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain(org.name);
        });
        cy.getElementByTestId('details-header-verified-icon').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.have.attr('width','24');
            expect($element).to.have.attr('height','24');
            expect($element).to.have.attr('version','1.1');
            
        });
        cy.getElementByTestId('details-header-verified-text').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Verified Information');
        });        
        
    });

});

// THIS IS WHERE I STAYED, WILL Add more info to this org details so i can test everything. create a separate org just for this

Cypress.Commands.add('testSearchDetailsPageService',(viewport,user,org)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    if(viewport === Cypress.env('mobile')){ 
        cy.getElementByTestId('mobile-nav-button-search').click() 
    }
    cy.getElementByTestId('search-page-next-button').click();
    cy.waitFor(1000);
    cy.getElementByTestId('search-page-checkbox').click();
    cy.getElementByTestId('search-bar-input').type(org.locations[0].city);
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    });
    if (viewport !== Cypress.env('mobile')) {
		cy.getElementByTestId('search-bar-search-button').click();
	} else {
        cy.getElementByTestId('search-bar-search-by-location-button').click();
    }
    cy.wait(500);
    
    cy.getElementByTestId('favorites-list-item').scrollIntoView().then($element=>{
        expect($element).to.be.visible;
        //click the org
        cy.wrap($element).click();
    cy.getElementByTestId('resource-details-services');
        cy.getElementByTestId('details-service-item').then($element=>{
            expect($element[0]).to.be.visible;
            cy.wrap($element[0]).then($child=>{
                cy.wrap($child.children()).click();
            //Test services details page
            cy.getElementByTestId('resource-details-communities').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Who this service helps');
            });
            cy.getElementByTestId('resource-list').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('resource-details-language-services').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Language Services');
            });
        });
        });
    });
});

Cypress.Commands.add('testSearchDetailsPageReviews',(viewport,user,org)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    if(viewport === Cypress.env('mobile')){ 
        cy.getElementByTestId('mobile-nav-button-search').click() 
    }
    cy.getElementByTestId('search-page-next-button').click();
    cy.waitFor(1000);
    cy.getElementByTestId('search-page-checkbox').click();
    cy.getElementByTestId('search-bar-input').type(org.locations[0].city);
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    });
    if (viewport !== Cypress.env('mobile')) {
		cy.getElementByTestId('search-bar-search-button').click({force: true});
	} else {
        cy.getElementByTestId('search-bar-search-by-location-button').click();
    }
    cy.wait(500);
    
    cy.getElementByTestId('favorites-list-item').then($element=>{
        expect($element).to.be.visible;
        //click the org
        cy.wrap($element).click();
        cy.wait(200);
    cy.getElementByTestId('tabs-value-reviews').click();

        cy.getElementByTestId('details-review-form-header').scrollIntoView().then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Rate this resource');
        });

        

        if(viewport !== Cypress.env('mobile')){
            cy.getElementByTestId('details-review-form-body1').scrollIntoView().then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Is this resource LGBTQ-friendly? Is this resource friendly to asylum seekers? InReach will update our resource catalog based on your review.');
            });
        }
        cy.getElementByTestId('details-review-form-input').scrollIntoView().then($element=>{
            expect($element).to.be.visible;
            expect($element).to.have.attr('name','comment');
            expect($element).to.have.attr('placeholder','Start typing your review...');
        });
    });
});


Cypress.Commands.add('testSearchDetailsPageReviewsAction',(viewport,user,org)=>{
    cy.viewport(viewport);
    cy.login(user,viewport);
    if(viewport === Cypress.env('mobile')){ 
        cy.getElementByTestId('mobile-nav-button-search').click(); 
    }
    cy.getElementByTestId('search-page-next-button').click();
    cy.waitFor(1000);
    cy.getElementByTestId('search-bar-input').type(org.locations[0].city);
    cy.getElementByTestId('search-page-checkbox').click();
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    });
    if (viewport !== Cypress.env('mobile')) {
		cy.getElementByTestId('search-bar-search-button').click();
	} else {
        cy.getElementByTestId('search-bar-search-by-location-button').click();
    }
    cy.wait(500);
    
    cy.getElementByTestId('favorites-list-item').then($element=>{
        expect($element).to.be.visible;
        //click the org
        cy.wrap($element).click();
        cy.wait(200);
    cy.getElementByTestId('tabs-value-reviews').click();
    cy.getElementByTestId('details-review-form-input').type('This a great resource! I recommend it');
    cy.getElementByTestId('details-review-form-submit-button').click();
    //Reload Page
    cy.reload();
    //Check that review is posted
    if(viewport===Cypress.env('mobile')){
        cy.getElementByTestId('tabs-value-reviews').click();
    }
    cy.getElementByTestId('review-list-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Reviews");
    })
    cy.getElementByTestId('review-list-comment').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('This a great resource! I recommend it');
    })

    });
});