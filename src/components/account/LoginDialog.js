import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import LoginFormContainer from './LoginFormContainer';

const LoginDialog = ({
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
}) => (
  <div>
    <DialogTitle>Log In</DialogTitle>
    <LoginFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

LoginDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default LoginDialog;
