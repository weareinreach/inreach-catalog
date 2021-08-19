import React from 'react';
import PropTypes from 'prop-types';

const FacebookIcon = ({style, width}) => (
	<svg
		style={style}
		width={width}
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M5.9845 16H8.96124V8H11.6589L11.938 5.25H8.96124V3.875C8.96124 3.45833 9.02326 3.16667 9.14729 3C9.27132 2.83333 9.57106 2.75 10.0465 2.75H11.938V0H9.2093C7.96899 0 7.12145 0.296872 6.66667 0.890624C6.21188 1.48438 5.9845 2.39583 5.9845 3.625V5.25H4V8H5.9845V16Z"
		/>
	</svg>
);

FacebookIcon.defaultProps = {width: '100%'};
FacebookIcon.propTypes = {width: PropTypes.string};

export default FacebookIcon;
