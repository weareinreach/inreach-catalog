import React from 'react';
import {Marker} from 'react-google-maps';

const markerURL = '/img/icon-pinpoint.png';

class AsylumConnectMarker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleMarkerClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleCloseClick() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <Marker
        {...this.props}
        icon={{
          url: markerURL,
          anchor: new window.google.maps.Point(11, 32),
          scaledSize: new window.google.maps.Size(22, 32),
        }}
        onClick={this.handleMarkerClick}
      >
        {this.state.open &&
          React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {
              onCloseClick: this.handleCloseClick,
            });
          })}
      </Marker>
    );
  }
}

export default AsylumConnectMarker;
