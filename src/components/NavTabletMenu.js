import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import {ChevronIcon} from './icons';
import LogoImg from '../images/logo@2x.png';

const styles = (theme) => ({
  root: {
    display: 'inline',
  },
  LogoFitHeight: {
    maxWidth: '55px',
    /*height: '100%',*/
  },
  AsylumConnectMenu: {
    marginTop: '56px',
  },
});

class NavTabletMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  handleClick(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <IconButton
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.root}
        >
          <img
            src={LogoImg}
            alt="asylumconnect logo"
            className={classes.LogoFitHeight}
          />
          <ChevronIcon width={'40px'} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          className={classes.AsylumConnectMenu}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <a href="https://asylumconnect.org">
              <Typography type="h4">home</Typography>
            </a>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <a href="https://asylumconnect.org/mission/">
              <Typography type="h4">about us</Typography>
            </a>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <a href="https://asylumconnect.org/donate/">
              <Typography type="h4">take action</Typography>
            </a>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <a href="https://asylumconnect.org/get-help-for-myself-lgbt-asylum-seeker/">
              <Typography type="h4">get help</Typography>
            </a>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <a href="https://asylumconnect.org/contact/">
              <Typography type="h4">contact us</Typography>
            </a>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <a href="https://www.google.com/">
              <Typography type="h4">safety exit</Typography>
            </a>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

NavTabletMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabletMenu);
