import React from 'react';
import PropTypes from 'prop-types';

const ShareIcon = ({width}) => (
  <svg id="6cc15dac-6d21-4e46-8053-1d6ffdfe0341" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width}><title>icon-share</title><rect x="12.5" y="16.28" width="25" height="17.45" rx="0.79" ry="0.79" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/><path d="M12.5,17.38l11.64,8.89a1.58,1.58,0,0,0,1.71,0L37.5,17.38" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/><line x1="12.5" y1="32.93" x2="23.01" y2="25.97" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/><line x1="26.99" y1="25.97" x2="37.5" y2="32.93" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/></svg>
);

ShareIcon.defaultProps = { width: '100%' }
ShareIcon.propTypes = { width: PropTypes.string }

export default ShareIcon;
