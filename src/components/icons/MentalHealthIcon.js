import React from 'react';
import PropTypes from 'prop-types';

const MentalHealthIcon = ({width, fillColor}) => (
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
      <g transform="translate(.023 1.807)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill={fillColor}
          d="M34.926 17.537C34.926 27.182 27.108 35 17.463 35 7.819 35 0 27.182 0 17.537 0 7.892 7.819.074 17.463.074c9.645 0 17.463 7.818 17.463 17.463"
          mask="url(#b)"
        />
      </g>
      <g
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      >
        <path d="M20.511 28.388c0-.488 1.858-1.412 3.257-1.643 1.399-.23 2.035-.487 2.035-1.232 0-.744-.407-.77-.407-1.231 0-.463.407-.411.407-.411M25.803 23.46l.407-.41-.407-1.233s1.222-.256 1.222-.82c0-.565-1.807-3.697-1.807-3.697s.178-.718.178-2.053c0-1.437-2.01-5.748-7.327-5.748-5.318 0-7.328 4.132-7.328 6.57 0 3.234 3.257 6.775 3.257 8.213 0 1.436-2.443 4.106-2.443 4.106" />
        <path d="M13.346 16.012H15.3l.977 1.629.977-3.257 1.303 4.885 1.628-6.514.977 4.886.652-1.629h1.303" />
      </g>
    </g>
  </svg>
);

MentalHealthIcon.defaultProps = {width: '100%', fillColor: '#5073B3'};
MentalHealthIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string
};

export default MentalHealthIcon;
