import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({});

const Disclaimer = ({handleRequestClose, isOpen}) => (
  <Dialog onRequestClose={handleRequestClose} open={isOpen}>
    <DialogTitle>
      Disclaimer
    </DialogTitle>
    <div>
      I'm a disclaimer
    </div>
    <AsylumConnectButton
      onClick={handleRequestClose}
      variant="secondary"
    >
      OK
    </AsylumConnectButton>
  </Dialog>
);

Disclaimer.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Disclaimer);
