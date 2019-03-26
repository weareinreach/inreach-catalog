import React from 'react';
import PropTypes from 'prop-types';

const RedHeartIcon = ({fill, width}) => (
  <svg id="88983ac7-7882-4eb7-b306-145ffa9c5242" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="11 11 28 28" width={width}><title>icon-redheart</title><path d="M34.22,16C30,12.63,25,19,25,19s-5-6.36-9.22-3-3,6.83-2.42,7.73l.08.12h.06c.09.14.25.33.44.56h0c1.2,1.4,3.85,4.06,5,5S25,35,25,35s4.92-4.49,6.14-5.56a69.88,69.88,0,0,0,5.08-5.16h0a5.42,5.42,0,0,0,.37-.48l0-.08h0v.06l0,0C37.22,22.82,38.48,19.35,34.22,16Z" fill={ fill ? "#CC4747" : "none" } stroke="#CC4747" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
);

RedHeartIcon.defaultProps = {
  fill: false,
  width: '100%',
};

RedHeartIcon.propTypes = {
  fill: PropTypes.bool,
  width: PropTypes.string
};

export default RedHeartIcon;
