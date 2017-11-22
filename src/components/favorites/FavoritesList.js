import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Menu, {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';
import ListNewDialog from './ListNewDialog';
import ResourceListItem from '../resource/ResourceListItem';
import ShareDialog from '../share/ShareDialog';
import ActionButton from '../ActionButton';

const styles = theme => ({
  container: {
    maxWidth: '720px',
    margin: '3rem 0 5rem 0',
  },
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem',
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
  dialog,
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
    className={classes.marginBottom}
    direction="column"
    alignItems="center">
    <Typography className={classes.marginTop} type="display1">
      Favorites
    </Typography>
    <Typography type="body1">
      {session
        ? 'Your favorites lists are only visible to you and anyone you share them with.'
        : 'You must be logged in to use favorites.'
      }
    </Typography>
    {session && (
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
            {list ? list.title : 'Select A List'}
            {` `}
            <Fa className={classes.marginLeft} name="chevron-down" />
          </Button>
          <div>
            {list && (
              <AsylumConnectButton variant="secondary">Print</AsylumConnectButton>
            )}
            {list && (
              <AsylumConnectButton
                className={classes.marginLeft}
                onClick={() => handleDialogOpen('share')}
                variant="primary">
                Share
              </AsylumConnectButton>
            )}
            <AsylumConnectButton
              className={classes.marginLeft}
              onClick={() => handleDialogOpen('new')}
              variant="primary">
              <Fa className={classes.marginRight} name="plus" /> Create New List
            </AsylumConnectButton>
          </div>
        </Grid>
        <Grid container justify="center">
          <div>
            {loadingResources ? (
              <Fa name="spinner" spin />
            ) : (
              <div>
                {resources.map(resource =>
                  <ResourceListItem
                    isOnFavoritesList={true}
                    handleListRemoveFavorite={handleListRemoveFavorite}
                    handleMessageNew={handleMessageNew}
                    key={resource.id}
                    resource={resource}
                  />
                )}
              </div>
            )}
            {!loadingResources && list && resources.length === 0 && (
              <Typography type="body1">
                You haven't added any resources to this list yet.
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    )}

    {list && (
      <Grid
        container
        className={classes.footer}
        direction="column"
        alignItems="center">
        <Typography
          className={classNames(classes.marginBottom, classes.textWhite)}
          type="display2">
          {`Share "${list.title}" Favorites List`}
        </Typography>
        <Grid container justify="center">
          <AsylumConnectButton className={classes.marginRight} variant="primary">
            Print
          </AsylumConnectButton>
          <AsylumConnectButton
            className={classes.marginLeft}
            onClick={() => handleDialogOpen('share')}
            variant="primary">
            Share
          </AsylumConnectButton>
        </Grid>
      </Grid>
    )}

    <Dialog open={dialog !== 'none'} onRequestClose={handleDialogClose}>
      <div className={classes.dialogBody}>
        <ActionButton
          onClick={handleDialogClose}
          >&times;</ActionButton>
      {dialog === 'new' &&
        <ListNewDialog
          handleMessageNew={handleMessageNew}
          handleListNew={handleListNew}
          handleRequestClose={handleDialogClose}
          session={session}
          user={user}
        />
      }
      {dialog === 'share' &&
        <ShareDialog
          handleMessageNew={handleMessageNew}
          handleRequestClose={handleDialogClose}
          session={session}
          listId={list.id}
          listTitle={list.title}
          shareType="collection"
        />
      }
      </div>
    </Dialog>

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

FavoritesList.defaultProps = {
  anchorEl: null,
  list: null,
  session: null,
  user: null,
};

FavoritesList.propTypes = {
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

export default withStyles(styles)(FavoritesList);
