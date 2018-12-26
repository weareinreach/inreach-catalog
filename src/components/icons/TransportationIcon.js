import React from 'react';
import PropTypes from 'prop-types';

const TransportationIcon = ({width, fillColor}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <defs>
        <style dangerouslySetInnerHTML={{__html: ".cls-1{fill:"+fillColor+";}.cls-2,.cls-3{fill:none;stroke:#000;stroke-width:0.5px;}.cls-2{stroke-linecap:round;stroke-linejoin:round;}.cls-3{stroke-miterlimit:10;}" }} />
      </defs>
      <title>resource-transportation</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <circle className="cls-1" cx={25} cy={25} r="17.46" />
          <rect className="cls-2" x="17.39" y="15.24" width="15.22" height="17.9" rx={2} ry={2} />
          <rect className="cls-2" x="18.59" y="17.94" width="12.83" height="9.32" rx={1} ry={1} />
          <rect className="cls-3" x="21.74" y="16.22" width="6.53" height="0.8" rx="0.4" ry="0.4" />
          <circle className="cls-2" cx="20.74" cy="30.01" r="1.48" />
          <circle className="cls-2" cx="29.27" cy="30.01" r="1.48" />
          <rect className="cls-2" x="18.76" y="33.14" width="2.4" height="1.63" rx="0.81" ry="0.81" />
          <rect className="cls-2" x="29.04" y="33.14" width="2.4" height="1.63" rx="0.81" ry="0.81" />
        </g>
      </g>
    </svg>
);

TransportationIcon.defaultProps = { width: '100%', fillColor: '#ababab' }
TransportationIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default TransportationIcon;
