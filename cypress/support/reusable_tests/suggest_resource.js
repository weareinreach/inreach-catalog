/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
Cypress.Commands.add('testSuggestionElements',(viewport,org)=>{
cy.viewport(viewport);

//Navigate to suggestion
if(viewport === Cypress.env('mobile')){
    cy.getElementByTestId('mobile-nav-button-more').click();
    cy.getElementByTestId('resource-details-more-suggest-a-resource').click({force:true,multiple:true});
    cy.getElementByTestId('more-suggest-a-resource-us').click();
}else{
    cy.scrollTo('bottom');
    cy.getElementByTestId('footer-suggest-new').click();
}

cy.getElementByTestId('suggest-page-title').then($element=>{
    expect($element).to.be.visible;
    expect($element).contain('Suggest a Resource');
});

cy.getElementByTestId('suggest-page-body').then($element=>{
    expect($element).to.be.visible;
});

cy.getElementByTestId('sign-up-form-find-organization').then($element=>{
    expect($element).to.be.visible;
    cy.wrap($element).type(org.name).then(()=>{
        //wait for to populate
        cy.wait(2000);
        //select first
        cy.getElementByTestId('sign-up-form-searched-organization').then($elements=>{
            cy.wrap($elements[0]).click();
        });
        cy.getElementByTestId('suggest-page-body-2').then($element=>{
            expect($element).to.be.visible;
            // expect($element).contain(`Thank you for your interest in contributing to the AsylumConnect resource catalog! It seems we already have ${org.name} on the catalog. You can join this organization by signing up for a provider account here.`);
            expect($element).contain(`Thank you for your interest in contributing to the AsylumConnect resource catalog! It seems we already have`);
        });
    });
   
});


cy.getElementByTestId('suggest-page-address').then($element=>{
    expect($element).to.be.visible;
    expect($element).contain('Address:');
});
cy.getElementByTestId('suggest-page-address-input').then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).to.have.attr('placeholder','Start typing city, county or state in the US…')
});

cy.getElementByTestId('suggest-page-about').then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).contain('About:');
});

cy.getElementByTestId('suggest-page-services').then($element =>{
    expect($element).to.be.visible;
});

cy.getElementByTestId('suggest-page-website').scrollIntoView().then($element =>{
    expect($element).to.be.visible;
    expect($element.children()).contain('Website:');
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
    expect($element.children()).contain('Schedule');
    cy.wrap($element).click();
    //Elements under Schedule
    cy.getElementByTestId('suggest-page-hour-monday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Monday');
          expect($child.children()).to.have.attr('value','monday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-monday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','monday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-monday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','monday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-tuesday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Tuesday');
          expect($child.children()).to.have.attr('value','tuesday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-tuesday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','tuesday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-tuesday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','tuesday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-wednesday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Wednesday');
          expect($child.children()).to.have.attr('value','wednesday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-wednesday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','wednesday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-wednesday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','wednesday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-thursday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Thursday');
          expect($child.children()).to.have.attr('value','thursday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-thursday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','thursday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-thursday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','thursday_end');
        });
    });
    
    cy.getElementByTestId('suggest-page-hour-friday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Friday');
          expect($child.children()).to.have.attr('value','friday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-friday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','friday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-friday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','friday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-saturday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Saturday');
          expect($child.children()).to.have.attr('value','saturday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-saturday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','saturday_start');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-saturday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','saturday_end');
        });
    });

    cy.getElementByTestId('suggest-page-hour-sunday').scrollIntoView().then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','checkbox');
           expect($child.children()).to.have.attr('name','Sunday');
          expect($child.children()).to.have.attr('value','sunday');
        });
       
    });
    cy.getElementByTestId('suggest-page-hour-sunday-start').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','sunday_start');
        });
       
    });

    cy.getElementByTestId('suggest-page-hour-sunday-end').then($element=>{
        cy.wrap($element.children()[0]).then($child=>{
            expect($child.children()).to.have.attr('type','time');
            expect($child.children()).to.have.attr('name','sunday_end');
        });
    });
    //scroll up and close
    cy.wrap($element).scrollIntoView().click();
});

