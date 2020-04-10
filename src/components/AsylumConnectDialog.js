import PropTypes from 'prop-types';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {withStyles} from '@material-ui/core/styles';

import ActionButton from './ActionButton';
import DeleteAccountDialog from './DeleteAccountDialog';
import DisclaimerDialog from './DisclaimerDialog';
import ForgotDialog from './ForgotDialog';
import ListNewDialog from './ListNewDialog';
import LoginDialog from './LoginDialog';
import PasswordDialog from './PasswordDialog';
import PrivacyDialog from './PrivacyDialog';
import ShareDialog from './ShareDialog';
import SignupDialog from './SignupDialog';

const styles = (theme) => ({
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: `${theme.spacing(9)}px ${theme.spacing(11)}px`,
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
  locale,
  session,
  user,
  userData,
}) => (
  <Dialog
    open={['none', 'more'].indexOf(dialog) === -1}
    onRequestClose={handleRequestClose}
  >
    <div className={classes.dialogBody}>
      <ActionButton onClick={handleRequestClose}>&times;</ActionButton>
      {dialog === 'disclaimer' && (
        <DisclaimerDialog
          handleRequestClose={handleRequestClose}
          user={user}
          userData={userData}
        />
      )}
      {dialog === 'forgot' && (
        <ForgotDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
          locale={locale}
          user={user}
          userData={userData}
        />
      )}
      {/^listNew/.test(dialog) && (
        // listnew should be in the pattern listNew/{origin}/{originList}
        <ListNewDialog
          handleListAddFavorite={handleListAddFavorite}
          handleLogOut={handleLogOut}
          handleListNew={handleListNew}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          locale={locale}
          origin={dialog.split('/')[1]}
          originList={dialog.split('/')[2]}
          session={session}
          user={user}
          userData={userData}
        />
      )}
      {/^share/.test(dialog) && (
        // share should be in the pattern share/{type}/{id}/{title}
        <ShareDialog
          handleMessageNew={handleMessageNew}
          handleRequestOpen={handleRequestOpen}
          handleRequestClose={handleRequestClose}
          locale={locale}
          session={session}
          listId={dialog.split('/')[2]}
          listTitle={dialog.split('/')[3]}
          shareType={dialog.split('/')[1]}
          user={user}
          userData={userData}
        />
      )}
      {dialog === 'login' && (
        <LoginDialog
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
          locale={locale}
          user={user}
          userData={userData}
        />
      )}
      {dialog === 'password' && (
        <PasswordDialog
          handleConfirmSession={handleConfirmSession}
          handleMessageNew={handleMessageNew}
          handleRequestOpen={handleRequestOpen}
          handleRequestClose={handleRequestClose}
          locale={locale}
          session={session}
          user={user}
          userData={userData}
        />
      )}
      {dialog === 'privacy' && (
        <PrivacyDialog handleRequestClose={handleRequestClose} />
      )}
      {dialog === 'signup' && (
        <SignupDialog
          handleLogIn={handleLogIn}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
          history={history}
          locale={locale}
          session={session}
        />
      )}
      {dialog === 'deleteAccount' && (
        <DeleteAccountDialog
          handleLogOut={handleLogOut}
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleRequestClose}
          handleRequestOpen={handleRequestOpen}
          history={history}
          locale={locale}
          session={session}
          user={user}
          userData={userData}
        />
      )}
    </div>
  </Dialog>
);

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
