import React from 'react';
import PropTypes from 'prop-types';

const MedicalIcon = ({width, fillColor}) => (
  <svg id="cf861f97-448d-4c61-aa0e-67fe9b2678cf" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-medical</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><polygon points="32.45 22.33 27.67 22.33 27.67 17.56 22.33 17.56 22.33 22.33 17.55 22.33 17.55 27.67 22.33 27.67 22.33 32.45 27.67 32.45 27.67 27.67 32.45 27.67 32.45 22.33" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

MedicalIcon.defaultProps = { width: '100%', fillColor: '#f7a69e' }
MedicalIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default MedicalIcon;
