import React from 'react';
import PropTypes from 'prop-types';

const FoodIcon = ({width, fillColor}) => (
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
      <g transform="translate(.26 1.898)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill={fillColor}
          d="M34.925 17.537C34.925 27.182 27.107 35 17.462 35 7.818 35 0 27.182 0 17.537 0 7.892 7.82.074 17.462.074c9.645 0 17.463 7.818 17.463 17.463"
          mask="url(#b)"
        />
      </g>
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
        d="M23.38 14.254c0-2.047-1.143-3.707-2.552-3.707-1.408 0-2.55 1.66-2.55 3.707 0 1.847.79 3.374 2.004 3.656l-.032 9.873c0 .297.243.54.541.54h.075c.297 0 .54-.243.54-.54l-.032-9.873c1.216-.282 2.005-1.809 2.005-3.656zM15.714 10.547h-.089a.357.357 0 0 0-.356.356v3.05a.356.356 0 0 1-.355.353h-.09a.357.357 0 0 1-.355-.356V10.904a.357.357 0 0 0-.356-.357h-.089a.357.357 0 0 0-.356.356v3.05a.357.357 0 0 1-.355.353h-.089a.357.357 0 0 1-.356-.356v-3.047a.357.357 0 0 0-.356-.356h-.089a.357.357 0 0 0-.355.356v5.057c0 .962.546 1.771 1.455 1.96l-.033 9.863c0 .297.244.54.54.54h.077c.296 0 .54-.243.54-.54l-.033-9.863c.91-.189 1.455-.998 1.455-1.96v-5.056a.356.356 0 0 0-.355-.357z"
      />
    </g>
  </svg>
);

FoodIcon.defaultProps = {width: '100%', fillColor: '#5073B3'};
FoodIcon.propTypes = {width: PropTypes.string, fillColor: PropTypes.string};

export default FoodIcon;
