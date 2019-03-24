import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import {DisclaimerDialog, PrivacyDialog} from '../privacy';
import DeleteAccountDialog from '../account/DeleteAccountDialog';
import {ForgotDialog, LoginDialog, PasswordDialog, SignupDialog} from '../account';
import ActionButton from '../ActionButton';
import {ListNewDialog, ShareDialog} from '../favorites';

const styles = theme => ({
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: (theme.spacing.unit * 9) + ' ' + (theme.spacing.unit * 11),
  },
});

const AsylumConnectDialog = ({
  classes,
  dialog,
  handleConfirmSession,
  handleListAddFavorite,
  handleListNew,
  handleLogIn,
  handleDeleteAccount,
  handleLogOut,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  history,
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
          handleLogOut={handleLogOut}
          handleListNew={handleListNew}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          origin={dialog.split('/')[1]}
          originList={dialog.split('/')[2]}
          session={session}
          user={user}
        />
      }
      {/^share/.test(dialog) &&
        // share should be in the pattern share/{type}/{id}/{title}
        <ShareDialog
          handleMessageNew={handleMessageNew}
          handleRequestOpen={handleRequestOpen}
          handleRequestClose={handleRequestClose}
          session={session}
          listId={dialog.split('/')[2]}
          listTitle={dialog.split('/')[3]}
          shareType={dialog.split('/')[1]}
        />
      }
      {dialog === 'login' &&
        <LoginDialog
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
        />}
      {dialog === 'password' &&
        <PasswordDialog
          handleConfirmSession={handleConfirmSession}
          handleMessageNew={handleMessageNew}
          handleRequestOpen={handleRequestOpen}
          handleRequestClose={handleRequestClose}
          session={session}
        />
        }
      {dialog === 'privacy' &&
        <PrivacyDialog handleRequestClose={handleRequestClose} />}
      {dialog === 'signup' &&
        <SignupDialog
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
          history={history}
          session={session}
        />}
      {dialog === 'deleteAccount' &&
        <DeleteAccountDialog
          handleLogOut={handleLogOut}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
          history={history}
          session={session}
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
  handleConfirmSession: PropTypes.func.isRequired,
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(AsylumConnectDialog);
