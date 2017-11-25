import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import {DisclaimerDialog, PrivacyDialog} from '../privacy';
import {ForgotDialog, LoginDialog, PasswordDialog, SignupDialog} from '../account';
import ActionButton from '../ActionButton';
import {ListNewDialog, ListShareDialog} from '../favorites';

const styles = theme => ({
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '4.5rem 5.5rem',
  },
});

const AsylumConnectDialog = ({
  classes,
  dialog,
  handleListAddFavorite,
  handleListNew,
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  session,
  user,
}) =>
  <Dialog open={dialog !== 'none'} onRequestClose={handleRequestClose}>
    <div className={classes.dialogBody}>
      <ActionButton
        onClick={handleRequestClose}
        >&times;</ActionButton>
      {dialog === 'disclaimer' &&
        <DisclaimerDialog handleRequestClose={handleRequestClose} />}
      {dialog === 'forgot' &&
        <ForgotDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />
      }
      {/^listNew/.test(dialog) &&
        // listnew should be in the pattern listNew/{origin}/{originList}
        <ListNewDialog
          handleListAddFavorite={handleListAddFavorite}
          handleListNew={handleListNew}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          origin={dialog.split('/')[1]}
          originList={dialog.split('/')[2]}
          session={session}
          user={user}
        />
      }
      {dialog === 'listShare' &&
        <ShareDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          session={session}
          listId={list.id}
          listTitle={list.title}
          shareType="collection"
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
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(AsylumConnectDialog);
