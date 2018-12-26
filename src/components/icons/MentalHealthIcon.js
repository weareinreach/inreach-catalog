import React from 'react';
import PropTypes from 'prop-types';

const MentalHealthIcon = ({width, fillColor}) => (
  <svg id="9a0ca8d4-89bd-4065-b56a-25ccac237138" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><title>resource-mentalhealth</title><circle cx="25" cy="25" r="17.46" fill={fillColor} /><path d="M32,18.18c-3.23-2.54-7,2.27-7,2.27s-3.75-4.82-7-2.27S15.75,23.35,16.19,24l.06.09h0c.07.1.19.25.34.42h0c.91,1.06,2.91,3.07,3.76,3.81S25,32.56,25,32.56s3.72-3.4,4.65-4.21a52.91,52.91,0,0,0,3.85-3.91h0a4.1,4.1,0,0,0,.28-.36l0-.06h0v0l0,0C34.25,23.35,35.21,20.73,32,18.18Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.62"/></svg>
);

MentalHealthIcon.defaultProps = { width: '100%', fillColor: '#f0a8c8' }
MentalHealthIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default MentalHealthIcon;
