import React from 'react';

import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  secondaryColor: {
    color: theme.palette.secondary[500]
  }
});

const Loading = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} style={{textAlign: "center"}}>
      <CircularProgress className={props.classes.secondaryColor} />
    </Grid>
  </Grid>
);

export default withStyles(styles)(Loading);