import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import ChevronIcon from './icons/ChevronIcon';

const styles = theme => ({
  root: {
    display: 'inline',
    width: 'auto'
  },
  centerTextAlign: {
    textAlign: 'center',
  },
  AsylumConnectMenu: {
    marginTop: '56px'
  }
});

class Language extends React.Component { 
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose() {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <IconButton className={classes.root}>
          <Typography
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            type="body1"
            className={classes.centerTextAlign}>
          Language
          </Typography>
          <ChevronIcon width={'20px'}/>
        </IconButton>
        <Menu 
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          className={classes.AsylumConnectMenu}>
            <MenuItem onClick={this.handleRequestClose}>English</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Chinese</MenuItem>
        </Menu>
      </div>
    );
  }
};

Language.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Language);
