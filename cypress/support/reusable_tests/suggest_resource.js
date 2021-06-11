/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
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

cy.scrollTo('bottom',{duration:50});

cy.getElementByTestId('suggest-page-website').then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).contain('Websites:');
});

cy.getElementByTestId('suggest-page-phone-number').then($element =>{
    expect($element).to.be.visible;
});

cy.getElementByTestId('suggest-page-email').then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).contain('Email:');
});

cy.getElementByTestId('suggest-page-hour').then($element=>{
    expect($element).to.be.visible;
    expect($element.children()).contain('Hour');
    cy.wrap($element).click();
    //Elements under Hour
    cy.getElementByTestId('suggest-page-hour-monday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Monday');
          expect($child.children()).to.have.attr('value','monday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-monday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','monday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-monday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','monday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-tuesday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Tuesday');
          expect($child.children()).to.have.attr('value','tuesday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-tuesday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','tuesday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-tuesday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','tuesday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-wednesday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Wednesday');
          expect($child.children()).to.have.attr('value','wednesday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-wednesday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','wednesday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-wednesday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','wednesday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-thursday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Thursday');
          expect($child.children()).to.have.attr('value','thursday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-thursday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','thursday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-thursday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','thursday_end');
        });
    });
    //scroll down
    if (viewport === Cypress.env('mobile')){
        cy.scrollTo('bottom',{duration:5});
    }
    cy.getElementByTestId('suggest-page-hour-friday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Friday');
          expect($child.children()).to.have.attr('value','friday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-friday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','friday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-friday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','friday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-saturday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Saturday');
          expect($child.children()).to.have.attr('value','saturday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-saturday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','saturday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-saturday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','saturday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-sunday').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Sunday');
          expect($child.children()).to.have.attr('value','sunday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-sunday-start').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','sunday_start');
        });
       
    });

    cy.getElementByTestId('suggest-page-hour-sunday-end').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','sunday_end');
        });
    });
    //scroll up and close
    cy.scrollTo('top',{duration:50});

    cy.wrap($element).click();
});


});