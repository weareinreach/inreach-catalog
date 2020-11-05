import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Polygon} from 'react-google-maps';

const AsylumConnectMapPolygon = ({
  paths,
  visible,
  fillColor,
  fillOpacity,
  strokeColor,
  strokeOpacity,
  strokeWeight,
  children
}) => {
  const [open, setOpen] = useState(false);
  // TO-DO:
  // handle outside click events to hide children
  return (
    <>
      <Polygon
        paths={paths}
        visible={visible}
        options={{
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          strokeColor: strokeColor,
          strokeOpacity: strokeOpacity,
          strokeWeight: strokeWeight,
        }}
        onClick={() => setOpen(!open)}
      />
      {open && children}
    </>
  );
};
AsylumConnectMapPolygon.propTypes = {
  paths: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillOpacity: PropTypes.string.isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeOpacity: PropTypes.string.isRequired,
  strokeWeight: PropTypes.string.isRequired
};

export default AsylumConnectMapPolygon;
