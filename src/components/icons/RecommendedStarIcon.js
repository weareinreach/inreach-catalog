import React from 'react';
import PropTypes from 'prop-types';

const RecommendedStarIcon = ({width}) => (
  <svg
    id="6b50242b-2cb0-466b-af23-3186fdd63eb4"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width={width}
  >
    <defs>
      <clipPath id="3e378cd2-9d55-467d-ba36-312c5a163265">
        <circle cx="25" cy="25" r="12.14" fill="none" />
      </clipPath>
      <clipPath id="4730f831-86f8-4159-a7ea-5af0c83109c6">
        <rect x="9.82" y="9.82" width="31" height="31" fill="none" />
      </clipPath>
      <clipPath id="372df220-7caa-4325-9b65-16ef63240e12">
        <polygon
          points="24.92 28.94 20.19 31.43 21.09 26.16 17.27 22.44 22.55 21.67 24.92 16.88 27.28 21.67 32.57 22.44 28.74 26.16 29.65 31.43 24.92 28.94"
          fill="none"
          clipRule="evenodd"
        />
      </clipPath>
    </defs>
    <title>icon-recommendedstar</title>
    <g clipPath="url(#3e378cd2-9d55-467d-ba36-312c5a163265)">
      <g clipPath="url(#4730f831-86f8-4159-a7ea-5af0c83109c6)">
        <rect x="7.86" y="7.86" width="34.29" height="34.29" fill="#6a88c0" />
      </g>
    </g>
    <g clipPath="url(#372df220-7caa-4325-9b65-16ef63240e12)">
      <g clipPath="url(#4730f831-86f8-4159-a7ea-5af0c83109c6)">
        <rect x="12.27" y="11.88" width="25.3" height="24.55" fill="#fff" />
      </g>
    </g>
  </svg>
);

RecommendedStarIcon.defaultProps = {width: '100%'};
RecommendedStarIcon.propTypes = {width: PropTypes.string};

export default RecommendedStarIcon;
