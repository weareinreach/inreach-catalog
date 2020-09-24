import React from 'react';
import PropTypes from 'prop-types';

const BackIcon = ({width, color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path fill={color} d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
      <path d="M0 0h24v24H0z" />
    </g>
  </svg>
);

BackIcon.defaultProps = {width: '100%', color: '#1D1F23'};
BackIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default BackIcon;
