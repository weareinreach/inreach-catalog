import React from 'react';
import PropTypes from 'prop-types'

import OffsiteLink from './OffsiteLink';
import Language from './Language';
import Account from './Account';
import RedHeartIcon from './icons/RedHeartIcon';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import widthWidth from './withWidth'

const NavTablet = () => { 
  return (
    <AppBar style={{backgroundColor: 'white'}}>
      <Grid container
            align='center'
            direction='row'
            justify='center'
            style={{padding: '20 0 20 0'}}>
        
        {/* Hide Offsite Link for tablet*/} 
        <Grid item sm={2}>
          <Button style={{padding: '0 20', color: '#6988C0'}}>Drawer</Button>
        </Grid>
        
        {/* Find Resource Link */}
        <Grid item sm={3} >
          <Grid container
            align='center'
            direction='row'
            justify='center'>
            <Button style={{padding: '0 20', color: '#6988C0', backgroundColor: 'white', border:'2px solid #6988C0', borderRadius: '20px'}}>Find Resources</Button>
          </Grid>
        </Grid>
        
        {/* Language Component */}
        <Grid item sm={2}>
          <Language />
        </Grid>
        
        {/* Account Component */}
        <Grid item sm={2}>
          <Account />
        </Grid>
        
        {/* Favorite Link */}
        <Grid item sm={3}>
          <Grid container
            align='center'
            direction='row'>
            <Grid item sm={10} style={{textAlign: 'right', paddingRight: '0'}}><Typography type="display3">View Your Favorites</Typography></Grid>
            <Grid item sm={2} style={{paddingLeft:'0'}}><RedHeartIcon/></Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default NavTablet;
