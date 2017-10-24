import React from 'react';
import PropTypes from 'prop-types';

import NavTabletMenu from './NavTabletMenu';
import Language from './Language';
import AccountNav from '../AccountNav';
import RedHeartIcon from '../icons/RedHeartIcon';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    padding: '10 0 10 0'
  },
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300'
  }
});

const NavTablet = ({ classes, handleRequestOpen }) => { 
  return (
    <Grid container spacing={0}
          alignItems='center'
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
        <AccountNav handleRequestOpen={handleRequestOpen}/>
      </Grid>
      
      <Grid item md={5}>
        <Button className={classes.viewYourFavoritesText}>View Your Favorites <RedHeartIcon width={'45px'}/></Button>
      </Grid>
    </Grid>
  )
}

NavTablet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTablet);
