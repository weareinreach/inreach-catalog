import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';

import DisclaimerText from './DisclaimerText';

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  disclaimerBody: {
    padding: '5.5rem',
    overflowY: 'auto',
  },
  title: { paddingBottom: '1rem', textAlign: 'center', },
});

const Disclaimer = ({classes, handleRequestClose, isOpen}) => (
  <Dialog open={isOpen} onRequestClose={handleRequestClose}>
    <div className={classes.disclaimerBody}>
      <Typography className={classes.title} type="display1">
        AsylumConnect Disclaimer
      </Typography>
      <DisclaimerText />
      <div className={classes.buttonContainer}>
        <AsylumConnectButton onClick={handleRequestClose} variant="secondary">
          OK
        </AsylumConnectButton>
      </div>
    </div>
  </Dialog>
);

Disclaimer.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Disclaimer);
