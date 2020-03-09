import React from 'react';
import PropTypes from 'prop-types';

const FlagIcon = ({width}) => (
  <svg
    id="4bc096e0-abf1-4851-a304-96a9b50b06c4"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 55.06"
    width={width}
  >
    <title>Artboard 3</title>
    <path
      d="M10.89,10.67s4.44-6.52,14.67,0,13.33,1.1,13.33,1.1V29.18s-3.11,5.5-14.89,0-13.11,0-13.11,0Z"
      fill="#f26f6f"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <line
      x1="10.89"
      y1="5.77"
      x2="10.89"
      y2="49.29"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

FlagIcon.defaultProps = {width: '100%'};
FlagIcon.propTypes = {width: PropTypes.string};

export default FlagIcon;
