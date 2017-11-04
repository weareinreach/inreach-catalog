import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Language from './Language';
import AccountNav from '../AccountNav';
import AsylumConnectButton from '../AsylumConnectButton';
import FavoritesLink from '../FavoritesLink';

import LogoImg from '../../images/AC-logo.png';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10 2% 10 4%',
  },
  displayInherit: {
    display: 'inherit',
  },
  IconButton: {
    display: 'inline',
    height: '60px',
  },
  LogoFitHeight: {
    height: '100%',
  },
});

const NavDesktop = ({classes, handleLogOut, handleRequestOpen, session}) => (
  <div className={classes.root}>
    <IconButton
      className={classes.IconButton}
      href="http://www.asylumconnect.org">
      <img src={LogoImg} className={classes.LogoFitHeight} />
    </IconButton>
    <a href="http://www.asylumconnect.org/our-organization/">
      <Typography type="display4">about us</Typography>
    </a>
    <a href="">
      <Typography type="display4">take action</Typography>
    </a>
    <a href="">
      <Typography type="display4">get help</Typography>
    </a>
    <a href="http://www.asylumconnect.org/contact-us/">
      <Typography type="display4">contact us</Typography>
    </a>
    <AsylumConnectButton variant="primary">
      find resources
    </AsylumConnectButton>
    <Language />
    <AccountNav
      handleLogOut={handleLogOut}
      handleRequestOpen={handleRequestOpen}
      session={session}
    />
    <FavoritesLink>view your favorites</FavoritesLink>
  </div>
);

NavDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(NavDesktop);
