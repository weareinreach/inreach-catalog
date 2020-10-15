import React from 'react';
import PropTypes from 'prop-types';

const MedicalIcon = ({width, fillColor}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    viewBox="0 0 36 38"
  >
    <defs>
      <path id="a" d="M0 .075h34.925V35H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(.26 1.052)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill={fillColor}
          d="M34.925 17.537C34.925 27.182 27.107 35 17.463 35 7.818 35 0 27.182 0 17.537 0 7.892 7.818.074 17.463.074c9.644 0 17.462 7.818 17.462 17.463"
          mask="url(#b)"
        />
      </g>
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M25.76 16.183h-5.13v-5.131h-5.738v5.131H9.761v5.737h5.131v5.132h5.737V21.92h5.132z"
      />
    </g>
  </svg>
);

MedicalIcon.defaultProps = {width: '100%', fillColor: '#5073B3'};
MedicalIcon.propTypes = {width: PropTypes.string, fillColor: PropTypes.string};

export default MedicalIcon;
