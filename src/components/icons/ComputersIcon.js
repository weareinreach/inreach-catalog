import React from 'react';
import PropTypes from 'prop-types';

const ComputersIcon = ({width, fillColor}) => (
  <svg id="6d26c0ff-a280-40ea-9e73-9f39d23228cf" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-computers</title><circle cx="25" cy="25" r="17.46" fill={fillColor}/><path d="M17.15,17.66H32.85a1.27,1.27,0,0,1,1.27,1.27V30.86a0,0,0,0,1,0,0H15.88a0,0,0,0,1,0,0V18.93A1.27,1.27,0,0,1,17.15,17.66Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><rect x="17.18" y="19.16" width="15.65" height="10.2" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M27.86,30.86V31a.64.64,0,0,1-.64.64H22.77a.64.64,0,0,1-.64-.64v-.11h-8v.42a1.06,1.06,0,0,0,1.06,1.06H34.83a1.06,1.06,0,0,0,1.06-1.06v-.42Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M22.77,31.6h4.45a.64.64,0,0,0,.64-.64v-.11H22.14V31A.64.64,0,0,0,22.77,31.6Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

ComputersIcon.defaultProps = { width: '100%', fillColor: '#8ec0e1' }
ComputersIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default ComputersIcon;
