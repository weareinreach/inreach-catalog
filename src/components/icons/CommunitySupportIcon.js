import React from 'react';
import PropTypes from 'prop-types';

const CommunitySupportIcon = ({width, fillColor}) => (
  <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
width={width} viewBox='0 0 36 38'>
    <defs>
        <path id='a' d='M0 35V.075h34.925V35z' />
    </defs>
    <g fill='none' fillRule='evenodd'>
        <g transform='translate(.297 1.807)'>
            <mask id='b' fill='#fff'>
                <use xlinkHref='#a' />
            </mask>
            <path fill={fillColor} d='M34.926 17.537C34.926 27.182 27.108 35 17.463 35 7.819 35 0 27.182 0 17.537 0 7.892 7.819.074 17.463.074c9.645 0 17.463 7.818 17.463 17.463'
            mask='url(#b)' />
        </g>
        <path d='M20.363 15.62a2.737 2.737 0 1 1-5.474 0 2.737 2.737 0 0 1 5.474 0zM25.837 18.014a1.71 1.71 0 1 1-3.42 0 1.71 1.71 0 0 1 3.42 0zM9.416 18.014a1.71 1.71 0 1 0 3.42 0 1.71 1.71 0 0 0-3.42 0zM12.152 25.198a5.474 5.474 0 0 1 10.948 0M22.135 22.099a3.484 3.484 0 0 1 5.07 3.1M8.047 25.198a3.484 3.484 0 0 1 5.07-3.1'
        stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'
        />
    </g>
</svg>
);

CommunitySupportIcon.defaultProps = { width: '100%', fillColor: '#5073B3'}
CommunitySupportIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default CommunitySupportIcon;
