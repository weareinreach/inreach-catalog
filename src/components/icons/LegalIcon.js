import React from 'react';
import PropTypes from 'prop-types';

const LegalIcon = ({width, fillColor}) => (
  <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
width={width} viewBox='0 0 37 39'>
    <defs>
        <path id='a' d='M0 .075h34.925V35H.001z' />
    </defs>
    <g fill='none' fillRule='evenodd'>
        <g transform='translate(1.297 2.052)'>
            <mask id='b' fill='#fff'>
                <use xlinkHref='#a' />
            </mask>
            <path fill={fillColor} d='M34.925 17.537C34.925 27.181 27.108 35 17.463 35S0 27.181 0 17.537C0 7.893 7.82.074 17.462.074c9.646 0 17.463 7.82 17.463 17.463'
            mask='url(#b)' />
        </g>
        <g stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'>
            <path d='M25.253 21.495a3.085 3.085 0 0 0 3.085-3.085h-6.17a3.085 3.085 0 0 0 3.085 3.085zM25.253 13.1l-2.538 5.31M25.253 13.1l2.538 5.31M12.632 21.495a3.085 3.085 0 0 0 3.085-3.085h-6.17a3.085 3.085 0 0 0 3.085 3.085zM15.17 18.41l-2.538-5.31'
            />
            <path d='M10.094 18.41l2.538-5.31h12.62M18.942 11.295V24.03M23.22 28.36a4.29 4.29 0 0 0-4.277-4.276 4.29 4.29 0 0 0-4.277 4.277h8.554z'
            />
        </g>
    </g>
</svg>
);

LegalIcon.defaultProps = { width: '100%', fillColor: '#5073B3' }
LegalIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default LegalIcon;
