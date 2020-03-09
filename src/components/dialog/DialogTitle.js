import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  title: {paddingBottom: theme.spacing.unit * 2, textAlign: 'center'}
});

const DialogTitle = ({children, classes}) => (
  <Typography className={classes.title} variant="display1">
    {children}
  </Typography>
);

export default withStyles(styles)(DialogTitle);
