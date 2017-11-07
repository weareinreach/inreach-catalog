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
    lineHeight: '1.4rem'
  }
});

class AsylumConnectMap extends React.Component {

  render() { //console.log(this.props);
    const { resources } = this.props.mapProps;
    const { classes } = this.props;
    return (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: 39.8333333, lng: -98.585522 }}
        {...this.props.mapProps}
      >
      {
        resources && resources.length ?
        resources.map((resource) => { console.log(resource);

          var points = resource.locations.length ? resource.locations : [{lat: resource.lat, lng: resource.lng, region: resource.region}];

          return points.map((location) => {
            return (
              <AsylumConnectMarker key={resource.id} position={{lat: location.lat, lng: location.long ? location.long : location.lng}} >
                <InfoWindow>
                  <Link to={'/resource/'+resource.slug} style={{display: "block"}}>
                    <Typography type="body2" className={classes.infoWindow}>
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
                      {/*<Link to={"#"} className={classes.link}>Directions to here</Link>*/}

                    </Typography>
                  </Link>
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
