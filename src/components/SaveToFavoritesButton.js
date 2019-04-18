import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import AsylumConnectPopUp from './AsylumConnectPopUp';
import RedHeartIcon from './icons/RedHeartIcon';

import breakpoints from '../theme/breakpoints';
import theWidth from './theWidth';
import {
  createList,
  createListFavorite,
  deleteListFavorite,
} from '../helpers/odasRequests';

const styles = theme => ({
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    '&:hover': {
      color: theme.palette.secondary[900]
    },
    fontWeight: theme.typography.fontWeightMedium,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlue: {color: theme.palette.common.blue},
});

class SaveToFavoritesButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
    };

    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.handleSaveToFavorites = this.handleSaveToFavorites.bind(this);
  }

  handleCreateList(currentTarget) {
    const {session, user} = this.props;
    const payload = {
      created_by_user_id: user,
      title: 'My List',
    };
    createList(payload, session)
      .then(data => {
        this.props.handleListNew(
          Object.assign({}, payload, data.collection, {
            fetchable_list_items: [],
          }),
        );
        this.handleSaveToFavorites(data.collection.id);
        this.setState({open: true, anchorEl: currentTarget});
      })
      .catch(this.handleFetchError);
  }

  handleFetchError(error) {
    const {handleLogOut, handleMessageNew, handleRequestOpen} = this.props;
    if (error.response && error.response.status === 401) {
      handleMessageNew('Your session has expired. Please log in again.');
      handleLogOut();
    } else if (error.response && error.response.status === 403) {
      handleRequestOpen('password');
    } else {
      handleMessageNew('Oops! Something went wrong.');
    }
  }

  handleMenuOpen(event) {
    const {currentTarget} = event;
    if (!this.props.session) {
      return this.props.handleMessageNew(
        'You must be logged in to save favorites',
      );
    } else if (this.props.lists.length < 1) {
      this.handleCreateList(currentTarget);
    } else {
      this.setState({open: true, anchorEl: currentTarget});
    }
  }

  handleMenuClose() {
    this.setState({open: false});
  }

  handleRemoveFavorite(listId) {
    this.handleMenuClose();
    const {
      handleListRemoveFavorite,
      handleMessageNew,
      resourceId,
      session,
    } = this.props;
    deleteListFavorite(listId, resourceId, session).then(() => {
      handleListRemoveFavorite(listId, resourceId);
    });
  }

  handleSaveToFavorites(listId) {
    this.handleMenuClose();
    const {resourceId, session} = this.props;
    createListFavorite(listId, resourceId, session)
      .then(() => {
        this.props.handleListAddFavorite(listId, this.props.resourceId);
      })
      .catch(this.handleFetchError);
  }

  render() {
    const {
      handleCreateList,
      handleMenuOpen,
      handleMenuClose,
      handleRemoveFavorite,
      handleSaveToFavorites,
    } = this;
    const {anchorEl, open} = this.state;
    const {
      classes,
      handleListAddFavorite,
      handleListRemoveFavorite,
      handleListNew,
      lists,
      resourceId,
      session,
    } = this.props;

    const isFavorite = lists.some(list =>
      list.fetchable_list_items.some(item => item.fetchable_id === resourceId),
    );
    
    const buttonLabel =
      theWidth() < breakpoints['sm'] ? '' : 'Save to Favorites';

    const isMobile = theWidth() < breakpoints['sm'];

    return (
      <div className={this.props.className}>
        <IconButton onClick={handleMenuOpen}>
          <RedHeartIcon width={'24px'} fill={isFavorite} />
        </IconButton>
        <AsylumConnectPopUp
          id="favorites-menu"
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'bottom'}}
          getContentAnchorEl={null}
          open={open}
          onRequestClose={handleMenuClose}
          PaperProps={{style: {maxHeight: '300px'}}}>
          {lists.map(list => {
            const isFavoriteItem = list.fetchable_list_items.some(
              item => item.fetchable_id === resourceId,
            );
            return (
              <MenuItem
                key={list.id}
                onClick={() =>
                  isFavoriteItem
                    ? handleRemoveFavorite(list.id)
                    : handleSaveToFavorites(list.id)}>
                {list.title}
                <RedHeartIcon width={'24px'} fill={isFavoriteItem} />
              </MenuItem>
            );
          })}
          <MenuItem
            className={classes.textBlue}
            onClick={() =>
              this.props.handleRequestOpen(
                `listNew/saveToFavorites/${resourceId}`,
              )}>
            <span className={classes.textBlue}>+ Create New List</span>
          </MenuItem>
        </AsylumConnectPopUp>
      </div>
    );
  }
}

SaveToFavoritesButton.defaultProps = {
  session: null,
  user: null,
};

SaveToFavoritesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
  resourceId: PropTypes.number.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withStyles(styles)(SaveToFavoritesButton);
