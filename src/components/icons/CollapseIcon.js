import React from 'react';
import PropTypes from 'prop-types';

const CollapseIcon = ({width, color, expanded}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 25">
    {expanded ? (
      <g fill="none" fillRule="evenodd">
        <path d="M0 .5h24v24H0z" />
        <path
          fill={color}
          d="M19 19.5H5v-14h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"
        />
        <path fill={color} d="M8 11.5h8v2H8z" />
      </g>
    ) : (
      <g fill="none" fillRule="evenodd">
        <path d="M0 .5h24v24H0z" />
        <path
          fill={color}
          d="M19 19.5H5v-14h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"
        />
        <path fill={color} d="M8 11.5h8v2H8z" />
        <path fill={color} d="M13 8.5v8h-2v-8z" />
      </g>
    )}
  </svg>
);

CollapseIcon.defaultProps = {width: '100%', color: '#1D1F23', expanded: true};
CollapseIcon.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
  expanded: PropTypes.bool
};

export default CollapseIcon;
