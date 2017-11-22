import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import breakpoints from '../../theme/breakpoints';
import fetchUserLists from '../../helpers/fetchUserLists';
import deleteListFavorite from '../../helpers/deleteListFavorite';
import OneDegreeResourceQuery from '../../helpers/OneDegreeResourceQuery';
import withWidth from '../withWidth';

import ListNewFormContainer from './ListNewFormContainer';
import FavoritesList from './FavoritesList';
import FavoritesListMobile from './FavoritesListMobile';

class FavoritesListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      dialog: 'none',
      loadingResources: this.props.match.params.listId ? true : false,
      open: false,
      resources: [],
    };

    this.fetchListResources = this.fetchListResources.bind(this);
    this.fetchResources = this.fetchResources.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    const { listId } = this.props.match.params;
    const { lists, user } = this.props;

    if (lists.length && !listId) {
      this.props.history.push(`/favorites/${user}/${lists[0].id}`);
    }
    if (listId) {
      this.fetchListResources(listId);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.lists.length && !nextProps.match.params.listId) {
      this.props.history.push(`/favorites/${nextProps.user}/${nextProps.lists[0].id}`);
    }
    if (this.props.match.params.listId !== nextProps.match.params.listId) {
      this.setState({ loadingResources: true });
      this.fetchListResources(nextProps.match.params.listId);
    }
  }

  fetchListResources(listId) {
    const list = this.props.lists.find(
      collection => collection.id == listId,
    );
    if (list && list.fetchable_list_items.length) {
      this.fetchResources(list.fetchable_list_items);
    } else {
      this.setState({
        loadingResources: false,
        resources: [],
      });
    }
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
    const currentList = this.props.lists.find(
      list => list.id == this.props.match.params.listId,
    );
    const isMobile = this.props.width < breakpoints['sm'];
    if (isMobile) {
      return (
        <FavoritesListMobile
          {...this.state}
          {...this.props}
          list={currentList}
          handleDialogOpen={this.handleDialogOpen}
          handleDialogClose={this.handleDialogClose}
          handleListNew={this.props.handleListNew}
          handleListSelect={this.handleListSelect}
          handleListRemoveFavorite={this.props.handleListRemoveFavorite}
          handleMenuOpen={this.handleMenuOpen}
          handleMenuClose={this.handleMenuClose}
        />
      );
    } else {
      return (
        <FavoritesList
          {...this.state}
          {...this.props}
          list={currentList}
          handleDialogOpen={this.handleDialogOpen}
          handleDialogClose={this.handleDialogClose}
          handleListNew={this.props.handleListNew}
          handleListSelect={this.handleListSelect}
          handleListRemoveFavorite={this.props.handleListRemoveFavorite}
          handleMenuOpen={this.handleMenuOpen}
          handleMenuClose={this.handleMenuClose}
        />
      );
    }
  }
}

FavoritesListContainer.defaultProps = {
  session: null,
};

FavoritesListContainer.propTypes = {
  session: PropTypes.string,
};

export default withRouter(withWidth(FavoritesListContainer));
