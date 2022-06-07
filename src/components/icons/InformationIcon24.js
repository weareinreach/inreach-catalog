import React from 'react';
import PropTypes from 'prop-types';

const InformationIcon24 = ({fillColor}) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM7.7 10.5H6.3V6.3H7.7V10.5ZM7.7 4.9H6.3V3.5H7.7V4.9Z"
			fill={fillColor}
		/>
	</svg>
);

InformationIcon24.defaultProps = {
	fillColor: '#2D4A80'
};
InformationIcon24.propTypes = {
	fillColor: PropTypes.string
};

export default InformationIcon24;
