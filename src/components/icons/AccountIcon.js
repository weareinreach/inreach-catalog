import React from 'react';
import PropTypes from 'prop-types';

const AccountIcon = ({width}) => (
  <svg id="72dfbd3d-0d93-49bb-84b4-a8effed3fb8d" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width}><title>icon-account</title><path d="M26.93,23.69a5,5,0,1,0-4,.05c-2.64,1.26-4.57,4.91-4.57,9.18v2.95H31.61V32.92C31.61,28.59,29.63,24.9,26.93,23.69Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/></svg>
);

AccountIcon.defaultProps = { width: '100%' }
AccountIcon.propTypes = { width: PropTypes.string }

export default AccountIcon;
