import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import PinpointIcon from "./icons/PinpointIcon";

const AsylumConnectMap = (props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} icon={PinpointIcon} />
  </GoogleMap>

export default withGoogleMap(AsylumConnectMap);
