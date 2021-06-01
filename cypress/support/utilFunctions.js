//Importing the Fixtures
import * as user_regular from '../fixtures/sign_up_user_regular.json';
import * as user_attorney from '../fixtures/sign_up_user_attorney.json';
import * as user_service_provider from '../fixtures/sign_up_user_service_provider.json';
import * as organization from '../fixtures/organization.json';

Cypress.Commands.add('getVariables',(context)=>{
    // eslint-disable-next-line default-case

    let variables={};
    // eslint-disable-next-line default-case
    switch(context){
        case Cypress.env('contextCreateAccount'):
             variables =  {
                myself:{
                    user:user_regular,
                    dialog_container_button:'dialog-container-sign-up-help-myself-button',
                    email_content:'Email',
                    organization:organization
                },
                lawyer:{
                    user:user_attorney,
                    dialog_container_button:'dialog-container-sign-up-attorney-button',
                    email_content:'Firm, Organization or School Email',
                    organization:organization
                },
                service_provider:{
                    user:user_service_provider,
                    dialog_container_button:'dialog-container-sign-up-non-legal-service-provider-button',
                    email_content:'Organization Email',
                    organization:organization
                }  
            };
           break;
    };
    return cy.wrap(variables);
});