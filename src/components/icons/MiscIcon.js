import React from 'react';
import PropTypes from 'prop-types';

const ResourceMiscIcon = ({width, fillColor, strokeColor}) => (
	<svg
		width={width}
		viewBox="0 2.06 523.875 504.568"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g
			fill="none"
			fillrule="evenodd"
			transform="matrix(0.524546, 0, 0, 0.528675, 97.790863, 113.669998)"
		>
			<ellipse
				stroke={strokeColor}
				fill={fillColor}
				cx="312.619"
				cy="265.171"
				rx="494.245"
				ry="471.138"
			/>
			<path
				fill="rgb(255, 255, 255)"
				d="M 488 192 L 336 192 L 336 248 C 336 287.7 303.7 320 264 320 C 224.3 320 192 287.7 192 248 L 192 126.4 L 127.1 165.4 C 107.8 176.9 96 197.8 96 220.2 L 96 267.5 L 16 313.7 C 0.7 322.5 -4.6 342.1 4.3 357.4 L 84.3 496 C 93.1 511.3 112.7 516.5 128 507.7 L 231.4 448 L 368 448 C 403.3 448 432 419.3 432 384 L 448 384 C 465.7 384 480 369.7 480 352 L 480 288 L 488 288 C 501.3 288 512 277.3 512 264 L 512 216 C 512 202.7 501.3 192 488 192 Z M 635.7 154.6 L 555.7 16 C 546.9 0.7 527.3 -4.5 512 4.3 L 408.6 64 L 306.4 64 C 294.4 64 282.7 67.4 272.5 73.7 L 239 94.6 C 229.6 100.4 224 110.7 224 121.7 L 224 248 C 224 270.1 241.9 288 264 288 C 286.1 288 304 270.1 304 248 L 304 160 L 488 160 C 518.9 160 544 185.1 544 216 L 544 244.5 L 624 198.3 C 639.3 189.4 644.5 169.9 635.7 154.6 Z"
			/>
		</g>
	</svg>
);

ResourceMiscIcon.defaultProps = {
	width: '110%',
	fillColor: '#5073B3',
	strokeColor: '#FFF'
};
ResourceMiscIcon.propTypes = {
	width: PropTypes.string,
	fillColor: PropTypes.string,
	strokeColor: PropTypes.string
};

export default ResourceMiscIcon;
