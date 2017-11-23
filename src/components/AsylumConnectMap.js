import React from 'react';
import {
  Link,
} from 'react-router-dom';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

import AsylumConnectMarker from "./AsylumConnectMarker";

const styles = (theme) => ({
  link: {
    color: theme.palette.primary[500],
    fontWeight: '600'
  },
  infoWindow: {
    lineHeight: '1.4rem',
    cursor: 'pointer'
  }
});

class AsylumConnectMap extends React.Component {

  render() { //console.log(this.props);
    const { resources } = this.props.mapProps;
    const { classes, history } = this.props;
    return (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: 39.8333333, lng: -98.585522 }}
        {...this.props.mapProps}
      >
      {
        resources && resources.length ?
        resources.map((resource) => {

          var points = resource.locations.length ? resource.locations : [{lat: resource.lat, lng: resource.lng, region: resource.region}];

          return points.map((location) => {
            return (
              <AsylumConnectMarker key={location.id} position={{lat: location.lat, lng: location.long ? location.long : location.lng}} >
                <InfoWindow>
                  <Typography type="body2" className={classes.infoWindow} onClick={(ev) => {history.push('/resource/'+resource.slug)}}>
                    <strong style={{fontWeight: "600"}}>{location.name ? location.name : resource.name}</strong>
                    {location.region ? 
                      <span>
                        <br />
                        {location.region}
                      </span>
                    : <span>
                          <br />
                          {location.address}
                          <br />
                          {location.city ? location.city+", " : null}
                          {location.state ? location.state+" " : null}
                          {location.zip_code ? location.zip_code :  null}
                        </span>
                    }
                    <br />
                    {location.address ? 
                      <a href={"https://maps.google.com?daddr="+location.address+','+(location.city ? location.city+", " : '')+(location.state ? location.state+" " : '')+(location.zip_code ? location.zip_code : '')} target="_blank" className={classes.link} onClick={(ev) => {ev.stopPropagation()}}>Directions to here</a>
                    : null}
                    

                  </Typography>
                </InfoWindow>
              </AsylumConnectMarker>
            )
          })
          
        })
        : null 
      }
    </GoogleMap>);
  }
}
export default withGoogleMap(withStyles(styles)(AsylumConnectMap));
