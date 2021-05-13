/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Suite of Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('new_user');
    });
    afterEach(() => {
		//Do the clean up
		cy.deleteUsersIfExist();
	});

    //Root
    it('Root Test - Visual', () => {
        cy.root().should('match', 'html');
    });

    //Login Form
    //Desktop
    context('Desktop Version of the application',()=>{
        it('Login Form Components',()=>{
            cy.getElementByTestId('nav-account-sign-in').then($element =>{
                expect($element).to.be.visible;
                //click
                cy.wrap($element).click();
                cy.getElementByTestId('log-in-dialog-container').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-title').then($element=>{
                    expect($element).contain("Log In");
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('log-in-dialog-container-login-form').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-email-input').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).contain("Email");
                });
                cy.getElementByTestId('log-in-dialog-container-password-input').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).contain("Password");
                });
                cy.getElementByTestId('log-in-dialog-container-privacy').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.have.attr('href','https://asylumconnect.org/privacy');
                    expect($element).contain("Privacy Policy");
                    expect($element).to.have.attr('target','_blank');
                    expect($element).to.have.attr('rel','noopener noreferrer');
                });
                cy.getElementByTestId('log-in-dialog-container-terms-of-use').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.have.attr('href','https://asylumconnect.org/terms-of-use');
                    expect($element).contain("Terms of Use");
                    expect($element).to.have.attr('target','_blank');
                    expect($element).to.have.attr('rel','noopener noreferrer');
                });
                cy.getElementByTestId('log-in-dialog-container-sign-in-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).to.have.attr('type','submit');
                    expect($element.children()).contain("Sign In");
                });
                cy.getElementByTestId('log-in-dialog-container-forgot-password').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain("Forgot Password?");
                });
                cy.getElementByTestId('log-in-dialog-container-no-acount').then($element=>{
                    expect($element).to.be.visible;
                    expect($element.children()).contain("Don't have an account?");
                });

        });
    });

        it.only('Login And Log Out Actions',()=>{
            cy.getElementByTestId('nav-account-sign-in').then($element =>{
                //click
                cy.wrap($element).click();
                
                //Create User
                cy.get('@new_user').then(user =>{
                    cy.addUser(user).then(addedUserResponse =>{
                        cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
                        cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
                        cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
                        //Logeed In
                        cy.getElementByTestId('nav-account-account-settings').then($element =>{
                            expect($element).to.be.visible;
                            expect($element).to.have.attr('href','/en_US/account');
                            expect($element.children()).contain("Account Settings");
                        });
                        cy.getElementByTestId('nav-account-sign-out').then($element =>{
                            expect($element).to.be.visible;
                            expect($element).to.have.attr('href','/');
                            expect($element.children()).contain("Sign Out");
                        });
                        //Logged Out
                        cy.getElementByTestId('nav-account-sign-out').click();
                        cy.getElementByTestId('nav-account-sign-in').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Sign In");
                        });
                        cy.getElementByTestId('nav-account-sign-up').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Sign Up");
                        });
                    });
                });


            });
        });
    });

});