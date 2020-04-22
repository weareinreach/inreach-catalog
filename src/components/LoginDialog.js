import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from './DialogTitle';
import LoginFormContainer from './LoginFormContainer';

const LoginDialog = ({
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
}) => (
  <div>
    <DialogTitle>Log In</DialogTitle>
    <LoginFormContainer
      handleLogIn={handleLogIn}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

LoginDialog.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default LoginDialog;
