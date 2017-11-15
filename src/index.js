import 'normalize.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {render} from 'react-dom';
import AsylumConnectCatalog from './components/AsylumConnectCatalog';
import asylumConnectCatalogTheme from './theme/asylumConnectCatalogTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PromisePolyfill from 'promise-polyfill'; 

/**
 * Polyfill Promises
 */


// Add Promise to window
if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

/**
 * App entry file
 */

const rootElement = document.getElementById('main');

render(
  <MuiThemeProvider theme={asylumConnectCatalogTheme}>
    <Router>
      <Route path="/" render={(props) => (<AsylumConnectCatalog location={props.location} history={props.history} />)} />
    </Router>
  </MuiThemeProvider>,
  rootElement);