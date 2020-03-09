import React from 'react';
import PropTypes from 'prop-types';

const ResourceMiscIcon = ({width, fillColor, strokeColor}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 35 37">
    <defs>
      <path id="a" d="M0 35V.075h34.925V35z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill={fillColor}
        d="M34.926 18.463c0 9.645-7.818 17.463-17.463 17.463C7.819 35.926 0 28.108 0 18.463 0 8.818 7.819 1 17.463 1c9.645 0 17.463 7.818 17.463 17.463"
      />
      <path
        fill={strokeColor}
        fillRule="nonzero"
        d="M14.672 20.22h-4.35L8.828 24H8l4.307-10.752h.476L17 24h-.842l-1.487-3.78zm-4.08-.673h3.831l-1.457-3.86a18.75 18.75 0 0 1-.44-1.26c-.131.469-.276.894-.432 1.275l-1.501 3.845zm12.196-5.735c-1.343 0-2.4.43-3.172 1.29-.771.858-1.157 2.035-1.157 3.53 0 1.528.364 2.714 1.091 3.559.728.845 1.768 1.267 3.12 1.267a8.45 8.45 0 0 0 2.476-.344v.659c-.708.249-1.592.373-2.651.373-1.504 0-2.688-.485-3.553-1.457-.864-.972-1.296-2.33-1.296-4.072 0-1.09.206-2.049.619-2.879a4.479 4.479 0 0 1 1.78-1.922c.774-.452 1.673-.678 2.699-.678 1.045 0 1.98.195 2.805.586l-.3.674a5.433 5.433 0 0 0-2.461-.586z"
      />
    </g>
  </svg>
);

ResourceMiscIcon.defaultProps = {
  width: '100%',
  fillColor: '#5073B3',
  strokeColor: '#FFF'
};
ResourceMiscIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string
};

export default ResourceMiscIcon;
