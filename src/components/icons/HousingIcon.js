import React from 'react';
import PropTypes from 'prop-types';

const HousingIcon = ({width, fillColor}) => (
  <svg id="095322d3-e9aa-43a4-959b-e549e7cbde14" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-housing</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><rect x="18.71" y="22.61" width="12.62" height="11.28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><rect x="25.57" y="28.25" width="3.41" height="5.64" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><circle cx="27.87" cy="30.55" r="0.36"/><rect x="20.8" y="24.87" width="3.05" height="3.05" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><polyline points="27.5 18.52 25 16.86 16.3 22.61 33.7 22.61 29.35 19.74" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><polygon points="29.35 16.11 27.5 16.11 27.5 18.52 29.35 19.74 29.35 16.11" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

HousingIcon.defaultProps = { width: '100%', fillColor: '#fae8a5' }
HousingIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default HousingIcon;
