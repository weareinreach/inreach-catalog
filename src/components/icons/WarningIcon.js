import React from 'react';
import PropTypes from 'prop-types';

const WarningIcon = ({width, fillColor}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    focusable="false"
    width={width}
    style={{transform:"rotate(360deg)",}}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 20 20"
  >
    <path
      d="M19.511 17.98L10.604 1.348a.697.697 0 0 0-1.208 0L.49 17.98a.675.675 0 0 0 .005.68c.125.211.352.34.598.34h17.814a.694.694 0 0 0 .598-.34a.677.677 0 0 0 .006-.68zM11 17H9v-2h2v2zm0-3.5H9V7h2v6.5z"
      fill={fillColor}
    />
    <rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" />
  </svg>
);

WarningIcon.defaultProps = {
  width: '100%',
  fillColor: '#FFD048',
};

WarningIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string,
};

export default WarningIcon;
