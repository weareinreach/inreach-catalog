import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fa from 'react-fontawesome';
import Button from 'material-ui/Button';
import Close from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import Menu, {MenuItem} from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import {bodyLink} from '../../theme/sharedClasses';

import ResourceListItem from '../resource/ResourceListItem';
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
}) => (
  <Grid container className={classes.container} direction="column">
    <IconButton
      onClick={
        dialog === 'none' ? () => history.push('/') : () => handleRequestOpen('none')
      }>
      <KeyboardArrowLeft />
    </IconButton>
    {session || publicList
      ? (
        <Typography className={classes.textCenter} variant="display1">
          {publicList ? publicList : 'Favorites'}
        </Typography>
      ) : (
        <Typography className={classNames(classes.spacingTop, classes.textCenter)} variant="body1">
          You must be logged in to use favorites.
        </Typography>
      )
    }
    {(session || publicList) && (
      <div>
        {/^listNew/.test(dialog) && (
          <ListNewFormContainer
            handleListAddFavorite={handleListAddFavorite}
            handleListNew={handleListNew}
            handleMessageNew={handleMessageNew}
            handleRequestClose={() => handleRequestOpen('none')}
            origin={'favoritesList'}
            session={session}
            user={user}
          />
        )}
        {dialog === 'none' && (
          <div>
            {!publicList ?
              <div>
                <Typography className={classes.textCenter} variant="display1">
                  Your Favorites
                </Typography>
                <Typography className={classes.spacingTop} variant="body1">
                  Select one of your favorites lists or{` `}
                  <a
                    className={classes.bodyLink}
                    onClick={() => handleRequestOpen('listNew/favoritesList')}>
                    create a new list.
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
              </div> 
            : null }
            <div className={classes.spacingTop}>
              <Grid item>
                {loadingResources ? (
                  <Fa name="spinner" spin />
                ) : (
                  <div>
                    {resources.map(resource => (
                      <ResourceListItem
                        format={'favoritesMobile'}
                        isOnPublicList={publicList}
                        handleMessageNew={handleMessageNew}
                        handleListRemoveFavorite={handleRemoveFavorite}
                        isOnFavoritesList
                        history={history}
                        locale={locale}
                        key={resource.id}
                        resource={resource}
                        session={session}
                        user={user}
                      />
                    ))}
                  </div>
                )}
                {!loadingResources &&
                  list &&
                  resources.length === 0 && (
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
              PaperProps={{style: {maxHeight: '300px'}}}>
              {lists.map(list => (
                <MenuItem key={list.id} onClick={() => handleListSelect(list)}>
                  {list.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
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
