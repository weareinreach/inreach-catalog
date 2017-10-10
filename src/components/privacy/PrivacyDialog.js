import React from 'react';
import PropTypes from 'prop-types';

import { DialogButton, DialogTitle } from '../dialog';
import PrivacyText from './PrivacyText';

const PrivacyDialog = ({ handleRequestClose }) => (
  <div>
    <DialogTitle>
      AsylumConnect User Privacy Statement
    </DialogTitle>
    <PrivacyText />
    <DialogButton handleRequestClose={handleRequestClose}>
      OK
    </DialogButton>
  </div>
);

PrivacyDialog.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
};

export default PrivacyDialog;
