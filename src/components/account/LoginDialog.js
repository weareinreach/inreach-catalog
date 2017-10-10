import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import LoginForm from './LoginForm';

const LoginDialog = () => (
  <div>
    <DialogTitle>
      Log In
    </DialogTitle>
    <LoginForm />
  </div>
);

export default LoginDialog;
