import React from 'react';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

import Grid from 'material-ui/Grid';

export default class Header extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <Grid container>
        <Grid item hidden={{ mdUp: true }} xs={12} style={{position: 'fixed', bottom:'0', width: '100%'}}>
          <NavMobile />
        </Grid>
        <Grid item hidden={{ smDown: true }} md={12}>
          <NavDesktop />
        </Grid>
      </Grid>
    )
  }
}

