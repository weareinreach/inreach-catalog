import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bodyLink } from '../../theme/sharedClasses';

import Fa from 'react-fontawesome';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  bodyLink: bodyLink(theme),
  container: {
    marginLeft: '5%',
    maxWidth: '90%',
  },
});

const FavoritesListMobile = ({
  anchorEl,
  classes,
  handleDialogOpen,
  handleDialogClose,
  handleListNew,
  handleListSelect,
  handleListRemoveFavorite,
  handleMenuOpen,
  handleMenuClose,
  handleMessageNew,
  loadingResources,
  list,
  lists,
  match,
  open,
  resources,
  session,
  user,
}) => (
  <Grid
    container
    className={classes.container}
    direction="column"
    alignItems="center">
    <Typography className={classes.marginTop} type="display1">
       Your Favorites
    </Typography>
    <Typography type="body1">
      Select one of your favorites lists or{` `}
      <a
        className={classes.bodyLink}
        onClick={() => handleDialogOpen('new')}>
        create a new list
      </a>
    </Typography>
    <Button
      aria-owns={open ? 'favorites-menu' : null}
      aria-haspopup="true"
      onClick={handleMenuOpen}>
      {list ? list.title : 'Select A List'}
      {` `}
      <Fa className={classes.marginLeft} name="chevron-down" />
    </Button>
    {resources.map(resource => (
      <Typography key={resource.id} type="display3">
        {resource.name}
      </Typography>
    ))}
    <Menu
      id="favorites-menu"
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'bottom'}}
      getContentAnchorEl={null}
      open={open}
      onRequestClose={handleMenuClose}
      PaperProps={{style: {maxHeight: '300px'}}}>
      {lists.map(list => (
        <MenuItem key={list.id} onClick={() => handleListSelect(list)}>
          {list.title}
        </MenuItem>
      ))}
    </Menu>
  </Grid>
);

FavoritesListMobile.defaultProps = {
  anchorEl: null,
  list: null,
  session: null,
  user: null,
};

FavoritesListMobile.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.string.isRequired,
  handleDialogOpen: PropTypes.func.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleListSelect: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  loadingResources: PropTypes.bool.isRequired,
  list: PropTypes.object,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(FavoritesListMobile);
