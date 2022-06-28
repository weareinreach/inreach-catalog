// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@cypress/code-coverage/support';
import './api_functions';

// Import Reusable Tests definitions
import './tests_definitions/navigation_bar';
import './tests_definitions/login';
import './tests_definitions/account_creation';
import './tests_definitions/account_settings';
import './tests_definitions/favorites';
import './tests_definitions/footer_bar';
import './tests_definitions/suggest_resource';
import './tests_definitions/search_page';
import './tests_definitions/announcement';
import './tests_definitions/language';
import './tests_definitions/utility';
import './tests_definitions/details';
import './tests_definitions/mexico_crime_map';
import './tests_definitions/static_resource';
import './tests_definitions/forgot_password';

// Alternatively you can use CommonJS syntax:
// require('./commands')
