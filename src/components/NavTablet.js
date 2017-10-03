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
import Button from 'material-ui/Button'

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
    <Grid container spacing={0}
          align='baseline'
          direction='row'
          justify='space-around'
          style={{padding: '10 0 10 0'}}>
      
      {/* Language Component */}
      <Grid item md={2}>
        <Language />
      </Grid>
      
      {/* Language Component */}
      <Grid item md={2}>
        <Language />
      </Grid>
      
      {/* Account Component */}
      <Grid item md={3}>
        <Account />
      </Grid>
      
      {/* Favorite Link */}
      <Grid item md={5}>
        <Button>View Your Favorites <RedHeartIcon width={'45px'}/></Button>
      </Grid>
    </Grid>
  )
}

NavTablet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTablet);

// {/* Hide Offsite Link for tablet*/} 
//       <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
//           <MenuIcon />
//         </IconButton>