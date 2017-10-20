import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import LoginFormContainer from './LoginFormContainer';

const LoginDialog = ({ handleRequestClose, handleRequestOpen }) => (
  <div>
    <DialogTitle>
      Log In
    </DialogTitle>
    <LoginFormContainer
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

LoginDialog.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default LoginDialog;
