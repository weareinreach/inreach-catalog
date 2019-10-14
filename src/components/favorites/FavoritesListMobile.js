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
import Loading from '../Loading';
import AsylumConnectButton from '../AsylumConnectButton';
import AsylumConnectBackButton from '../AsylumConnectBackButton';

import {bodyLink} from '../../theme/sharedClasses';

import ResourceListItem from '../resource/ResourceListItem';
import ListNewFormContainer from './ListNewFormContainer';

const styles = theme => ({
  bodyLink: bodyLink(theme),
  container: {
    //marginLeft: '10%',
    //maxWidth: '80%',
    marginTop: '1rem',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  textCenter: {textAlign: 'center'},
  spacingBottom: {marginBottom: '1rem'},
  spacingLeft: {marginLeft: '1rem'},
  spacingTop: {marginTop: '1rem'},
  backButton: {
    paddingBottom: '0.83em'
  }
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
    <div className={classes.backButton}>
      <AsylumConnectBackButton color="default" onClick={dialog === 'none' ? () => history.push('/') : () => handleRequestOpen('none')} />
    </div>
    {session || publicList
      ? (
        <Typography className={classes.textCenter} variant="display1">
          {publicList ? publicList : 'Favorites'}
        </Typography>
      ) : (
        <Typography className={classNames(classes.spacingBottom, classes.textCenter)} variant="body1">
          Once logged in, you’ll be able to quickly find the organizations and resources you have favorited.
          <br/><br/>
          <AsylumConnectButton
            variant="primary"
            className={classes.spacingTop}
            onClick={(ev) => {handleRequestOpen('login')}}
          >
            Log In
          </AsylumConnectButton>
          <AsylumConnectButton
            variant="secondary"
            className={classes.spacingTop}
            onClick={(ev) => {handleRequestOpen('signup')}}
          >
            Sign Up
          </AsylumConnectButton>

        </Typography>
      )
    }
    {(session || publicList) && (
      <div>
        {/*/^listNew/.test(dialog) && (
          <ListNewFormContainer
            handleListAddFavorite={handleListAddFavorite}
            handleListNew={handleListNew}
            handleMessageNew={handleMessageNew}
            handleRequestClose={() => handleRequestOpen('none')}
            origin={'favoritesList'}
            session={session}
            user={user}
          />
        )*/}
        {/*dialog === 'none' && (*/}
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
                <AsylumConnectButton
                  variant="primary"
                  className={classes.spacingTop}
                  onClick={() => (session 
                    ? handleRequestOpen('share/collection/'+list.id+'/'+list.title)
                    : handleMessageNew('You must be logged in to share resources'))}
                >
                  Share
                </AsylumConnectButton>
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
                  <Loading />
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
        {/*})*/}
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
