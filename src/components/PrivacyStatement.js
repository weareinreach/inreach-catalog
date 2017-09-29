import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({
});

const PrivacyStatement = ({classes, handleRequestClose, isOpen}) => (
  <Dialog open={isOpen} onRequestClose={handleRequestClose}>
    <div>
      <Typography type="display1">
        Privacy Statement
      </Typography>
      <Typography type="body1">
      </Typography>
      <div>
        <AsylumConnectButton onClick={handleRequestClose} variant="secondary">
          OK
        </AsylumConnectButton>
      </div>
    </div>
  </Dialog>
);

PrivacyStatement.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PrivacyStatement);
