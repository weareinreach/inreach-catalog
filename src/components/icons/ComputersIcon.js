import React from 'react';
import PropTypes from 'prop-types';

const ComputersIcon = ({width, fillColor}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 36 37">
    <g fill="none" fillRule="evenodd">
      <path
        fill={fillColor}
        d="M35.222 18.176c0 9.92-7.818 17.962-17.462 17.962S.297 28.096.297 18.176C.297 8.255 8.117.214 17.76.214c9.644 0 17.462 8.041 17.462 17.962"
      />
      <path
        d="M20.941 22.732l-.7.7h-4.9l-.7-.7h-7v.7c0 .773.79 1.4 1.765 1.4h16.77c.975 0 1.765-.627 1.765-1.4v-.7h-7zM9.041 22.732v-9.8a1.4 1.4 0 0 1 1.4-1.4h14.7a1.4 1.4 0 0 1 1.4 1.4v9.8"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

ComputersIcon.defaultProps = {width: '100%', fillColor: '#5073B3'};
ComputersIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string,
};

export default ComputersIcon;
