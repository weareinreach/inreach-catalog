import React from 'react';
import PropTypes from 'prop-types';
import Button from "material-ui/Button";
import Fa from 'react-fontawesome';
import withWidth from './withWidth';
import { withStyles } from 'material-ui/styles';
import breakpoints from '../theme/breakpoints';

const styles = theme => ({
  infographicButtonContainer: {
    height: '1em',
    left: '120px',
    position: 'absolute', 
    top: '10px', 
    zIndex: '1000',
    marginRight: '1em',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
      textAlign: 'center',
      top: 'auto',
      left: 'auto',
      zIndex: '1',
      marginTop: '1rem',
      marginRight: '0'
    }
  },
  infographicButton: {
    backgroundColor: theme.palette.common.white,
    minHeight: '0px'
  },
  infographicButtonIcon: {
    paddingRight: '0.5rem'
  },
  smallerButton: {
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '11px',
    fontFamily: 'Roboto,sans-serif',
    letterSpacing: '0',
    lineHeight: '1.2',
    alignItems: 'flex-start'
  },
  infographicLink: {
    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Roboto,sans-serif',
      color: theme.palette.common.white,
      fontWeight: 'normal',
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  }
});

class AsylumConnectInfographicButton extends React.Component {
  render() {
    const {classes} = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    return(
      <div className={classes.infographicButtonContainer}>
        {!isMobile && <Button raised dense href={this.props.url} target="_blank" className={classes.infographicButton} classes={{label: classes.smallerButton}}>
          <Fa name="map-o" className={classes.infographicButtonIcon} /><span>{this.props.text}</span>
        </Button>}
        {isMobile && <a href={this.props.url} className={classes.infographicLink} target="_blank">{this.props.text}</a>}
      </div>
    )
  }
}

AsylumConnectInfographicButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default withWidth(withStyles(styles)(AsylumConnectInfographicButton));