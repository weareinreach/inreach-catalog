import React from 'react';
import PropTypes from 'prop-types';

const LegalIcon = ({width, fillColor}) => (
  <svg id="f9123466-1d27-4cbe-926b-59cd33f4b30d" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-legal</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><path d="M31.31,26.67a3.08,3.08,0,0,0,3.08-3.08H28.23A3.08,3.08,0,0,0,31.31,26.67Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><line x1="31.31" y1="18.27" x2="28.77" y2="23.58" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><line x1="31.31" y1="18.27" x2="33.85" y2="23.58" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M18.69,26.67a3.08,3.08,0,0,0,3.08-3.08H15.61A3.08,3.08,0,0,0,18.69,26.67Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><line x1="21.23" y1="23.58" x2="18.69" y2="18.27" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><polyline points="16.15 23.59 18.69 18.27 31.31 18.27" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><line x1="25" y1="16.47" x2="25" y2="29.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M29.28,33.54h0a4.28,4.28,0,1,0-8.55,0h8.55Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

LegalIcon.defaultProps = { width: '100%', fillColor: '#efb58c' }
LegalIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default LegalIcon;
