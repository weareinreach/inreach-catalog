import React from 'react';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  title: {paddingBottom: theme.spacing(2), textAlign: 'center'},
});

const DialogTitle = ({children, classes}) => (
  <Typography className={classes.title} variant="h3">
    {children}
  </Typography>
);

export default withStyles(styles)(DialogTitle);
