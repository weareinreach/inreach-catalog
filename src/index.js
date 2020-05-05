import 'normalize.css';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import {ThemeProvider} from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppCatalog from './App';
import config from './config';
import catalogTheme from './theme';

ReactGA.initialize(config.googleAnalyticsKey);
ReactGA.set({
  anonymizeIp: true,
});

const App = () => {
  useEffect(() => {
    const page = `${window.location.pathname}${window.location.search}`;

    ReactGA.set({page});
    ReactGA.pageview(page);
  }, []);

  return (
    <ThemeProvider theme={catalogTheme}>
      <Router>
        <Switch>
          <Route path="/:locale" component={AppCatalog} />
          <Route path="/" component={AppCatalog} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
