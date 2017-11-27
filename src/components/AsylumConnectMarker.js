import React from 'react';
import { Marker } from "react-google-maps";

class AsylumConnectMarker extends React.Component {
  constructor(props, context) { //console.log(props);
    super(props, context)
    this.state = {
      open: false
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  handleMarkerClick() {
    this.setState({
      open: !this.state.open
    });
  }

  handleCloseClick() {
    this.setState({
      open: false
    });
  }


  render() {
    const { children } = this.props;
    return (
      <Marker {...this.props} icon={{
          url: "https://asylum-connect-catalog-staging.herokuapp.com/img/icon-pinpoint.png",
          anchor: new google.maps.Point(11,32),
          scaledSize: new google.maps.Size(22,32),
      }} onClick={this.handleMarkerClick} >
        {this.state.open && React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {
            onCloseClick: this.handleCloseClick
          })
        })}
      </Marker>
    );
  }
}

export default AsylumConnectMarker;