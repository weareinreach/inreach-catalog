import React from 'react';
import PropTypes from 'prop-types'

import OffsiteLink from './OffsiteLink';
import Language from './Language';
import Account from './Account';
import AsylumConnectButton from './AsylumConnectButton';
import RedHeartIcon from './icons/RedHeartIcon';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/Menu'
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import widthWidth from './withWidth'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const NavTablet = (props) => { 
  const classes = props.classes;
  return (
    <AppBar style={{backgroundColor: 'white'}}>
    <Toolbar>
      {/* Hide Offsite Link for tablet*/} 
      <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
          <MenuIcon />
        </IconButton>
      <Grid container
            align='center'
            direction='row'
            justify='center'
            style={{padding: '20 0 20 0'}}>
        
        {/* Find Resource Link */}
        <Grid item sm={3} >
          <AsylumConnectButton variant='primary'>find resource</AsylumConnectButton>
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
            direction='row'
            justify='center'>
          <Typography type="display4">View Your Favorites</Typography>
          <RedHeartIcon width={'45px'}/>
          </Grid>
        </Grid>
      </Grid>
      </Toolbar>
    </AppBar>
  )
}

NavTablet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTablet);
