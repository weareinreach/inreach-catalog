import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  secondaryColor: {
    color: theme.palette.secondary[500],
  },
  fixedHeight: {
    height: 40 + theme.spacing(4),
    overflow: 'hidden',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const Loading = (props) => (
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
