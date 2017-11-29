import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import SignupFormContainer from './SignupFormContainer';

const SignupDialog = ({
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
  history
}) => (
  <div>
    <DialogTitle>Sign Up</DialogTitle>
    <SignupFormContainer
      handleLogIn={handleLogIn}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
      history={history}
    />
  </div>
);

SignupDialog.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default SignupDialog;
