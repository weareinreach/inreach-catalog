import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import AsylumConnectButton from './AsylumConnectButton';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  spacingVertical: {margin: '2.5rem 0'},
});

const PromptReconfirm = ({ classes, handleRequestOpen }) => (
  <Paper className={classes.container}>
    <Typography className={classes.spacingVertical}>
      This page contains sensitive information. For security, please re-enter
      your password.
    </Typography>
    <AsylumConnectButton
      className={classes.spacingVertical}
      onClick={() => handleRequestOpen('password')}
      variant="primary"
    >
      Re-Enter Password
    </AsylumConnectButton>
  </Paper>
);

PromptReconfirm.propTypes = {
  handleRequestOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(PromptReconfirm);