//scroll to bottom
cy.scrollTo('bottom');

//Feature
cy.getElementByTestId('suggest-page-feature').then($element=>{
    expect($element).to.be.visible;
    expect($element.children()).contain('Feature');
});

cy.getElementByTestId('suggest-page-feature-checkbox-options').then($element=>{
    cy.wrap($element[0]).then($child=>{
        cy.wrap($child.children()).then($secondChild=>{
              expect($secondChild.children()[0]).to.have.attr('type','checkbox');
              expect($secondChild.children()[0]).to.have.attr('name','Has a confidentiality policy');
              expect($secondChild.children()[0]).to.have.attr('value','has-confidentiality-policy');
        });
    });
    cy.wrap($element[1]).then($child=>{
        cy.wrap($child.children()).then($secondChild=>{
            expect($secondChild.children()[0]).to.have.attr('type','checkbox');
            expect($secondChild.children()[0]).to.have.attr('name','Free of cost');
            expect($secondChild.children()[0]).to.have.attr('value','cost-free');
         });
    });
    });

    //Requirement
    cy.getElementByTestId('suggest-page-requirement').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).contain('Requirement');
    });

    cy.getElementByTestId('suggest-page-requirement-checkbox-options').then($element=>{
        cy.wrap($element[0]).then($child=>{
            cy.wrap($child.children()).then($secondChild=>{
                  expect($secondChild.children()[0]).to.have.attr('type','checkbox');
                  expect($secondChild.children()[0]).to.have.attr('name','A photo ID');
                  expect($secondChild.children()[0]).to.have.attr('value','req-photo-id');
            });
        });
        cy.wrap($element[1]).then($child=>{
            cy.wrap($child.children()).then($secondChild=>{
                expect($secondChild.children()[0]).to.have.attr('type','checkbox');
                expect($secondChild.children()[0]).to.have.attr('name','Proof of income');
                expect($secondChild.children()[0]).to.have.attr('value','req-proof-of-income');
             });
        });
        cy.wrap($element[2]).then($child=>{
            cy.wrap($child.children()).then($secondChild=>{
                  expect($secondChild.children()[0]).to.have.attr('type','checkbox');
                  expect($secondChild.children()[0]).to.have.attr('name','Proof of age');
                  expect($secondChild.children()[0]).to.have.attr('value','req-proof-of-age');
            });
        });
        cy.wrap($element[3]).then($child=>{
            cy.wrap($child.children()).then($secondChild=>{
                  expect($secondChild.children()[0]).to.have.attr('type','checkbox');
                  expect($secondChild.children()[0]).to.have.attr('name','Medical insurance');
                  expect($secondChild.children()[0]).to.have.attr('value','req-medical-insurance');
            });
        });
        cy.wrap($element[4]).then($child=>{
            cy.wrap($child.children()).then($secondChild=>{
                expect($secondChild.children()[0]).to.have.attr('type','checkbox');
                expect($secondChild.children()[0]).to.have.attr('name','Proof of residence');
                expect($secondChild.children()[0]).to.have.attr('value','req-proof-of-residence');
             });
        });
        cy.wrap($element[5]).then($child=>{
            cy.wrap($child.children()).then($secondChild=>{
                expect($secondChild.children()[0]).to.have.attr('type','checkbox');
                expect($secondChild.children()[0]).to.have.attr('name','A referral');
                expect($secondChild.children()[0]).to.have.attr('value','req-referral');
             });
        });
        
    });

    cy.getElementByTestId('suggest-page-suggest-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','submit');
        expect($element.children()).contain('Suggest New Resource');
    });

    cy.getElementByTestId('suggest-page-footer').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('All organization changes are subject to review by AsylumConnect before publication.');
    });

});


