import React from 'react';
import PropTypes from 'prop-types';

const SpeechBubblesIcon = ({width, fillColor, strokeColor}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 38 39'>
    <g fill='none' fillRule='evenodd'>
        <path fill={fillColor} d='M35.413 18.766c0 9.733-7.916 17.622-17.68 17.622C7.968 36.388.05 28.498.05 18.766c0-9.733 7.917-17.622 17.682-17.622 9.764 0 17.68 7.89 17.68 17.622'
        />
        <path stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.7'
        d='M9.729 20.765c0-2.164 2.266-3.918 5.062-3.918 2.797 0 5.063 1.754 5.063 3.918s-2.266 3.919-5.063 3.919a6.383 6.383 0 0 1-1.7-.232l-2.237 1.364.925-1.907c-1.242-.714-2.05-1.854-2.05-3.144z'
        />
        <path stroke={strokeColor} strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.7'
        d='M20.8 22.255a7.044 7.044 0 0 0 1.696-.398l2.42 1.156-1.234-1.743c1.432-.909 2.36-2.332 2.36-3.937 0-2.746-2.701-4.971-6.032-4.971-2.657 0-4.905 1.418-5.71 3.384'
        />
    </g>
</svg>
);

SpeechBubblesIcon.defaultProps = { width: '100%', fillColor: '#5073B3', strokeColor: '#FFF' }
SpeechBubblesIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string, strokeColor: PropTypes.string }

export default SpeechBubblesIcon;
