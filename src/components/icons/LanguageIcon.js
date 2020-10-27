import React from 'react';
import PropTypes from 'prop-types';

const LanguageIcon = ({width, color, extraStyle}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path d="M6.034 5.366H16.31v10.276H6.034z" />
      <path
        fill={color}
        className={extraStyle}
        d="M11.545 11.819l-1.088-1.075.013-.013a7.501 7.501 0 0 0 1.589-2.796h1.254v-.856h-2.997v-.857H9.46v.857H6.462v.852h4.783a6.728 6.728 0 0 1-1.357 2.295 6.699 6.699 0 0 1-.99-1.435h-.856a7.52 7.52 0 0 0 1.276 1.953l-2.18 2.15.609.607 2.14-2.14 1.332 1.331.326-.873zm2.41-2.171H13.1l-1.927 5.138h.857l.48-1.285h2.033l.484 1.285h.856l-1.927-5.138zm-1.121 2.997l.693-1.854.694 1.854h-1.387z"
      />
      <path
        fill={color}
        className={extraStyle}
        d="M19.034 2.246h-16c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 14h-14l-2 2v-14h16v12z"
      />
    </g>
  </svg>
);

LanguageIcon.defaultProps = {width: '100%', color: '#1D1F23'};
LanguageIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default LanguageIcon;
