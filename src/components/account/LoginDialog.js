import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import LoginFormContainer from './LoginFormContainer';

const LoginDialog = ({ handleRequestOpen }) => (
  <div>
    <DialogTitle>
      Log In
    </DialogTitle>
    <LoginFormContainer handleRequestOpen={handleRequestOpen} />
  </div>
);

LoginDialog.propTypes = {
  handleRequestOpen: PropTypes.func.isRequired,
};

export default LoginDialog;
