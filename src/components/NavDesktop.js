import React from 'react';

import OffsiteLink from './OffsiteLink';
import Language from './Language';
import Account from './Account';
import RedHeartIcon from './icons/RedHeartIcon';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const NavDesktop = () => { 
  return (
    <AppBar style={{backgroundColor: 'white'}}>
      <Grid container
            align='center'
            direction='row'
            justify='center'
            style={{padding: '20 0 20 0'}}>
            
        {/* Offsite Link */}  
        <Grid item md={5}>
          <OffsiteLink />
        </Grid>
        
        {/* Find Resource Link */}
        <Grid item md={3} lg={2}>
          <Grid container
            align='center'
            direction='row'
            justify='center'>
            <Button style={{padding: '0 20', color: '#6988C0', backgroundColor: 'white', border:'2px solid #6988C0', borderRadius: '20px'}}>Find Resources</Button>
          </Grid>
        </Grid>
        
        {/* Language Component */}
        <Grid item md={1}>
          <Language />
        </Grid>
        
        {/* Account Component */}
        <Grid item md={1} lg={2}>
          <Account />
        </Grid>
        
        {/* Favorite Link */}
        <Grid item md={2} lg={2}>
          <Grid container
            align='center'
            direction='row'>
            <Grid item md={9} style={{textAlign: 'right', paddingRight: '0'}}><Typography type="display3">View Your Favorites</Typography></Grid>
            <Grid item md={3} style={{paddingLeft:'0'}}><RedHeartIcon/></Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default NavDesktop
