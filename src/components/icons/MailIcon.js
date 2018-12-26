import React from 'react';
import PropTypes from 'prop-types';

const ResourceMailIcon = ({width, fillColor}) => (
  <svg id="2856a9cb-9973-4a63-b775-bf92ae63a1e4" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resouce-mail</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><rect x="15.95" y="18.68" width="18.11" height="12.64" rx="0.57" ry="0.57" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M15.95,19.48l8.44,6.44a1.15,1.15,0,0,0,1.24,0l8.44-6.44" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><line x1="15.95" y1="30.75" x2="23.56" y2="25.7" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><line x1="26.44" y1="25.7" x2="34.05" y2="30.75" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

ResourceMailIcon.defaultProps = { width: '100%', fillColor: '#cbac95' }
ResourceMailIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default ResourceMailIcon;
