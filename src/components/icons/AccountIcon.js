import React from 'react';
import PropTypes from 'prop-types';

const AccountIcon = ({width, color}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24'>
    <g fill='none' fillRule='evenodd'>
        <path stroke={color} strokeWidth='2' d='M12 11c1.658 0 3-1.342 3-3s-1.342-3-3-3-3 1.342-3 3 1.342 3 3 3zm-7 8h14v-1c0-1.46-3.844-3-7-3s-7 1.54-7 3v1z'
        />
        <path d='M0 0h24v24H0z' />
    </g>
</svg>
);

AccountIcon.defaultProps = { width: '100%', color: '#1D1F23' }
AccountIcon.propTypes = { width: PropTypes.string, color: PropTypes.string }

export default AccountIcon;
