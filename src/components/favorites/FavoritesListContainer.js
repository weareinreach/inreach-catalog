import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import breakpoints from '../../theme/breakpoints';
import fetchUserLists from '../../helpers/fetchUserLists';
import deleteListFavorite from '../../helpers/deleteListFavorite';
import OneDegreeResourceQuery from '../../helpers/OneDegreeResourceQuery';
import withWidth from '../withWidth';

import FavoritesList from './FavoritesList';

class FavoritesListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      dialog: 'none',
      lists: [],
      loadingResources: this.props.match.params.listId ? true : false,
      open: false,
      resources: [],
    };

    this.fetchLists = this.fetchLists.bind(this);
    this.fetchResources = this.fetchResources.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleListNew = this.handleListNew.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleListRemoveFavorite = this.handleListRemoveFavorite.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    const {session} = this.props;
    if (session) {
      this.fetchLists(session);
    }
  }

  fetchLists(session) {
    fetchUserLists(session)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        this.setState({lists: data.collections});
        const {listId} = this.props.match.params;
        if (listId) {
          const list = data.collections.find(
            collection => collection.id == listId,
          );
          if (list) {
            this.fetchResources(list.fetchable_list_items);
          }
        }
      })
      .catch(response => {
        console.warn(response);
      });
  }

  fetchResources(resources) {
    this.queryOneDegree = new OneDegreeResourceQuery();
    this.queryOneDegree
      .setIds(resources.map(resource => resource.fetchable_id))
      .fetch({
        type: 'organizations',
        callback: data => {
          this.setState({
            loadingResources: false,
            resources: data.organizations,
          });
        },
      });
  }

  handleDialogOpen(dialog) {
    this.setState({dialog});
  }

  handleDialogClose() {
    this.setState({dialog: 'none'});
  }

  handleListNew(list) {
    this.setState(prevState => ({lists: [...prevState.lists, list]}));
  }

  handleListRemoveFavorite(resourceId) {
    const {match, session} = this.props;
    deleteListFavorite(match.params.listId, resourceId, session)
      .then(response => {
        if (response.status === 200) {
          this.setState(prevState => ({
            resources: prevState.resources.filter(
              resource => resource.id === resourceId,
            ),
          }));
        }
      })
      .catch(error => {
        console.warn(error);
      });
  }

  handleListSelect(list) {
    const {history, user} = this.props;
    history.push(`/favorites/${user}/${list.id}`);
    this.handleMenuClose();
  }

  handleMenuOpen(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleMenuClose() {
    this.setState({open: false});
  }

  render() {
    const currentList = this.state.lists.find(
      list => list.id == this.props.match.params.listId,
    );
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <FavoritesList
        {...this.state}
        {...this.props}
        list={currentList}
        handleDialogOpen={this.handleDialogOpen}
        handleDialogClose={this.handleDialogClose}
        handleListNew={this.handleListNew}
        handleListSelect={this.handleListSelect}
        handleListRemoveFavorite={this.handleListRemoveFavorite}
        handleMenuOpen={this.handleMenuOpen}
        handleMenuClose={this.handleMenuClose}
      />
    );
  }
}

FavoritesListContainer.defaultProps = {
  session: null,
};

FavoritesListContainer.propTypes = {
  session: PropTypes.string,
};

export default withRouter(withWidth(FavoritesListContainer));
