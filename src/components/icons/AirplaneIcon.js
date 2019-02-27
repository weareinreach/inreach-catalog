import React from 'react';
import PropTypes from 'prop-types';

const AirplaneIcon = ({width, fillColor, strokeColor}) => (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
width={width} viewBox='0 0 37 39'>
        <defs>
            <path id='a' d='M0 36.422V.078h35.923v36.344z' />
        </defs>
        <g fill='none' fillRule='evenodd'>
            <g transform='translate(.523 .663)'>
                <mask id='b' fill='#fff'>
                    <use xlinkHref='#a' />
                </mask>
                <path fill='#5073B3' d='M35.924 18.172c0 10.037-8.041 18.173-17.962 18.173C8.042 36.345 0 28.209 0 18.172 0 8.136 8.042 0 17.962 0s17.962 8.136 17.962 18.172'
                mask='url(#b)' />
            </g>
            <path d='M27.662 22.26c.334.078.76-.012.677-.338-.268-1.047-1.04-1.974-2.064-2.378l-4.024-1.68-1.352-3.043c-.272-1.011-.935-1.966-1.691-2.706l-1.691-1.352 1.015 5.749-5.071-1.825a.845.845 0 0 1-.534-.689l-.144-1.883c-.022-.19-.2-.54-.339-.676l-1.014-.676-.628 4.078a1.682 1.682 0 0 0 1.097 1.953l15.763 5.467zM10.753 27.671H28.35'
            stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'
            />
        </g>
    </svg>
);

AirplaneIcon.defaultProps = { width: '100%', fillColor: '#5073B3', strokeColor: '#FFF' }
AirplaneIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string, strokeColor: PropTypes.string }

export default AirplaneIcon;
