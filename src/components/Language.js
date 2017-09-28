import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

export default class Language extends React.Component { 
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
    return (
      <div>
        <Typography
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          type="body1"
          style={{textAlign:'center'}}>
        Language
        </Typography>
        <Menu 
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}>
            <MenuItem onClick={this.handleRequestClose}>English</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Chinese</MenuItem>
        </Menu>
      </div>
    );
  }
};