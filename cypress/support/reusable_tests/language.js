Cypress.Commands.add('testLanguageAction',(viewport)=>{
    cy.viewport(viewport);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-language').then($element=>{
            expect($element).to.have.attr('type','button');
            expect($element.children()).contain('Language');
            cy.wrap($element).click();
            cy.getElementByTestId('nav-button-language-item').then($element=>{
                cy.wrap($element[2]).click();
            });
            cy.wait(1000);
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('http://localhost:3000/#googtrans(fr)');
                expect(loc.hostname).to.be.eq('localhost');
            });
            cy.getElementByTestId('search-form-body-2').then($element=>{
                expect($element).to.be.visible;
               // expect($element).contain('Recherchez des services vérifiés adaptés aux LGBTQ et aux immigrants près de chez vous');
            });
            cy.getElementByTestId('search-page-next-button').then($element=>{
                expect($element).to.be.visible;
                expect($element.children()).contain('Suivant');
            })
        });
    }else{
    let index = viewport === Cypress.env('desktop') ? 0 : 1;
    cy.getElementByTestId('nav-button-language').then($element=>{
        expect($element.children()).contain('English');
        cy.wrap($element[index]).click();
        cy.getElementByTestId('nav-button-language-item').then($element=>{
            cy.wrap($element[2]).click();
        });
        cy.getElementByTestId('search-page-next-button').click();
        cy.location().should(loc => {
            expect(loc.href).to.be.eq('http://localhost:3000/#googtrans(fr)');
            expect(loc.hostname).to.be.eq('localhost');
        });
        cy.wait(1000);
        cy.getElementByTestId('search-form-body').then($element=>{
            expect($element).to.be.visible;
            //expect($element).contain('Bienvenue dans le catalogue AsylumConnect des États-Unis!');
        });
        cy.getElementByTestId('search-form-body-2').then($element=>{
            expect($element).to.be.visible;
            //expect($element).contain('Recherchez des services vérifiés adaptés aux LGBTQ et aux immigrants près de chez vous');
        });
        cy.getElementByTestId('search-bar-search-button').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain('Rechercher');
        });
        cy.getElementByTestId('search-form-download-link').then($element=>{
            expect($element).to.be.visible;
            expect($element.children()).contain("Téléchargez les guides juridiques sur l'asile LGBTQ aux États-Unis");
        })

    });
    };
});