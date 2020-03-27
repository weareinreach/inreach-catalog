# Asylum Connect Catalog

[![Build Status](https://travis-ci.org/asylum-connect/onedegree-catalog.svg?branch=master)](https://travis-ci.org/asylum-connect/asylumconnect-catalog)

## Development

```
$ cd to asylumconnect-catalog

$ npm i

$ npm run dev
```

Local server is accessible at [http://localhost:8080](http://localhost:8080)

## Production Simulation

Build the production assets

```
$ npm run web-prod
```

Start the server:

```
$ npm run start
```

## Codebase

Our routes documentation can be found at `/docs` on staging and production.

Folder structure

```
asylumconnect-catalog/
├── api               # tk
├── config            # Server Config
├── public            # Public assets
├── src               # Source code for the frontend
├── src/components    # tk
├── src/helpers       # tk
├── src/images        # Image assets
├── src/config.js     # Frontend Config
├── src/index.js      # Starting point for the frontend
├── views             # tk
├── index.js          # An express server, more tk
└── server.js         # An express server, more tk
```

Technologies

- [React](https://reactjs.org/)
- [React-Router](https://reacttraining.com/react-router/)
- [react-google-maps](https://www.npmjs.com/package/react-google-maps)
- [material-ui](https://material-ui-1dab0.firebaseapp.com/getting-started/usage/)
- [Express](https://expressjs.com/)

> For responsive handling, the `render()` methodology from [this reference](https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/) should be used on all components that adjust based on resolution

Code Standards

In order to enforce code standards we use [eslint](https://eslint.org/) and [prettier](https://prettier.io/). Setting up eslint in your code editor is the easiest way to adhere to guidlines while programming but we also lint and prettify code during the commit process using [lint-staged](https://github.com/okonet/lint-staged).