Cypress.Commands.add('testSuggestionAction',(viewport,user,org)=>{
    cy.login(user);
    cy.viewport(viewport);
    cy.wait(1000);
    //Navigate to suggestion
    if(viewport === Cypress.env('mobile')){
        cy.getElementByTestId('mobile-nav-button-more').click();
        cy.getElementByTestId('resource-details-more-suggest-a-resource').click({force:true,multiple:true});
        cy.getElementByTestId('more-suggest-a-resource-us').click();
    }else{
        cy.scrollTo('bottom');
        cy.getElementByTestId('footer-suggest-new').click();
    }

    cy.getElementByTestId('sign-up-form-find-organization').type(org.name);
    //wait for to populate
    cy.wait(2000);
    //select first
    cy.getElementByTestId('sign-up-form-no-organization').click();
    
    //AUTOMATION BUG - About input cannot be populated - 155
    // cy.getElementByTestId('suggest-page-about').type(org.description, {force: true});
    // cy.getElementByTestId('suggest-page-services').type("English", {force: true});
    // cy.getElementByTestId('suggest-searched-language').then($element=>{
    //     cy.wrap($element[0]).click({force:true});
    // });
    //AUTOMATION BUG - Website input cannot be populated - 155
    // cy.getElementByTestId('suggest-page-website').scrollIntoView().type(org.website, {force: true});
    // cy.getElementByTestId('suggest-page-phone-number').clear().type(org.phone);
    // cy.getElementByTestId('suggest-page-email').type(org.emails[0].email);

    //hours
    cy.getElementByTestId('suggest-page-hour').click();
    cy.wait(500);

    cy.getElementByTestId('suggest-page-hour-monday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-monday-start').type('08:00');
    cy.getElementByTestId('suggest-page-hour-monday-end').type('16:00');

    cy.getElementByTestId('suggest-page-hour-tuesday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-tuesday-start').type('08:00');
    cy.getElementByTestId('suggest-page-hour-tuesday-end').type('16:00');

    cy.getElementByTestId('suggest-page-hour-wednesday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-wednesday-start').type('08:00');
    cy.getElementByTestId('suggest-page-hour-wednesday-end').type('16:00');

    cy.getElementByTestId('suggest-page-hour-thursday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-thursday-start').type('08:00');
    cy.getElementByTestId('suggest-page-hour-thursday-end').type('16:00');

    cy.getElementByTestId('suggest-page-hour-friday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-friday-start').type('08:00');
    cy.getElementByTestId('suggest-page-hour-friday-end').type('15:00');

    cy.getElementByTestId('suggest-page-hour-saturday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-saturday-start').type('09:00');
    cy.getElementByTestId('suggest-page-hour-saturday-end').type('13:00');

    cy.getElementByTestId('suggest-page-hour-sunday').scrollIntoView().click();
    cy.getElementByTestId('suggest-page-hour-sunday-start').type('10:00');
    cy.getElementByTestId('suggest-page-hour-sunday-end').type('13:00');

    //close
    cy.getElementByTestId('suggest-page-hour').scrollIntoView().click();

    //Feature
    cy.getElementByTestId('suggest-page-feature-checkbox-options').then($element=>{
        cy.wrap($element[0]).then($child=>{
            cy.wrap($child.children()[0]).click();
        });
        cy.wrap($element[1]).then($child=>{
            cy.wrap($child.children()[0]).click();
        });
    });

    //Requirement    
    cy.getElementByTestId('suggest-page-requirement-checkbox-options').then($element=>{
        cy.wrap($element[0]).then($child=>{
            cy.wrap($child.children()[0]).click();
        });
        cy.wrap($element[2]).then($child=>{
            cy.wrap($child.children()[0]).click();
        });
        cy.wrap($element[5]).then($child=>{
            cy.wrap($child.children()[0]).click();
        });
    });

    cy.getElementByTestId('suggest-page-suggest-button').click();

});