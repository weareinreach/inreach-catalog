import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import PasswordFormContainer from './PasswordFormContainer';

const PasswordDialog = ({
  handleConfirmSession,
  handleMessageNew,
  handleRequestClose,
  session,
}) => (
  <div>
    <DialogTitle>Confirm Password</DialogTitle>
    <PasswordFormContainer
      handleConfirmSession={handleConfirmSession}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      session={session}
    />
  </div>
);

PasswordDialog.propTypes = {
  handleConfirmSession: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
};

export default PasswordDialog;
