import React from 'react';

import OffsiteLink from './OffsiteLink';
import Language from './Language';
import Account from './Account';
import RedHeartIcon from './icons/RedHeartIcon';
import AsylumConnectButton from './AsylumConnectButton';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const NavDesktop = () => { 
  return (
    <AppBar style={{backgroundColor: 'white'}}>
      <Grid container
            align='center'
            direction='row'
            justify='space-around'
            style={{padding: '20 0 20 0'}}>
        
        {/* Hide Offsite Link for tablet*/} 
        <Grid item md={5}>
          <OffsiteLink />
        </Grid>
        
        {/* Find Resource Link */}
        <Grid item md={2}>
          <AsylumConnectButton variant='primary'>find resource</AsylumConnectButton>
        </Grid>
        
        {/* Language Component */}
        <Grid item md={1}>
          <Language />
        </Grid>
        
        {/* Account Component */}
        <Grid item md={1}>
          <Account />
        </Grid>
        
        {/* Favorite Link */}
        <Grid item sm={3}>
          <Grid container
            align='center'
            direction='row'
            justify='center'>
            <Typography type="display4">View Your Favorites</Typography>
            <RedHeartIcon width={'45px'}/>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default NavDesktop;
