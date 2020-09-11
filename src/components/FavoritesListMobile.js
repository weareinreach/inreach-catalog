import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Loading from './Loading';
import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectBackButton from './AsylumConnectBackButton';

import {bodyLink} from '../theme';

import ResourceListItem from './ResourceListItem';

const styles = (theme) => ({
  bodyLink: bodyLink(theme),
  container: {
    //marginLeft: '10%',
    //maxWidth: '80%',
    marginTop: '1rem',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  textCenter: {textAlign: 'center'},
  spacingBottom: {marginBottom: '1rem'},
  spacingLeft: {marginLeft: '1rem'},
  spacingTop: {marginTop: '1rem'},
  backButton: {
    paddingBottom: '0.83em',
  },
});

const FavoritesListMobile = ({
  anchorEl,
  classes,
  dialog,
  handleListAddFavorite,
  handleListNew,
  handleListSelect,
  handleMenuOpen,
  handleMenuClose,
  handleMessageNew,
  handleRemoveFavorite,
  handleRequestOpen,
  history,
  loadingResources,
  list,
  lists,
  locale,
  match,
  open,
  publicList,
  resources,
  session,
  user,
  userData,
}) => (
  <Grid container className={classes.container} direction="column">
    <div className={classes.backButton}>
      <AsylumConnectBackButton
        color="default"
        onClick={
          dialog === 'none'
            ? () => history.push('/')
            : () => handleRequestOpen('none')
        }
      />
    </div>
    {session || publicList ? (
      <Typography className={classes.textCenter} variant="h3">
        {publicList ? publicList : 'Favorites'}
      </Typography>
    ) : (
      <Typography
        className={classNames(classes.spacingBottom, classes.textCenter)}
        variant="body1"
      >
        Once logged in, you’ll be able to quickly find the organizations and
        resources you have favorited.
        <br />
        <br />
        <AsylumConnectButton
          variant="primary"
          className={classes.spacingTop}
          onClick={(ev) => {
            handleRequestOpen('login');
          }}
        >
          Log In
        </AsylumConnectButton>
        <AsylumConnectButton
          variant="secondary"
          className={classes.spacingTop}
          onClick={(ev) => {
            handleRequestOpen('signup');
          }}
        >
          Sign Up
        </AsylumConnectButton>
      </Typography>
    )}
    {(session || publicList) && (
      <div>
        <div>
          {!publicList ? (
            <div>
              <Typography className={classes.textCenter} variant="h3">
                Your Favorites
              </Typography>
              <Typography className={classes.spacingTop} variant="body1">
                Select one of your favorites lists or{` `}
                <span
                  className={classes.bodyLink}
                  onClick={() => handleRequestOpen('listNew/favoritesList')}
                >
                  create a new list.
                </span>
              </Typography>
              <AsylumConnectButton
                variant="primary"
                className={classes.spacingTop}
                onClick={() =>
                  session
                    ? handleRequestOpen(
                        'share/collection/' + list._id + '/' + list.name
                      )
                    : handleMessageNew(
                        'You must be logged in to share resources'
                      )
                }
              >
                Share
              </AsylumConnectButton>
              <Button
                aria-owns={open ? 'favorites-menu' : null}
                aria-haspopup="true"
                className={classes.spacingTop}
                onClick={handleMenuOpen}
              >
                {list ? list.name : 'Select A List'}
                {` `}
                <Fa className={classes.spacingLeft} name="chevron-down" />
              </Button>
            </div>
          ) : null}
          <div className={classes.spacingTop}>
            <Grid item>
              {loadingResources ? (
                <Loading />
              ) : (
                <div>
                  {resources.map(
                    (resource) =>
                      resource && (
                        <ResourceListItem
                          format={'favoritesMobile'}
                          isOnPublicList={publicList}
                          handleMessageNew={handleMessageNew}
                          handleListRemoveFavorite={handleRemoveFavorite}
                          isOnFavoritesList
                          history={history}
                          locale={locale}
                          key={resource._id}
                          resource={resource}
                          session={session}
                          user={user}
                          userData={userData}
                        />
                      )
                  )}
                </div>
              )}
              {!loadingResources && list && resources.length === 0 && (
                <Typography variant="body1">
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
            PaperProps={{style: {maxHeight: '300px'}}}
          >
            {lists.map((list) => (
              <MenuItem key={list._id} onClick={() => handleListSelect(list)}>
                {list.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
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
  handleListNew: PropTypes.func.isRequired,
  handleListSelect: PropTypes.func.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleRemoveFavorite: PropTypes.func.isRequired,
  loadingResources: PropTypes.bool.isRequired,
  list: PropTypes.object,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(FavoritesListMobile);
