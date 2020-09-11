import PropTypes from 'prop-types';
import React from 'react';

import DialogButton from './DialogButton';
import DialogTitle from './DialogTitle';
import PrivacyText from './PrivacyText';

const PrivacyDialog = ({handleRequestClose}) => (
  <div>
    <DialogTitle>AsylumConnect User Privacy Statement</DialogTitle>
    <PrivacyText />
    <DialogButton handleRequestClose={handleRequestClose}>OK</DialogButton>
  </div>
);

PrivacyDialog.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
};

export default PrivacyDialog;
