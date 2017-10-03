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
    <Grid container
          align='baseline'
          direction='row'
          justify='space-around'
          style={{padding: '10 0 10 0'}}
          spacing={0}>
      
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
      <Grid item md={3}>
        <Button> View Your Favorites<RedHeartIcon width={'45px'}/></Button>
      </Grid>
    </Grid>
  )
}

export default NavDesktop;
