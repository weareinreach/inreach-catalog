import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import ForgotFormContainer from './ForgotFormContainer';

const ForgotDialog = ({ handleRequestOpen }) => (
  <div>
    <DialogTitle>
      Reset Password
    </DialogTitle>
    <ForgotFormContainer handleRequestOpen={handleRequestOpen} />
  </div>
);

export default ForgotDialog;
