import React from 'react';
import PropTypes from 'prop-types';

const ResourceMailIcon = ({width, fillColor}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    viewBox="0 0 36 38"
  >
    <defs>
      <path id="a" d="M0 35V.075h34.925V35z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(.69 1.503)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill={fillColor}
          d="M34.925 17.537C34.925 27.182 27.108 35 17.463 35S0 27.182 0 17.537C0 7.892 7.819.074 17.462.074c9.646 0 17.463 7.818 17.463 17.463"
          mask="url(#b)"
        />
      </g>
      <g
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      >
        <path d="M25.62 17.254H11.983a3.41 3.41 0 0 0-3.409 3.41v5.454c0 .376.306.682.682.682h18.41a.682.682 0 0 0 .681-.682v-6.136c0-1.5-1.227-2.728-2.727-2.728z" />
        <path d="M11.983 17.254a3.41 3.41 0 0 1 3.41 3.41v5.454a.682.682 0 0 1-.682.682M18.802 20.664v-8.182h4.09v2.045h-3.75" />
      </g>
    </g>
  </svg>
);

ResourceMailIcon.defaultProps = {width: '100%', fillColor: '#5073B3'};
ResourceMailIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string
};

export default ResourceMailIcon;
