import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import ForgotFormContainer from './ForgotFormContainer';

const ForgotDialog = ({ handleRequestClose, handleRequestOpen }) => (
  <div>
    <DialogTitle>
      Reset Password
    </DialogTitle>
    <ForgotFormContainer
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
    />
  </div>
);

ForgotDialog.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default ForgotDialog;
