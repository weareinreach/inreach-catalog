import React from 'react';
import PropTypes from 'prop-types';

const SportsEntertainmentIcon = ({width, fillColor}) => (
  <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
width={width} viewBox='0 0 36 38'>
    <defs>
        <path id='a' d='M0 35V.075h34.925V35z' />
        <path id='c' d='M.87 4.054A7.914 7.914 0 0 0 5.533.044H.87v4.01z' />
        <path id='e' d='M3.353 6.5A7.873 7.873 0 0 0 .533.492V6.5h2.82z' />
        <path id='g' d='M5.526.92A7.898 7.898 0 0 0 3.463.646c-1.164 0-2.27.252-3.264.705V3.07h5.327V.92z'
        />
        <path id='i' d='M.574 5.713A7.86 7.86 0 0 1 2.526.34h.847v5.373h-2.8z'
        />
        <path id='k' d='M.014.085a7.91 7.91 0 0 0 3.985 2.95V.086H.014z' />
    </defs>
    <g fill='none' fillRule='evenodd'>
        <g transform='translate(.26 1.388)'>
            <mask id='b' fill='#fff'>
                <use xlinkHref='#a' />
            </mask>
            <path fill={fillColor} d='M34.925 17.537C34.925 27.182 27.107 35 17.462 35 7.818 35 0 27.182 0 17.537 0 7.892 7.82.074 17.462.074c9.645 0 17.463 7.818 17.463 17.463'
            mask='url(#b)' />
        </g>
        <g stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.618'>
            <path d='M25.614 18.925a7.89 7.89 0 1 1-15.782-.002 7.89 7.89 0 0 1 15.782.002z'
            />
            <path d='M17.723 16.382l2.674 1.942-1.02 3.144H16.07l-1.022-3.144zM17.295 13.457l.428 2.925M12.633 17.591l2.416.733M16.07 21.468l-1.682 2.163M19.376 21.468l1.593 1.756M20.397 18.325l2.396-.966'
            />
        </g>
        <g transform='translate(19.26 22.388)'>
            <mask id='d' fill='#fff'>
                <use xlinkHref='#c' />
            </mask>
            <path stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.618'
            d='M1.709.936L5.5.043l.796 3.041-2.491 2.172L.87 3.858z' mask='url(#d)'
            />
        </g>
        <g transform='translate(22.26 12.388)'>
            <mask id='f' fill='#fff'>
                <use xlinkHref='#e' />
            </mask>
            <path stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.618'
            d='M.533 4.97L.953.14l2.65-.605 1.772 3.208L3.255 6.5z' mask='url(#f)'
            />
        </g>
        <g transform='translate(14.26 10.388)'>
            <mask id='h' fill='#fff'>
                <use xlinkHref='#g' />
            </mask>
            <path stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.618'
            d='M3.035 3.07L.199 1.372l.739-3.223 3.292-.292L5.526.897z' mask='url(#h)'
            />
        </g>
        <g transform='translate(9.26 13.388)'>
            <mask id='j' fill='#fff'>
                <use xlinkHref='#i' />
            </mask>
            <path stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.618'
            d='M3.373 4.203l-2.94 1.51-2.345-2.33L-.42.433 2.546.34z' mask='url(#j)'
            />
        </g>
        <g transform='translate(11.26 23.388)'>
            <mask id='l' fill='#fff'>
                <use xlinkHref='#k' />
            </mask>
            <path stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.618'
            d='M-.173.085l3.3.158L4 3.432 1.235 5.245l-2.58-2.07z' mask='url(#l)' />
        </g>
    </g>
</svg>
);

SportsEntertainmentIcon.defaultProps = { width: '100%', fillColor: '#5073B3' }
SportsEntertainmentIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default SportsEntertainmentIcon;
