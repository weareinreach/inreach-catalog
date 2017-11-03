import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Menu, {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  container: {
    maxWidth: '720px',
    margin: '3rem 0 1rem 0',
  },
  footer: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.darkWhite,
    padding: '3rem 0',
  },
  marginBottom: {marginBottom: '2rem'},
  marginLeft: {marginLeft: '1rem'},
  marginRight: {marginRight: '1rem'},
  marginTop: {marginTop: '2rem'},
  mainRow: {
    borderBottom: `1px solid ${theme.palette.common.darkGrey}`,
    margin: '1rem 0 3rem 0',
    paddingBottom: '1rem',
  },
  textWhite: {color: theme.palette.common.darkWhite},
});

const FavoritesList = ({
  anchorEl,
  classes,
  handleMenuOpen,
  handleMenuClose,
  handleRequestOpen,
  open,
}) => (
  <Grid container direction="column" alignItems="center">
    <Typography className={classes.marginTop} type="display1">
      Favorites
    </Typography>
    <Typography type="body1">
      Your favorites lists are only visible to you and anyone you share them
      with.
    </Typography>
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="space-between">
      <Grid container className={classes.mainRow} justify="space-between">
        <Button
          aria-owns={open ? 'favorites-menu' : null}
          aria-haspopup="true"
          onClick={handleMenuOpen}>
          My List <Fa className={classes.marginLeft} name="chevron-down" />
        </Button>
        <div>
          <AsylumConnectButton variant="secondary">Print</AsylumConnectButton>
          <AsylumConnectButton className={classes.marginLeft} variant="primary">
            Share
          </AsylumConnectButton>
          <AsylumConnectButton
            className={classes.marginLeft}
            onClick={() => handleRequestOpen('listNew')}
            variant="primary">
            <Fa className={classes.marginRight} name="plus" /> Create New List
          </AsylumConnectButton>
        </div>
      </Grid>
      <Divider />
    </Grid>
    <Grid
      container
      className={classes.footer}
      direction="column"
      alignItems="center">
      <Typography
        className={classNames(classes.marginBottom, classes.textWhite)}
        type="display2">
        Share "My List" Favorites List
      </Typography>
      <Grid container justify="center">
        <AsylumConnectButton className={classes.marginRight} variant="primary">
          Print
        </AsylumConnectButton>
        <AsylumConnectButton className={classes.marginLeft} variant="primary">
          Share
        </AsylumConnectButton>
      </Grid>
    </Grid>
    <Menu
      id="favorites-menu"
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'bottom'}}
      getContentAnchorEl={null}
      open={open}
      onRequestClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>List</MenuItem>
    </Menu>
  </Grid>
);

export default withStyles(styles)(FavoritesList);
