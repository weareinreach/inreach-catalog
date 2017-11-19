import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import fetch from 'node-fetch';

import config from '../config/config.js';
import createList from '../helpers/createList';

import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import RedHeartIcon from './icons/RedHeartIcon';

const styles = theme => ({
  viewYourFavoritesText: {
    color: theme.palette.secondary[500],
    fontWeight: '300',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class SaveToFavoritesButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
    };

    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
    this.handleSaveToFavorites = this.handleSaveToFavorites.bind(this);
  }

  handleCreateList(listId) {
    const payload = {
      created_by_user_id: this.props.user,
      title: 'My List',
    };
    createList(payload, this.props.session)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        this.props.handleListNew(
          Object.assign({}, payload, data.collection, {
            fetchable_list_items: [],
          }),
        );
        this.handleSaveToFavorites(data.collection.id);
      })
      .catch(error => {
        console.warn(error);
      });
  }

  handleMenuOpen(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleMenuClose() {
    this.setState({open: false});
  }

  handleRemoveFavorite(listId) {
    this.handleMenuClose();
    const {resourceId} = this.props;
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/collections/${listId}/items/${resourceId}?fetchable_type=Opportunity`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: this.props.session,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 200) {
          this.props.handleListRemoveFavorite(listId, resourceId);
        } else {
          Promise.reject(response);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  }

  handleSaveToFavorites(listId) {
    this.handleMenuClose();
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/collections/${listId}/items`;
    const payload = JSON.stringify({
      fetchable_id: this.props.resourceId,
      fetchable_type: 'Opportunity',
    });
    const options = {
      method: 'POST',
      headers: {
        Authorization: this.props.session,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 200) {
          this.props.handleListAddFavorite(listId, this.props.resourceId);
        } else {
          Promise.reject(response);
        }
      })
      .catch(error => {
        console.warn(error);
      });
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
    return (
      <div>
        <Button onClick={lists.length ? handleMenuOpen : handleCreateList}>
          <Typography type="display4" className={classes.viewYourFavoritesText}>
            Save To Favorites
            <RedHeartIcon width={'38px'} fill={isFavorite} />
          </Typography>
        </Button>
        <Menu
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
        </Menu>
      </div>
    );
  }
}

SaveToFavoritesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }),
  ).isRequired,
  resourceId: PropTypes.number.isRequired,
  session: PropTypes.string.isRequired,
  user: PropTypes.number.isRequired,
};

export default withStyles(styles)(SaveToFavoritesButton);
