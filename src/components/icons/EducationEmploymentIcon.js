import React from 'react';
import PropTypes from 'prop-types';

const EducationEmploymentIcon = ({width, fillColor}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 36 36'>
    <g fill='none' fillRule='evenodd'>
        <path fill={fillColor} d='M35.187 18.345c0 9.645-7.818 17.463-17.463 17.463C8.08 35.808.26 27.99.26 18.345.26 8.7 8.08.882 17.724.882c9.645 0 17.463 7.818 17.463 17.463'
        />
        <g stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'>
            <path d='M8.838 17.686l6.153 1.926c1.606.389 3.876.443 5.539 0l6.154-1.926'
            />
            <path d='M26.068 26.074H9.453c-.428 0-.615-.495-.615-.923V13.766c0-.428.187-.615.615-.615h16.615c.429 0 .616.187.616.615v11.385c0 .428-.187.923-.616.923zM19.915 10.69h-4.308c-.428 0-.616.186-.616.615v1.846h5.539v-1.846c0-.429-.187-.616-.615-.616z'
            />
            <path d='M18.684 17.15a.923.923 0 1 1-1.847 0 .923.923 0 0 1 1.847 0z'
            />
        </g>
    </g>
</svg>
);

EducationEmploymentIcon.defaultProps = { width: '100%', fillColor: '#5073B3' }
EducationEmploymentIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default EducationEmploymentIcon;
