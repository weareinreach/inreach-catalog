/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Tests', () => {
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
    context('Desktop Version of the application', () => {
        it('Login Form Components', () => {
            cy.getElementByTestId('nav-account-sign-in').then($element => {
                expect($element).to.be.visible;
                //click
                cy.wrap($element).click();
                cy.getElementByTestId('log-in-dialog-container').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-title').then($element => {
                    expect($element).contain("Log In");
                    expect($element).to.be.visible;
                });
                cy.testLoginFromComponents();
            
            });
        });

        it('Login And Log Out Actions', () => {
            cy.getElementByTestId('nav-account-sign-in').then($element => {
                //click
                cy.wrap($element).click();

                //Create User
                cy.get('@new_user').then(user => {
                    cy.addUser(user).then(addedUserResponse => {
                        
                        cy.logInAndLogOutAction(user);
                        //Logged Out
                        cy.getElementByTestId('nav-account-sign-out').click();
                        cy.getElementByTestId('nav-account-sign-in').then($element => {
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Sign In");
                        });
                        cy.getElementByTestId('nav-account-sign-up').then($element => {
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Sign Up");
                        });
                    });
                });


            });
        });
    });

    context('Tablet Version of the application', () => {
        it('Login Form Components', () => {
            cy.viewport('ipad-2');
            cy.getElementByTestId('nav-account-sign-in').then($element => {
                expect($element).to.be.visible;
                //click
                cy.wrap($element).click({force:true});
                cy.getElementByTestId('log-in-dialog-container').should('be.visible');
                cy.getElementByTestId('log-in-dialog-container-title').then($element => {
                    expect($element).contain("Log In");
                    expect($element).to.be.visible;
                });
                cy.testLoginFromComponents();
            });
        });

        it('Login And Log Out Actions', () => {
            cy.viewport('ipad-2');
            cy.getElementByTestId('nav-account-sign-in').then($element => {
                //click
                cy.wrap($element).click({force:true});

                //Create User
                cy.get('@new_user').then(user => {
                    cy.addUser(user).then(addedUserResponse => {
                        cy.logInAndLogOutAction(user);
                        //Logged Out
                        cy.getElementByTestId('nav-account-sign-out').click();
                        cy.getElementByTestId('nav-account-sign-in').then($element => {
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Sign In");
                        });
                        cy.getElementByTestId('nav-account-sign-up').then($element => {
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Sign Up");
                        });
                    });
                });
            });
        });
    });

    context('Mobile Version of the application',()=>{
        it('Login Form Components',()=>{
            cy.viewport('iphone-x');
            cy.getElementByTestId('mobile-nav-button-account').then($element =>{
                expect($element).to.be.visible;
                //click
                cy.wrap($element).click();
                cy.testLoginFromComponents();
            });
        });
        it('Login And Log Out Actions', () => {
            cy.viewport('iphone-x');
            cy.getElementByTestId('mobile-nav-button-account').then($element => {
                //click
                cy.wrap($element).click({force:true});

                //Create User
                cy.get('@new_user').then(user => {
                    cy.addUser(user).then(addedUserResponse => {
                        cy.getElementByTestId('log-in-dialog-container-email-input').type(user.email);
                        cy.getElementByTestId('log-in-dialog-container-password-input').type(user.password);
                        cy.getElementByTestId('log-in-dialog-container-sign-in-button').click();
                        //Logeed In
                        cy.getElementByTestId('account-page-header').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Your Account"); 
                        });
                        cy.getElementByTestId('account-page-mobile-tabs').should('be.visible');
                        cy.getElementByTestId('account-page-mobile-tab-your-account').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Your Account");
                        });
                        cy.getElementByTestId('account-page-mobile-email').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Change Email Address");
                        });
                        cy.getElementByTestId('account-page-mobile-change-password').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Change Password");
                        });
                        cy.getElementByTestId('account-page-mobile-delete-account').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Delete Account");
                        });
                        //Logout
                        cy.getElementByTestId('account-page-mobile-logout').then($element=>{
                            expect($element).to.be.visible;
                            expect($element.children()).contain("Logout");
                            cy.wrap($element).click();
                        });
                        
                    });
                });
            });
        });
    });
});