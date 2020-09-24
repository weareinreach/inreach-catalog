import React from 'react';
import PropTypes from 'prop-types';

const AirplaneIcon = ({width, fillColor, strokeColor}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 37 39">
    <g fill="none" fillRule="evenodd">
      <circle cx="18.5" cy="19.5" r="17.5" fill={fillColor} />
      <path
        d="M27.247 21.836c.333.078.76-.013.676-.338-.267-1.047-1.04-1.974-2.063-2.379l-4.024-1.68-1.352-3.043c-.272-1.01-.935-1.966-1.691-2.705l-1.691-1.353 1.014 5.75-5.07-1.825a.845.845 0 0 1-.535-.69l-.144-1.882c-.021-.19-.2-.541-.338-.676l-1.014-.677-.628 4.079a1.682 1.682 0 0 0 1.096 1.952l15.764 5.467zM10.338 27.247h17.596"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      />
    </g>
  </svg>
);

AirplaneIcon.defaultProps = {
  width: '100%',
  fillColor: '#5073B3',
  strokeColor: '#FFF',
};
AirplaneIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
};

export default AirplaneIcon;
