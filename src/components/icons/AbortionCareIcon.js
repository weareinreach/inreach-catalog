import React from 'react';
import PropTypes from 'prop-types';

const AbortionCareIcon = ({width, color}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width={width}
		zoomAndPan="magnify"
		viewBox="0 0 810 809.999993"
		height="1080"
		preserveAspectRatio="xMidYMid meet"
		version="1.0"
	>
		<defs>
			<filter x="0%" y="0%" width="100%" height="100%" id="id1">
				<feColorMatrix
					values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
					color-interpolation-filters="sRGB"
				/>
			</filter>
			<filter x="0%" y="0%" width="100%" height="100%" id="id2">
				<feColorMatrix
					values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0"
					color-interpolation-filters="sRGB"
				/>
			</filter>
			<clipPath id="id3">
				<path
					d="M 169.289062 81 L 641 81 L 641 729 L 169.289062 729 Z M 169.289062 81 "
					clip-rule="nonzero"
				/>
			</clipPath>
		</defs>
	</svg>
);
AbortionCareIcon.defaultProps = {width: '100%', color: '#1D1F23'};
AbortionCareIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default AbortionCareIcon;
