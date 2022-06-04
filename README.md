# InReach Catalog

[![Build Status](https://travis-ci.org/asylum-connect/asylumconnect-catalog.svg?branch=master)](https://travis-ci.org/asylum-connect/asylumconnect-catalog)

## Development

```
$ cd to asylumconnect-catalog

$ yarn install

$ yarn dev
```

## Allison's first commit dwadwadwa

Local server is accessible at [http://localhost:8080](http://localhost:8080)

## Production Simulation

Build the production assets

```
$ yarn build
```

Start the server:

```
$ yarn start
```

## Codebase

Our routes documentation can be found at `/docs` on staging and production.

Folder structure

```
asylumconnect-catalog/
├── public          # Static assets
├── src             # All of the source code for the app
├── src/components  # React components used throughout the app
├── src/images      # Image assets
├── src/utils       # Shared utilities
├── src/config.js   # Frontend Config
├── src/index.js    # Starting point for the frontend
└── src/server.js   # Express server used to serve the app in production
```

Technologies

- [create-react-app](https://create-react-app.dev/)
- [React](https://reactjs.org/)
- [React-Router](https://reacttraining.com/react-router/)
- [react-google-maps](https://www.npmjs.com/package/react-google-maps)
- [material-ui](https://material-ui.com/)
- [Express](https://expressjs.com/)

> For responsive handling, the `render()` methodology from [this reference](https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/) should be used on all components that adjust based on resolution

Code Standards

In order to enforce code standards we use [eslint](https://eslint.org/) and [prettier](https://prettier.io/). Setting up eslint in your code editor is the easiest way to adhere to guidlines while programming but we also lint and prettify code during the commit process using [lint-staged](https://github.com/okonet/lint-staged).
