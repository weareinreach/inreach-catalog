import React from 'react';
import PropTypes from 'prop-types';

const HygieneIcon = ({width, fillColor}) => (
  <svg id="4f05948b-cd19-461c-8279-b7906ca160c0" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-hygiene</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><path d="M29.12,18.6a6,6,0,0,0-1.89-1.51A2.16,2.16,0,0,1,23,17h-.1A5.44,5.44,0,0,0,21,18.47l-5.3,5.3,2.88,2.88,2-2L19.82,33H30.21l-.75-8.27,1.95,1.95,2.88-2.88Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M23,17a2.16,2.16,0,0,0,4.26,0" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

HygieneIcon.defaultProps = { width: '100%', fillColor: '#99d5d5' }
HygieneIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default HygieneIcon;
