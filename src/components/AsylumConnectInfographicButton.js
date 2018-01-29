import React from 'react';
import PropTypes from 'prop-types';
import Button from "material-ui/Button";
import Fa from 'react-fontawesome';

const AsylumConnectInfographicButton = (props) => {
  const {classes} = props;
  return(
    <div className={classes.infographicButtonContainer}>
      <Button raised dense href="test" className={classes.infographicButton} classes={{label: classes.smallerButton}}>
        <Fa name="map-o"/>&nbsp;{props.text}
      </Button>
    </div>
  )
}

AsylumConnectInfographicButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default AsylumConnectInfographicButton;