import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';

import AsylumConnectMarker from './AsylumConnectMarker';

const styles = theme => ({
  link: {
    color: theme.palette.secondary[500],
    fontWeight: '600'
  },
  infoWindow: {
    lineHeight: '1.4rem',
    cursor: 'pointer'
  }
});

class AsylumConnectMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.updateBounds = this.updateBounds.bind(this);
    this.onMapMounted = this.onMapMounted.bind(this);
  }

  componentWillUpdate(nextProps) {
    /*if(typeof nextProps.mapProps.center == "undefined" 
        && nextProps.resources.length) {
      this.updateBounds(nextProps.resources);
    }*/
  }

  onMapMounted(ref) {
    this.map = ref;

    /*google.maps.event.addListener(ref, 'zoom_changed', function() {
      let referencePoint = new google.maps.LatLng(lat, lng);
      let nearestInfographic = false;
      infographics.some((infographic, index) => {
        if(google.maps.geometry.spherical
            .computeDistanceBetween(
              referencePoint, 
              new google.maps.LatLng(infographic.center.lat, infographic.center.lng)
            ) <= milesToMeters(infographic.distance)
        ) {
          nearestInfographic = infographic;
          return true;
        }
      });
    });*/
  }

  updateBounds(resources) {
    let self = this;
    const bounds = new google.maps.LatLngBounds();
    if (typeof this.props.searchCenter == 'object' && this.props.searchCenter) {
      bounds.extend(this.props.searchCenter);
      bounds.extend({
        lat: this.props.searchCenter.lat - 0.1,
        lng: this.props.searchCenter.lng - 0.1
      });
      bounds.extend({
        lat: this.props.searchCenter.lat + 0.1,
        lng: this.props.searchCenter.lng + 0.1
      });
    }
    resources.map(resource => {
      let points = resource.locations.length
        ? resource.locations
        : [{lat: resource.lat, lng: resource.lng, region: resource.region}];
      points.map(location => {
        if (!location.lat || (!location.lng && !location.long)) return null;
        //exclude from bounds calculations the locations more than 50 miles away
        if (
          google &&
          google.maps &&
          google.maps.geometry &&
          google.maps.geometry.spherical &&
          google.maps.geometry.spherical.computeDistanceBetween &&
          self.props.searchCenter &&
          self.props.mapMaxDistance &&
          !isNaN(self.props.mapMaxDistance) &&
          google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(
              self.props.searchCenter.lat,
              self.props.searchCenter.lng
            ),
            new google.maps.LatLng(
              location.lat,
              location.long ? location.long : location.lng
            )
          ) >
            self.props.mapMaxDistance * 1609.34
        )
          return null;
        bounds.extend({
          lat: location.lat,
          lng: location.long ? location.long : location.lng
        });
        bounds.extend({
          lat: location.lat - 0.1,
          lng: location.long ? location.long - 0.1 : location.lng - 0.1
        });
        bounds.extend({
          lat: location.lat + 0.1,
          lng: location.long ? location.long + 0.1 : location.lng + 0.1
        });
      });
    });
    if (this.map) {
      this.map.fitBounds(bounds);
    }
  }

  render() {
    const {classes, history, resources, infographic, t} = this.props;
    const defaultCenter = {
      lat: parseFloat(t('39.8333333')),
      lng: parseFloat(t('-98.585522'))
    };
    const defaultZoom = 4;

    let center = defaultCenter,
      zoom = defaultZoom;

    if (resources.length) {
      this.updateBounds(resources);
    } else if (this.props.searchCenter) {
      center = this.props.searchCenter;
      zoom = 8;
    }

    if (this.map && (resources.length || !this.props.searchCenter)) {
      let centerLatLng = this.map.getCenter();
      center = {lat: centerLatLng.lat(), lng: centerLatLng.lng()};
      zoom = this.map.getZoom();
    }

    return (
      <div className="map-area">
        {infographic && (
          <AsylumConnectInfographicButton
            type="button"
            url={infographic.url ? infographic.url : null}
            list={infographic.list ? infographic.list : null}
            text={infographic.name}
          />
        )}
        <GoogleMap
          defaultZoom={defaultZoom}
          defaultCenter={defaultCenter}
          ref={this.onMapMounted}
          options={{fullscreenControl: false}}
          center={center}
          zoom={zoom}
        >
          {resources && resources.length
            ? resources.map(resource => {
                var points = resource.locations.length
                  ? resource.locations
                  : [
                      {
                        lat: resource.lat,
                        lng: resource.lng,
                        region: resource.region
                      }
                    ];

                return points.map(location => {
                  if (!location.lat || (!location.lng && !location.long))
                    return null;

                  return (
                    <AsylumConnectMarker
                      key={location.id}
                      position={{
                        lat: location.lat,
                        lng: location.long ? location.long : location.lng
                      }}
                    >
                      <InfoWindow>
                        <Typography
                          variant="body2"
                          className={classes.infoWindow}
                          onClick={ev => {
                            history.push('/resource/' + resource.slug);
                          }}
                        >
                          <strong style={{fontWeight: '600'}}>
                            {location.name ? location.name : resource.name}
                          </strong>
                          {location.region ? (
                            <span>
                              <br />
                              {location.region}
                            </span>
                          ) : (
                            <span>
                              <br />
                              {location.address}
                              <br />
                              {location.city ? location.city + ', ' : null}
                              {location.state ? location.state + ' ' : null}
                              {location.zip_code ? location.zip_code : null}
                            </span>
                          )}
                          <br />
                          {location.address ? (
                            <a
                              href={
                                'https://maps.google.com?daddr=' +
                                location.address +
                                ',' +
                                (location.city ? location.city + ', ' : '') +
                                (location.state ? location.state + ' ' : '') +
                                (location.zip_code ? location.zip_code : '')
                              }
                              target="_blank"
                              className={classes.link}
                              onClick={ev => {
                                ev.stopPropagation();
                              }}
                            >
                              Directions to here
                            </a>
                          ) : null}
                        </Typography>
                      </InfoWindow>
                    </AsylumConnectMarker>
                  );
                });
              })
            : null}
        </GoogleMap>
      </div>
    );
  }
}

AsylumConnectMap.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  resources: PropTypes.array
};

export default withGoogleMap(withStyles(styles)(AsylumConnectMap));
