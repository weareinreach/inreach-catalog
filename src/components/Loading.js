import React from 'react';

import {CircularProgress} from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  secondaryColor: {
    color: theme.palette.secondary[500]
  },
  fixedHeight: {
    height: 40 + theme.spacing.unit * 4,
    overflow: 'hidden',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const Loading = props => (
  <Grid container spacing={0} className={props.classes.fixedHeight}>
    <Grid item xs={12} style={{textAlign: 'center'}}>
      <CircularProgress
        className={
          props.colorClass ? props.colorClass : props.classes.secondaryColor
        }
      />
    </Grid>
  </Grid>
);

export default withStyles(styles)(Loading);
