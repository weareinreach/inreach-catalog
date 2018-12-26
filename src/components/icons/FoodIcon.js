import React from 'react';
import PropTypes from 'prop-types';

const FoodIcon = ({width, fillColor}) => (
  <svg id="f8bc80f0-46bf-4a20-bb63-023129ca09e4" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-food</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><path d="M30.66,19.82c0-2-1.14-3.71-2.55-3.71s-2.55,1.66-2.55,3.71c0,1.85.79,3.37,2,3.66l0,9.87a.54.54,0,0,0,.54.54h.08a.54.54,0,0,0,.54-.54l0-9.87C29.87,23.19,30.66,21.67,30.66,19.82Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/><path d="M23,16.11H22.9a.36.36,0,0,0-.36.36v3a.36.36,0,0,1-.36.35H22.1a.36.36,0,0,1-.36-.36v-3a.36.36,0,0,0-.36-.36H21.3a.36.36,0,0,0-.36.36v3a.36.36,0,0,1-.36.35H20.5a.36.36,0,0,1-.36-.36v-3a.36.36,0,0,0-.36-.36H19.7a.36.36,0,0,0-.36.36v5.06a1.89,1.89,0,0,0,1.46,2l0,9.86a.54.54,0,0,0,.54.54h.08a.54.54,0,0,0,.54-.54l0-9.86a1.89,1.89,0,0,0,1.46-2V16.47A.36.36,0,0,0,23,16.11Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

FoodIcon.defaultProps = { width: '100%', fillColor: '#a9d3a6' }
FoodIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default FoodIcon;
