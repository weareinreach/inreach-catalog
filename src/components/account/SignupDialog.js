import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import SignupFormContainer from './SignupFormContainer';

const SignupDialog = ({
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen,
}) => (
  <div>
    <DialogTitle>Sign Up</DialogTitle>
    <SignupFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

SignupDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default SignupDialog;
