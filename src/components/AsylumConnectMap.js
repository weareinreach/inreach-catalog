import React from 'react';
import PropTypes from 'prop-types';

import {withGoogleMap, GoogleMap, InfoWindow} from 'react-google-maps';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import AsylumConnectInfographicButton from './AsylumConnectInfographicButton';

import AsylumConnectMarker from './AsylumConnectMarker';

const getLatLong = (location = {}) => {
  const lat = location?.lat;
  const lng = location?.lng || location?.long;
  const parsedLat = parseFloat(lat, 10);
  const parsedLng = parseFloat(lng, 10);

  return {lat: parsedLat, lng: parsedLng};
};

const styles = (theme) => ({
  link: {
    color: theme.palette.secondary[500],
    fontWeight: '600',
  },
  infoWindow: {
    lineHeight: '1.4rem',
    cursor: 'pointer',
  },
});

class AsylumConnectMap extends React.Component {
  constructor(props) {
    super(props);

    this.updateBounds = this.updateBounds.bind(this);
    this.onMapMounted = this.onMapMounted.bind(this);
  }

  onMapMounted(ref) {
    this.map = ref;
  }

  updateBounds(resources) {
    const bounds = new window.google.maps.LatLngBounds();

    if (
      typeof this.props.searchCenter === 'object' &&
      this.props.searchCenter
    ) {
      bounds.extend(this.props.searchCenter);
      bounds.extend({
        lat: this.props.searchCenter?.lat - 0.1,
        lng: this.props.searchCenter?.lng - 0.1,
      });
      bounds.extend({
        lat: this.props.searchCenter?.lat + 0.1,
        lng: this.props.searchCenter?.lng + 0.1,
      });
    }

    resources.forEach((resource) => {
      const locations = resource?.locations || [];
      let points = locations.length
        ? locations
        : resource.lat && resource.lng
        ? [{lat: resource.lat, lng: resource.lng}]
        : [];

      points.forEach((location) => {
        const {lat, lng} = getLatLong(location);

        if (!lat || !lng) {
          return;
        }

        // exclude from bounds calculations the locations more than 50 miles away
        if (
          this.props.searchCenter &&
          this.props.mapMaxDistance &&
          !isNaN(this.props.mapMaxDistance) &&
          window?.google?.maps?.geometry?.spherical?.computeDistanceBetween &&
          window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(
              this.props.searchCenter?.lat,
              this.props.searchCenter?.lng
            ),
            new window.google.maps.LatLng(lat, lng)
          ) >
            this.props.mapMaxDistance * 1609.34
        ) {
          return;
        }

        bounds.extend({lat, lng});
        bounds.extend({
          lat: lat - 0.1,
          lng: lng - 0.1,
        });
        bounds.extend({
          lat: lat + 0.1,
          lng: lng + 0.1,
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
      lng: parseFloat(t('-98.585522')),
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
            ? resources.map((resource) => {
                const points = resource?.locations?.length
                  ? resource.locations
                  : [
                      {
                        lat: resource.lat,
                        lng: resource.lng,
                        region: resource.region,
                      },
                    ];

                return points.map((location) => {
                  const {lat, lng} = getLatLong(location);

                  if (!lat || !lng) {
                    return null;
                  }

                  return (
                    <AsylumConnectMarker
                      key={location.id}
                      position={{lat, lng}}
                    >
                      <InfoWindow>
                        <Typography
                          variant="body2"
                          className={classes.infoWindow}
                          onClick={(ev) => {
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
                              rel="noopener noreferrer"
                              className={classes.link}
                              onClick={(ev) => {
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
  resources: PropTypes.array,
};

export default withGoogleMap(withStyles(styles)(AsylumConnectMap));
