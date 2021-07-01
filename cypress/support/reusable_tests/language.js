Cypress.Commands.add('testLanguageAction',(viewport)=>{
    cy.viewport(viewport);
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-language').then($element=>{
            expect($element).to.have.attr('type','button');
            expect($element.children()).contain('Language');
            cy.wrap($element).click();
            cy.getElementByTestId('nav-button-language-item').then($element=>{
                //Ensure it is French
                expect($element[2]).contain("Français");
                cy.wrap($element[2]).click();
            });
            cy.wait(3000);
            cy.location().should(loc => {
                expect(loc.href).to.be.eq('http://localhost:3000/#googtrans(fr)');
                expect(loc.hostname).to.be.eq('localhost');
            });
            testMobile();
        });
    }else{
    let index = viewport === Cypress.env('desktop') ? 0 : 1;
    cy.getElementByTestId('nav-button-language').then($element=>{
        expect($element.children()).contain('English');
        cy.wrap($element[index]).click();
        cy.getElementByTestId('nav-button-language-item').then($element=>{
            //Ensure it is French
            expect($element[2]).contain("Français");
            cy.wrap($element[2]).click();
        });
        cy.location().should(loc => {
            expect(loc.href).to.be.eq('http://localhost:3000/#googtrans(fr)');
        });
        cy.getElementByTestId('search-page-next-button').click();
        cy.wait(3000);
        viewport === Cypress.env('desktop') ? testDesktop() : testTablet();
        });
    };
});


function testDesktop(){
    //Test Nav Bar Translations
    cy.getElementByTestId('nav-button-about').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://asylumconnect.org/mission/');
        expect($element.children()).contain("À propos de nous");
    });
                
    cy.getElementByTestId('nav-button-take-action').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://asylumconnect.org/donate/');
        expect($element.children()).contain("Passer à l'action");
    });

    cy.getElementByTestId('nav-button-get-help').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://asylumconnect.org/faqs/');
        expect($element.children()).contain("Obtenir de l'aide");
    });

    cy.getElementByTestId('nav-button-contact').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://asylumconnect.org/contact/');
        expect($element.children()).contain("Nous contacter");
    });

    cy.getElementByTestId('nav-button-safety-exit').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','https://www.google.com/');
        expect($element.children()).contain("Sortie de sécurité");
    });
}

function testTablet(){
    cy.getElementByTestId('back-button').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Choisissez un autre pays');
    });
    cy.getElementByTestId('search-form-body-2').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Recherchez des services vérifiés adaptés aux LGBTQ et aux immigrants près de chez vous');
    });
    cy.getElementByTestId('search-bar-search-button').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Rechercher');
    });
    
}

function testMobile(){
    cy.getElementByTestId('mobile-nav-button-search').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element.children()).contain("Rechercher");
       
    });
    
    cy.getElementByTestId('mobile-nav-button-favorites').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element.children()).contain("Favoris");
        
    });
   
    cy.getElementByTestId('mobile-nav-button-language').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element.children()).contain("Langue");
    });

    cy.getElementByTestId('mobile-nav-button-account').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element.children()).contain("Compte");
       
    });
    
    cy.getElementByTestId('mobile-nav-button-more').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element.children()).contain("Suite");
    });
}