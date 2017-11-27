import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Language from './Language';
import AccountNav from '../AccountNav';
import AsylumConnectButton from '../AsylumConnectButton';
import FavoritesLink from '../FavoritesLink';

import LogoImg from '../../images/asylum-connect.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    maxWidth: theme.maxColumnWidth,
    margin: "0 auto"
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

const NavDesktop = ({
  classes,
  handleLogOut,
  handleRequestOpen,
  session,
  user,
}) => (
  <div className={classes.root}>
    <Link to='/'>
      <IconButton
        className={classes.IconButton}>
        <img src={LogoImg} className={classes.LogoFitHeight} />
      </IconButton>
    </Link>
    <a className="hide--on-screen" href="#">
      <Typography type="headline">AsylumConnect Catalog</Typography>
    </a>
    <a className="hide--on-print" href="http://www.asylumconnect.org/about-us">
      <Typography type="display4">about us</Typography>
    </a>
    <a className="hide--on-print" href="http://www.asylumconnect.org/take-action">
      <Typography type="display4">take action</Typography>
    </a>
    <a className="hide--on-print" href="http://www.asylumconnect.org/seek-lgbtq-asylum">
      <Typography type="display4">get help</Typography>
    </a>
    <a className="hide--on-print" href="http://www.asylumconnect.org/contact-us">
      <Typography type="display4">contact us</Typography>
    </a>
    <Link className="hide--on-print" to='/'>
      <AsylumConnectButton variant="primary">
        find resources
      </AsylumConnectButton>
    </Link>
    <Language />
    <AccountNav
      handleLogOut={handleLogOut}
      handleRequestOpen={handleRequestOpen}
      session={session}
    />
    <FavoritesLink user={user}>view your favorites</FavoritesLink>
  </div>
);

NavDesktop.defaultProps = {
  session: null,
  user: null,
};

NavDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(NavDesktop);
