import React from 'react';
import PropTypes from 'prop-types';

const ReviewsIcon = ({width, color}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		viewBox="0 0 96.000000 96.000000"
	>
		<g
			transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
			fill="#000000"
			stroke="none"
		>
			<path
				d="M390 765 l-106 -105 -67 0 -67 0 0 -240 0 -240 260 0 c291 0 310 4
  329 62 15 50 71 314 71 338 0 12 -13 35 -29 51 -29 28 -32 29 -130 29 -56 0
  -101 3 -101 6 0 3 9 19 21 35 26 37 35 94 19 123 -13 25 -49 46 -77 46 -9 0
  -64 -47 -123 -105z m150 16 c0 -10 -9 -30 -21 -45 -16 -20 -48 -107 -49 -133
  0 -2 60 -3 134 -3 87 0 137 -4 142 -11 7 -13 -55 -318 -69 -337 -7 -9 -55 -12
  -178 -12 l-169 0 0 187 0 188 97 97 c53 53 100 95 105 92 4 -3 8 -13 8 -23z
  m-270 -361 l0 -180 -30 0 -30 0 0 180 0 180 30 0 30 0 0 -180z"
			/>
		</g>
	</svg>
);

ReviewsIcon.defaultProps = {width: '100%', color: '#1D1F23'};
ReviewsIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default ReviewsIcon;
