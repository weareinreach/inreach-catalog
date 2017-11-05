import 'normalize.css';
import React from 'react';
import {render} from 'react-dom';
import AsylumConnectCatalog from './components/AsylumConnectCatalog';
import asylumConnectCatalogTheme from './theme/asylumConnectCatalogTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * App entry file
 */

const rootElement = document.getElementById('main');

render(
  <MuiThemeProvider theme={asylumConnectCatalogTheme}>
    <AsylumConnectCatalog />
  </MuiThemeProvider>,
  rootElement);