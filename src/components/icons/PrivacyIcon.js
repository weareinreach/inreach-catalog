import React from 'react';
import PropTypes from 'prop-types';

const PrivacyIcon = ({width, color}) => (
  <svg id="d9cf3034-32ab-4eb3-92e0-b69d89975a85" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width}><title>icon-privacy</title><path d="M23.86,14.58,12.59,34.1a1.32,1.32,0,0,0,1.14,2H36.27a1.32,1.32,0,0,0,1.14-2L26.14,14.58A1.32,1.32,0,0,0,23.86,14.58Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/><path d="M25,30.22a.91.91,0,0,1,.94.89.93.93,0,1,1-.94-.89Zm.52-1h-1l-.14-7.14h1.27Z" fill={color}/></svg>
);

PrivacyIcon.defaultProps = { width: '100%', color: '#000' }
PrivacyIcon.propTypes = { width: PropTypes.string, color: PropTypes.string }

export default PrivacyIcon;
