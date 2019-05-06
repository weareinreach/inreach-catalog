import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import LogoImg from '../../images/logo@2x.png';
import ChevronIcon from '../icons/ChevronIcon';

const styles = theme => ({
  root: {
    display: 'inline',
  },
  LogoFitHeight: {
    maxWidth: '55px'
    /*height: '100%',*/
  },
  AsylumConnectMenu: {
    marginTop: '56px',
  }
});

class NavTabletMenu extends React.Component {
  constructor(props) {
    super(props);
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
        <IconButton
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.root}
          >
          <img src={LogoImg} className={classes.LogoFitHeight}/>
          <ChevronIcon width={'40px'}/>
        </IconButton>
        <Menu 
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          className={classes.AsylumConnectMenu}>
            <MenuItem onClick={this.handleRequestClose}><a href='http://www.asylumconnect.org/'><Typography type='display4'>home</Typography></a></MenuItem>
            <MenuItem onClick={this.handleRequestClose}><a href='http://www.asylumconnect.org/who-we-are'><Typography type='display4'>about us</Typography></a></MenuItem>
            <MenuItem onClick={this.handleRequestClose}><a href='http://www.asylumconnect.org/donate'><Typography type='display4'>take action</Typography></a></MenuItem>
            <MenuItem onClick={this.handleRequestClose}><a href='http://www.asylumconnect.org/seek-lgbtq-asylum'><Typography type='display4'>get help</Typography></a></MenuItem>
            <MenuItem onClick={this.handleRequestClose}><a href='http://www.asylumconnect.org/contact'><Typography type='display4'>contact us</Typography></a></MenuItem>
            <MenuItem onClick={this.handleRequestClose}><Link to='/'><Typography type='display4'>find resource</Typography></Link></MenuItem>
        </Menu>
      </div>
    );
  }
};

NavTabletMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabletMenu);
