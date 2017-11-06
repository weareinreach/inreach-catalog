import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import PinpointIcon from "./icons/PinpointIcon";

const AsylumConnectMap = (props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} icon={{
        url: "http://asylum-connect-catalog-staging.herokuapp.com/img/icon-pinpoint.svg",
        anchor: new google.maps.Point(25,50),
        scaledSize: new google.maps.Size(50,50)
    }} />
  </GoogleMap>

export default withGoogleMap(AsylumConnectMap);
