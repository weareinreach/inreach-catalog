import React from 'react';
import PropTypes from 'prop-types';
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import { MenuList, MenuItem } from 'material-ui/Menu';
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
  },
  infographicListLink: {
    color: theme.palette.common.black
  },
  infographicListItem: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      paddingTop: '5px',
      paddingBottom: '5px',
      height: 'auto'
    }
  }
});

class AsylumConnectInfographicButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
    }
    this.id = "infographic--" + Date.now().toString();

    this.handleToggleRequest = this.handleToggleRequest.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleListClick = this.handleListClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  handleOutsideClick(event) {
    var watch = document.querySelectorAll('#'+this.id);
    if(watch.length) {
      if(!watch[0].contains(event.target)) {
        this.handleToggleRequest();
      }
    }
    
  }

  handleToggleRequest() {
    if(!this.state.open) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }

    this.setState({
      open: !this.state.open
    })
    
  }

  handleOnClick(event) {
    if(this.props.list && this.props.list.length) {
      event.preventDefault();
      this.handleToggleRequest();
    }
  }

  handleListClick(event) {
    this.handleToggleRequest();
  }

  render() {
    const {classes} = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    return(
      <div className={classes.infographicButtonContainer}>
        {!isMobile && <Button raised dense href={this.props.url} target="_blank" onClick={this.handleOnClick} className={classes.infographicButton} classes={{label: classes.smallerButton}}>
          <Fa name="map-o" className={classes.infographicButtonIcon} /><span>{this.props.text}</span>
        </Button>}
        {isMobile && <a href={this.props.url ? this.props.url : "#"} className={classes.infographicLink} target="_blank" onClick={this.handleOnClick}>{this.props.text}</a>}
        {this.state.open && this.props.list && this.props.list.length ? 
          <Paper id={this.id}>
            <MenuList role="menu">
              {this.props.list.map((item, i) => (
                <a href={item.url} target="_blank" className={classes.infographicListLink} onClick={this.handleListClick}><MenuItem key={i} button={true} className={classes.infographicListItem}>{item.name}</MenuItem></a>
                )
              )}
              {/*resourceTypes.map((filter, i) => (
                  <List key={i} index={i} classes={listClasses} onChange={onChange} selected={selected} {...filter} />
                )
              )*/}
            </MenuList>
          </Paper>
        : null }
      </div>
    )
  }
}

AsylumConnectInfographicButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  list: PropTypes.array
};

export default withWidth(withStyles(styles)(AsylumConnectInfographicButton));