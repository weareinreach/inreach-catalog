import React from 'react';
import PropTypes from 'prop-types';

const PrivacyIcon = ({width, color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path d="M-4-10h24v24H-4z" />
      <g transform="translate(4 10)">
        <path
          fill={color}
          fillRule="nonzero"
          d="M2 0C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM8 0C6.9 0 6 .9 6 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        />
      </g>
    </g>
  </svg>
);

PrivacyIcon.defaultProps = {width: '100%', color: '#1D1F23'};
PrivacyIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default PrivacyIcon;
