import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = ({width}) => (
  <svg id="717ec356-097d-4411-8993-8c27f97e1c69" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width}><title>icon-search</title><path d="M28.56,25.72a6.94,6.94,0,1,0-2.14,1.14" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/><path d="M32.63,35.23l-4.07-9.51a6.94,6.94,0,0,1-2.14,1.14l4,9.32a.92.92,0,0,0,1.21.48l.53-.23A.92.92,0,0,0,32.63,35.23Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/></svg>
);

SearchIcon.defaultProps = { width: '100%' }
SearchIcon.propTypes = { width: PropTypes.string }

export default SearchIcon;
