import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  arrowDown: {
    transform: "rotate3D(1,0,0,0deg)",
    transition: "all 0.2s"
  },
  arrowUp: {
    transform: "rotate3D(1,0,0,-180deg)",
    transition: "all 0.2s"
  }

}

const ChevronIcon = ({width, direction}) => (
  <svg width={width} viewBox="0 0 20 20" style={direction === "down" ? styles.arrowDown : styles.arrowUp} xmlns="http://www.w3.org/2000/svg">
    <path fill="#6A88C0" stroke="#6A88C0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
</svg>
);

ChevronIcon.defaultProps = { width: '100%', direction: 'down' }
ChevronIcon.propTypes = { width: PropTypes.string}

export default ChevronIcon;
