import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from './DialogTitle';
import ForgotFormContainer from './ForgotFormContainer';

const ForgotDialog = ({
  handleMessageNew,
  handleRequestClose,
  handleRequestOpen
}) => (
  <div>
    <DialogTitle>Reset Password</DialogTitle>
    <ForgotFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

ForgotDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired
};

export default ForgotDialog;
