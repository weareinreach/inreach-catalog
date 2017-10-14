import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import LoginFormContainer from './LoginFormContainer';

const LoginDialog = () => (
  <div>
    <DialogTitle>
      Log In
    </DialogTitle>
    <LoginFormContainer />
  </div>
);

export default LoginDialog;
