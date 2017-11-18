import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import {bodyLink} from '../../theme/sharedClasses';

import ListNewFormContainer from './ListNewFormContainer';

const styles = theme => ({
  bodyLink: bodyLink(theme),
  container: {
    marginLeft: '10%',
    maxWidth: '80%',
    marginTop: '1rem',
  },
  textCenter: {textAlign: 'center'},
  spacingBottom: {marginBottom: '1rem'},
  spacingLeft: {marginLeft: '1rem'},
  spacingTop: {marginTop: '1rem'},
});

const FavoritesListMobile = ({
  anchorEl,
  classes,
  dialog,
  handleDialogOpen,
  handleDialogClose,
  handleListNew,
  handleListSelect,
  handleListRemoveFavorite,
  handleMenuOpen,
  handleMenuClose,
  handleMessageNew,
  history,
  loadingResources,
  list,
  lists,
  match,
  open,
  resources,
  session,
  user,
}) => (
  <Grid container className={classes.container} direction="column">
    <IconButton
      onClick={
        dialog === 'none' ? () => history.push('/') : handleDialogClose
      }>
      <Fa name="arrow-left" />
    </IconButton>
    {dialog === 'new' && (
      <ListNewFormContainer
        handleListNew={handleListNew}
        handleMessageNew={handleMessageNew}
        handleRequestClose={handleDialogClose}
        session={session}
        user={user}
      />
    )}
    {dialog === 'none' && (
      <div>
        <Typography className={classes.textCenter} type="display1">
          Your Favorites
        </Typography>
        <Typography className={classes.spacingTop} type="body1">
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
          className={classes.spacingTop}
          onClick={handleMenuOpen}>
          {list ? list.title : 'Select A List'}
          {` `}
          <Fa className={classes.spacingLeft} name="chevron-down" />
        </Button>
        <div className={classes.spacingTop}>
          <Grid item>
            {loadingResources ? (
              <Fa name="spinner" spin />
            ) : (
              <div>
                {resources.map(resource => (
                  <div>
                    <Typography type="display3">
                      {resource.name}
                    </Typography>
                    <IconButton onClick={() => handleListRemoveFavorite(resource.id)}>
                      <Fa name="times"/>
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
            {!loadingResources &&
              list &&
              resources.length === 0 && (
                <Typography type="body1">
                  You haven't added any resources to this list yet.
                </Typography>
              )}
          </Grid>
        </div>
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
      </div>
    )}
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
