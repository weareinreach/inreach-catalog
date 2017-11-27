import React from 'react';

import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

const styles = (theme) => ({
  buttonRoot: {
    minWidth: '0',
    padding: '0'
  }
});

const AsylumConnectBackButton = ({onClick, classes, color="default"}) => (
  <Button color={color} classes={{root: classes.buttonRoot}} onClick={onClick}>
    <ArrowBackIcon />
  </Button>
);

export default withStyles(styles)(AsylumConnectBackButton);