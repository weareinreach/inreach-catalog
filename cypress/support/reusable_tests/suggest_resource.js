Cypress.Commands.add('testSuggestionElements',(viewport)=>{
cy.viewport(viewport);
//Navigate to suggestion
if(viewport === Cypress.env('mobile')){
    cy.getElementByTestId('mobile-nav-button-more').click();
    cy.getElementByTestId('more-suggest-a-resource').click({force:true,multiple:true});
    cy.getElementByTestId('more-suggest-a-resource-us').click();
}else{
    cy.scrollTo('bottom');
    cy.getElementByTestId('footer-suggest-new').click();
}

cy.getElementByTestId('suggest-page-title').then($element=>{
    expect($element).to.be.visible;
    expect($element).contain('Suggest New Resource');
});

cy.getElementByTestId('suggest-page-body').then($element=>{
    expect($element).to.be.visible;
});

cy.getElementByTestId('sign-up-form-find-organization').then($element=>{
    expect($element).to.be.visible;
});

cy.getElementByTestId('suggest-page-address').then($element=>{
    expect($element).to.be.visible;
    expect($element).contain('Address:')
});
cy.getElementByTestId('suggest-page-address-input').then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).to.have.attr('placeholder','Start typing county, city or state in the US…')
});

cy.getElementByTestId('suggest-page-about').then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).contain('About:');
});

cy.getElementByTestId('suggest-page-services').then($element =>{
    expect($element).to.be.visible;
});

if (viewport === Cypress.env('mobile')){
    cy.scrollTo('bottom',{duration:100});
}

cy.getElementByTestId('suggest-page-website').then($element =>{
    expect($element).to.be.visible;
});


});