import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import PasswordFormContainer from './PasswordFormContainer';

const PasswordDialog = ({
  handleMessageNew,
  handleRequestClose,
}) => (
  <div>
    <DialogTitle>Confirm Password</DialogTitle>
    <PasswordFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
    />
  </div>
);

PasswordDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default PasswordDialog;
