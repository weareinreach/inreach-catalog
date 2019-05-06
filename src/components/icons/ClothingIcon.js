import React from 'react';
import PropTypes from 'prop-types';

const ClothingIcon = ({width, fillColor}) => (
  <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
width={width} viewBox='0 0 36 38'>
    <defs>
        <path id='a' d='M0 .075h34.925V35H0z' />
    </defs>
    <g fill='none' fillRule='evenodd'>
        <g transform='translate(.26 1.534)'>
            <mask id='b' fill='#fff'>
                <use xlinkHref='#a' />
            </mask>
            <path fill={fillColor} d='M34.925 17.537C34.925 27.182 27.107 35 17.462 35 7.82 35 0 27.182 0 17.537 0 7.892 7.82.074 17.462.074c9.645 0 17.463 7.818 17.463 17.463'
            mask='url(#b)' />
        </g>
        <g stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'>
            <path d='M22.618 18.894c1.37 0 2.857-.571 2.857-.571s-.327-5.137-1.428-6c-1.102-.863-3.715-1.429-3.715-1.429 0 .76-1.276 1.715-2.571 1.715-1.295 0-2.572-.954-2.572-1.713 0 0-2.613.564-3.714 1.427-1.101.863-1.428 6-1.428 6s1.488.571 2.857.571'
            />
            <path d='M23.19 14.323c-.425.424-.572 1.393-.572 2.286v10s-1.554.857-4.857.857c-3.304 0-4.857-.572-4.857-.572V16.61c0-.893-.148-1.862-.572-2.286M15.19 10.896s1.946.284 2.57.284c.626 0 2.572-.286 2.572-.286'
            />
        </g>
    </g>
</svg>
);

ClothingIcon.defaultProps = { width: '100%', fillColor: '#5073B3' }
ClothingIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default ClothingIcon;
