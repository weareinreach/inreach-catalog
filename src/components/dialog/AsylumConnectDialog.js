import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import { DisclaimerDialog, PrivacyDialog } from '../privacy';
import { ForgotDialog, LoginDialog } from '../account';

const styles = (theme) => ({
  dialogBody: {
    padding: '5.5rem',
    overflowY: 'auto',
  },
});

const AsylumConnectDialog = ({
  classes,
  dialog,
  handleRequestClose,
  handleRequestOpen,
}) => (
  <Dialog
    open={dialog !== 'none'}
    onRequestClose={handleRequestClose}
  >
    <div className={classes.dialogBody}>
      { dialog === 'disclaimer' &&
        <DisclaimerDialog handleRequestClose={handleRequestClose}/> }
      { dialog === 'forgot' &&
        <ForgotDialog handleRequestOpen={handleRequestOpen}/> }
      { dialog === 'login' &&
        <LoginDialog handleRequestOpen={handleRequestOpen}/> }
      { dialog === 'privacy' &&
        <PrivacyDialog handleRequestClose={handleRequestClose}/> }
    </div>
  </Dialog>
);

AsylumConnectDialog.propTypes = {
  classes: PropTypes.shape({ dialogBody: PropTypes.string }).isRequired,
  dialog: PropTypes.string.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(AsylumConnectDialog);
