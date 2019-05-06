import 'normalize.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {render} from 'react-dom';
import AsylumConnectCatalog from './components/AsylumConnectCatalog';
import asylumConnectCatalogTheme from './theme/asylumConnectCatalogTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PromisePolyfill from 'promise-polyfill'; 
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory'

ReactGA.initialize('UA-76058112-1');
ReactGA.set({ 
  anonymizeIp: true
});
/**
 * Polyfill Promises
 */
// Add Promise to window
if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

/**
 * Log Google Analytics Pageview
 * @return {[type]} [description]
 */
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview( window.location.pathname + window.location.search);
  return null;
}


/**
 * App entry file
 */

const rootElement = document.getElementById('main');

render(
  <MuiThemeProvider theme={asylumConnectCatalogTheme}>
    <Router>
      <div>
        <Route path="/" component={logPageView} />
        <Switch>
          <Route path="/:locale" render={(props) => (<AsylumConnectCatalog match={props.match} location={props.location} history={props.history} />)} />
          <Route path="/" render={(props) => (<AsylumConnectCatalog match={props.match} location={props.location} history={props.history} />)} />
        </Switch>
      </div>
    </Router>
  </MuiThemeProvider>,
  rootElement
);