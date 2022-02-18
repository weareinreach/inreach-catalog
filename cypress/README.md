# CYPRESS Guidelines

For automation we selected [Cypress](https://www.cypress.io/).

To run our automation tests there are 2 possible scenarios:
 - Run it against staging backend and database by using commands:
   - yarn test:e2e
   - yarn test:e2e:ci

- Run it against locally hosted API(while connected to Docker database. Please refer to docker README.md in catalog-api repo to get started), by using commands:
  - yarn test:e2e:local
  - yarn test:e2e:ci:local
  
This approach above is recommended as it is how the CI/CD will run the tests.

NOTE: The docker DB as well as the api need to be instantiated before running commands above.

# Backend selection
A cool feature of our CI/CD is it allows you to choose the API branch to pull to be used in the automation. In the case that control panel work also requires an API component, you the ability to choose it for the PR. The reference is located on the file  `./cypress.env.json`. Update the key `"api_ci_branch"` to choose your branch. The default is dev.