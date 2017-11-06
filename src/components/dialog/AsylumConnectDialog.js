import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import {DisclaimerDialog, PrivacyDialog} from '../privacy';
import {ForgotDialog, LoginDialog, SignupDialog} from '../account';
import {ListNewDialog, ListShareDialog} from '../favorites';

const styles = theme => ({
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem',
  },
});

const AsylumConnectDialog = ({
  classes,
  dialog,
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  session,
  user,
}) =>
  <Dialog open={dialog !== 'none'} onRequestClose={handleRequestClose}>
    <div className={classes.dialogBody}>
      {dialog === 'disclaimer' &&
        <DisclaimerDialog handleRequestClose={handleRequestClose} />}
      {dialog === 'forgot' &&
        <ForgotDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />}
      {dialog === 'listNew' &&
        <ListNewDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          session={session}
          user={user}
        />
      }
      {dialog === 'listShare' &&
        <ListShareDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
        />
      }
      {dialog === 'login' &&
        <LoginDialog
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />}
      {dialog === 'privacy' &&
        <PrivacyDialog handleRequestClose={handleRequestClose} />}
      {dialog === 'signup' &&
        <SignupDialog
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />}
    </div>
  </Dialog>;

AsylumConnectDialog.defaultProps = {
  session: null,
  user: null,
};

AsylumConnectDialog.propTypes = {
  classes: PropTypes.shape({dialogBody: PropTypes.string}).isRequired,
  dialog: PropTypes.string.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(AsylumConnectDialog);
