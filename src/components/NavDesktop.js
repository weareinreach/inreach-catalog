import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

import AccountNav from './AccountNav';
import AsylumConnectButton from './AsylumConnectButton';
import FavoritesLink from './FavoritesLink';
import Language from './Language';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    maxWidth: theme.maxColumnWidth,
    margin: '0 auto',
    zIndex: '1'
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
  transparentSpace: {
    outline: "none",
     border: "0px",
     boxSizing: "none",
     backgroundColor: "transparent",
     width: '180px'
  }
});

const safetyExitStyle  = {
      zIndex: '2',
      textAlign: 'center',
      margin: '20px auto 0 auto',
      top: '5px',
      position: 'fixed',
      '@media (min-width:1260px)': { left: '45%' },
      [`@media screen and (max-width: 1259px) and (min-width: 1187px)`]: { left: '43%' },
      [`@media screen and (max-width: 1186px) and (min-width: 1072px`]: { left: '40%' },
      [`@media screen and (max-width: 1071px) and (min-width: 1000px)`]: { left: '38%' },
      [`@media screen and (max-width: 999px)`]: { left: '37%' },
      [`@media screen and and (max-width: 976px)`]: { left: ' 36.5%' }
}

const NavDesktop = ({
  classes,
  handleLogOut,
  handleRequestOpen,
  locale,
  logo,
  session,
}) => {
  return (
    <div>
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
          href="https://asylumconnect.org/get-help-for-myself-lgbt-asylum-seeker/"
        >
          <Typography variant="h6">get help</Typography>
        </a>
        <a className="hide--on-print" href="https://asylumconnect.org/contact/">
          <Typography variant="h6">contact us</Typography>
        </a>
        <a className="hide--on-print" href="/">
          <div className={classes.transparentSpace}></div>
        </a>
        <Language />
        <AccountNav
          handleLogOut={handleLogOut}
          handleRequestOpen={handleRequestOpen}
          locale={locale}
          session={session}
        />
        <FavoritesLink locale={locale}>view your favorites</FavoritesLink>
      </div>
      <div class="safetyExit" style={safetyExitStyle} >
      <a className="hide--on-print" href="https://www.google.com/">
        <AsylumConnectButton variant="primary">
          safety exit
        </AsylumConnectButton>
      </a>
      </div>
    </div>
  );
};

NavDesktop.defaultProps = {session: null};

NavDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(NavDesktop);
