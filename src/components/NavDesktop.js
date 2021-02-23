import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AccountNav from './AccountNav';
import AsylumConnectButton from './AsylumConnectButton';
import FavoritesLink from './FavoritesLink';
import Language from './Language';

const styles = (theme) => ({
  root: {
    position: 'sticky',
    top: '0px',
    zIndex: '1000',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    backgroundColor: 'white',
    '@media(min-width:1640px)': {
      padding: '10px 15%',
    },
    '@media(max-width:1639px)': {
      padding: '10px 9%',
    },
    '@media(max-width:1550px)': {
      padding: '10px 7%',
    },
    '@media(max-width:1440px)': {
      padding: '10px 5%',
    },
    '@media(max-width:1400px)': {
      padding: '10px 2%',
    },
    '@media(max-width:1315px)': {
      padding: '10px 0',
    },
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)'
  },
  displayInherit: {
    display: 'inherit',
  },
  IconButton: {
    display: 'inline',
    height: '60px',
    width: 'auto',
    maxWidth: '65px',
  },
  languageIconColor: {
    fill: theme.palette.secondary[400],
    color: theme.palette.secondary[400],
  }
});

const NavDesktop = ({
  classes,
  handleLogOut,
  handleRequestOpen,
  locale,
  logo,
  session,
}) => {
  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={logo} alt="logo button" className={classes.IconButton} />
      </Link>
      <a className="hide--on-screen" href="/#">
        <Typography variant="h1">AsylumConnect Catalog</Typography>
      </a>
      <a className="hide--on-print" href="https://asylumconnect.org/mission/">
        <Typography variant="h6">about us</Typography>
      </a>
      <a className="hide--on-print" href="https://asylumconnect.org/donate/">
        <Typography variant="h6">take action</Typography>
      </a>
      <a
        className="hide--on-print"
        href="https://asylumconnect.org/faqs/"
      >
        <Typography variant="h6">get help</Typography>
      </a>
      <a className="hide--on-print" href="https://asylumconnect.org/contact/">
        <Typography variant="h6">contact us</Typography>
      </a>
      <a className="hide--on-print" href="https://www.google.com/">
        <AsylumConnectButton variant="primary">safety exit</AsylumConnectButton>
      </a>
      <Language colorClass={classes.languageIconColor} useIcon enableOverlay />
      <AccountNav
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        locale={locale}
        session={session}
      />
      <FavoritesLink locale={locale}>view your favorites</FavoritesLink>
    </div>
  );
};

NavDesktop.defaultProps = { session: null };

NavDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(NavDesktop);
