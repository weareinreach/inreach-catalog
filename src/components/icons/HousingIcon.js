import React from 'react';
import PropTypes from 'prop-types';

const HousingIcon = ({width, fillColor, strokeColor}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 36 38">
    <defs>
      <path id="a" d="M0 35V.075h34.925V35z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill={fillColor}
        d="M34.948 18.59c0 9.644-7.818 17.462-17.463 17.462C7.841 36.052.022 28.234.022 18.59c0-9.645 7.82-17.463 17.463-17.463 9.645 0 17.463 7.818 17.463 17.463"
      />
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.194 27.476h12.615V16.2H11.194z"
      />
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.06 27.476h3.41v-5.638h-3.41zM19.988 12.106l-2.502-1.653L8.785 16.2h17.4l-4.35-2.874"
      />
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21.835 9.702h-1.847v2.404l1.847 1.22z"
      />
    </g>
  </svg>
);

HousingIcon.defaultProps = {
  width: '100%',
  fillColor: '#5073B3',
  strokeColor: '#FFF',
};
HousingIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
};

export default HousingIcon;
