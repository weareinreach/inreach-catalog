import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import OffsiteLink from './OffsiteLink';
import Language from './Language';
import Account from './Account';
import RedHeartIcon from './icons/RedHeartIcon';
import AsylumConnectButton from './AsylumConnectButton';

const styles = theme => ({
  root: {
    padding: '10 0 10 0'
  },
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300'
  }
});

const NavDesktop = (props) => {
  const classes = props.classes;
  return (
    <Grid container
          align='center'
          direction='row'
          justify='space-around'
          spacing={0}
          className={classes.root}>
      
      <Grid item md={5}>
        <OffsiteLink />
      </Grid>
      
      <Grid item md={2}>
        <AsylumConnectButton variant='primary'>find resource</AsylumConnectButton>
      </Grid>
      
      <Grid item md={1}>
        <Language />
      </Grid>
      
      <Grid item md={1}>
        <Account />
      </Grid>
      
      <Grid item md={3}>
        <Button className={classes.viewYourFavoritesText}> View Your Favorites<RedHeartIcon width={'45px'}/></Button>
      </Grid>
    </Grid>
  )
}

NavDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavDesktop);
