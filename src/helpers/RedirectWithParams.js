import React from 'react';
import pathToRegexp from 'path-to-regexp';
import {Route, Switch, Redirect} from 'react-router-dom';

const RedirectWithParams = ({exact, from, push, to}) => {
  const pathTo = pathToRegexp.compile(to);
  return (
    <Route
      exact={exact}
      path={from}
      component={({match: {params}}) => (
        <Redirect to={pathTo(params)} push={push} />
      )}
    />
  );
};

export default RedirectWithParams;
