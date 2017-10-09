import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import OffsiteLink from './OffsiteLink';
import Language from './Language';
import Account from './Account';
import AsylumConnectButton from './AsylumConnectButton';
import FavoritesButton from './FavoritesButton'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5 0 5 0'
  },
  displayInherit: {
    display:'inherit'
  },
  
});

const NavDesktop = ({ classes, handleRequestOpen }) => (
  <div className={classes.root}>
    <OffsiteLink />
    <AsylumConnectButton variant='primary'>find resource</AsylumConnectButton>
    <Language />
    <Account handleRequestOpen={handleRequestOpen}/>
    <FavoritesButton>view your favorites</FavoritesButton>
  </div>
);

NavDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavDesktop);
