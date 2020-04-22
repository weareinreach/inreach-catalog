import React from 'react';
import PropTypes from 'prop-types';

const TravelIcon = ({width, fillColor, strokeColor}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    viewBox="0 0 38 39"
  >
    <defs>
      <path id="a" d="M0 35.862V.077h35.362v35.785z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1.059 .732)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill={fillColor}
          d="M35.362 17.969c0 9.882-7.915 17.893-17.681 17.893C7.916 35.862 0 27.852 0 17.969 0 8.087 7.916.076 17.68.076c9.766 0 17.681 8.01 17.681 17.893"
          mask="url(#b)"
        />
      </g>
      <g
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      >
        <path d="M25.328 26.343H12.39a1.698 1.698 0 0 1-1.687-1.708V14.414c0-.943.749-1.737 1.681-1.737h12.938c.932 0 1.693.794 1.693 1.737v10.221c0 .944-.755 1.708-1.687 1.708z" />
        <path d="M21.947 12.677h-6.188V10.97c0-.629.503-1.138 1.125-1.138h3.938c.621 0 1.125.51 1.125 1.138v1.708zM12.384 26.339h1.688V12.677h-1.688zM23.634 26.339h1.688V12.677h-1.688zM20.822 20.646l-1.125 1.423 1.125 1.424 1.125-1.424zM17.447 16.377a.85.85 0 0 1-.844.854.85.85 0 0 1-.844-.854.85.85 0 0 1 .844-.854.85.85 0 0 1 .844.854z" />
      </g>
    </g>
  </svg>
);

TravelIcon.defaultProps = {
  width: '100%',
  fillColor: '#5073B3',
  strokeColor: '#FFF',
};
TravelIcon.propTypes = {
  width: PropTypes.string,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
};

export default TravelIcon;
