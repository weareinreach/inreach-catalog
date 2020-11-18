import React from 'react';
import PropTypes from 'prop-types';

import NavTabletMenu from './NavTabletMenu';
import Language from './Language';
import AccountNav from './AccountNav';
import FavoritesLink from './FavoritesLink';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    padding: '10 0 10 0',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)'
  },
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300',
  },
});

const NavTablet = ({
  classes,
  handleLogOut,
  handleRequestOpen,
  locale,
  session,
}) => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      direction="row"
      justify="space-around"
      className={classes.root}
    >
      <Grid item md={2}>
        <NavTabletMenu />
      </Grid>

      <Grid item md={2}>
        <Language />
      </Grid>

      <Grid item md={3}>
        <AccountNav
          handleLogOut={handleLogOut}
          handleRequestOpen={handleRequestOpen}
          locale={locale}
          session={session}
        />
      </Grid>

      <Grid item md={5}>
        <FavoritesLink locale={locale} />
      </Grid>
    </Grid>
  );
};

NavTablet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTablet);
