import React from 'react';
import PropTypes from 'prop-types';

const FavoritesIcon = ({width, color}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24'>
    <g fill='none' fillRule='evenodd'>
        <path d='M0 .116h24v24H0z' />
        <path fill={color} d='M16.5 3.116c-1.74 0-3.41.795-4.5 2.05a6.037 6.037 0 0 0-4.5-2.05C4.42 3.116 2 5.49 2 8.511c0 3.708 3.4 6.73 8.55 11.32L12 21.116l1.45-1.295C18.6 15.241 22 12.22 22 8.511c0-3.021-2.42-5.395-5.5-5.395zM12.1 18.37l-.1.098-.1-.098C7.14 14.142 4 11.346 4 8.51 4 6.55 5.5 5.078 7.5 5.078c1.54 0 3.04.971 3.57 2.315h1.87c.52-1.344 2.02-2.315 3.56-2.315 2 0 3.5 1.471 3.5 3.433 0 2.835-3.14 5.63-7.9 9.859z'
        />
    </g>
</svg>
);

FavoritesIcon.defaultProps = { width: '100%', color: '#1D1F23' }
FavoritesIcon.propTypes = { width: PropTypes.string, color: PropTypes.string }

export default FavoritesIcon;
