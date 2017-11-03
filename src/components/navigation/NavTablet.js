import React from 'react';
import PropTypes from 'prop-types';

import NavTabletMenu from './NavTabletMenu';
import Language from './Language';
import AccountNav from '../AccountNav';
import RedHeartIcon from '../icons/RedHeartIcon';
import FavoritesLink from '../FavoritesLink';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    padding: '10 0 10 0'
  },
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300'
  }
});

const NavTablet = ({
  classes,
  handleLogOut,
  handleRequestOpen,
  session,
  user,
}) => { 
  return (
    <Grid container spacing={0}
          align='center'
          direction='row'
          justify='space-around'
          className={classes.root}>
      
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
          session={session}
        />
      </Grid>
      
      <Grid item md={5}>
        <FavoritesLink user={user}/>
      </Grid>
    </Grid>
  )
}

NavTablet.defaultProps = { user: null };

NavTablet.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.number,
};

export default withStyles(styles)(NavTablet);
