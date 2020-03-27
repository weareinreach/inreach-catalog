# Asylum Connect Catalog

[![Build Status](https://travis-ci.org/asylum-connect/onedegree-catalog.svg?branch=master)](https://travis-ci.org/asylum-connect/asylumconnect-catalog)

A rebuild of the Asylum Connect Catalog using Node.js and ReactJS with Flask serving as the database backend.

## Dependency Documentation

- [react](https://facebook.github.io/react/docs/hello-world.html)
- [react-router](https://reacttraining.com/react-router/)
- [react-google-maps](https://www.npmjs.com/package/react-google-maps)
- [material-ui](https://material-ui-1dab0.firebaseapp.com/getting-started/usage/)

## Design Mockups

- [Desktop](https://projects.invisionapp.com/share/SBD7H2ODQ#/screens)
- [Mobile](https://invis.io/CMD7ULZWJ#/screens)

For responsive handling, the `render()` methodology from [this reference](https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/) should be used on all components that adjust based on resolution

## Git Workflow

[General workflow reference](http://nvie.com/posts/a-successful-git-branching-model/)

There will be two main branches in the repo: `master` and `staging`.

`master` will reference code that is on production or production-ready.

`staging` will reference the main development code and will eventually be tested on staging.

`feature/xxx` and `fix/xxx` branches should be made from `staging` and then merged back into `staging` using `git merge --no-ff feature/xxx`

## Environment Setup

### Prequisites

- `node`
- `npm`
- `git`

### Installation

Install `npm` modules:

```bash
npm install
```

### Run

#### Development

Run dev server that watches for changes and re-builds:

```bash
npm run web-dev
```

Local server is accessible at [http://localhost:8080](http://localhost:8080)

#### Production Simulation

First build the production build process:

```bash
npm run web-prod
```

Next start the server:

```bash
npm run start
```

Local server is accessible at [http://localhost:8080](http://localhost:8080)
