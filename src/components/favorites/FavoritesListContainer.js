import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import breakpoints from '../../theme/breakpoints';
import {deleteListFavorite, fetchPublicList, fetchUser} from '../../helpers/odasRequests';
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
      loadingResources: this.props.match.params.listId ? true : false,
      open: false,
      publicList: null,
      resources: [],
    };

    this.fetchListResources = this.fetchListResources.bind(this);
    this.fetchResources = this.fetchResources.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
  }

  componentDidMount() { 
    const { listId } = this.props.match.params;
    const { lists } = this.props;
    const { resources } = this.state;

    if (lists.length && !listId) {
      this.setState({publicList: null});
      this.props.history.replace(`/favorites/${lists[0].slug}`);
    } else if (lists.length && !resources.length && listId) {
      this.fetchListResources(listId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lists.length && !nextProps.match.params.listId) {
      this.setState({publicList: null});
      this.props.history.replace(`/favorites/${nextProps.lists[0].slug}`);
    }
    if (this.props.match.params.listId !== nextProps.match.params.listId) { 
      this.setState({ loadingResources: true }); 
      this.fetchListResources(nextProps.match.params.listId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingResources &&
      this.props.match.params.listId &&
      !prevProps.lists.length &&
      this.props.lists.length
    ) {
      this.fetchListResources(this.props.match.params.listId);
    }
  }

  fetchListResources(listId) {
    const { user, session } = this.props;
    const list = this.props.lists.find(
      collection => collection.slug == listId,
    );
    if (list && list.fetchable_list_items.length) {
      this.fetchResources(list.fetchable_list_items);
    } else if (list && !list.fetchable_list_items.length) {
      this.setState({
        loadingResources: false,
        resources: [],
      });
    } else {
      fetchPublicList(listId)
        .then(({collection}) => {
          if (collection.fetchable_list_items) {
            this.fetchResources(collection.fetchable_list_items)
          } else {
            this.setState({
              loadingResources: false,
              resources: [],
            });
          }
          if(session && !user) {
            fetchUser(session)
              .then((response) => {
                let publicList = null;
                if(!response || !response.user || response.user.id !== collection.created_by_user_id) {
                  publicList = collection.title;
                }
                this.setState({publicList});
              })
              .catch((error) => {
                this.setState({ publicList: collection.title });
              });
          } else {
            let publicList = null;
            if(user !== collection.created_by_user_id) {
              publicList = collection.title;
            }
            this.setState({publicList})
          }
        })
        .catch(error => {
          this.setState({
            loadingResources: false,
            resources: [],
          });
        });
    }
  }

  fetchResources(resources) {
    this.queryOneDegree = new OneDegreeResourceQuery();
    this.queryOneDegree
      .setIds(resources.map(resource => resource.fetchable_id))
      .fetch({
        type: 'both',
        callback: data => {
          this.setState({
            loadingResources: false,
            resources: data,
          });
        },
      });
  }

  handleListSelect(list) { 
    const { history } = this.props;
    history.push(`/favorites/${list.slug}`);
    console.log(list, history);
    this.handleMenuClose();
  }

  handleMenuOpen(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleMenuClose() {
    this.setState({open: false});
  }

  handleRemoveFavorite(resourceId) {
    const { listId } = this.props.match.params;
    const {session} = this.props;

    deleteListFavorite(listId, resourceId, session)
      .then(() => {
        this.setState(prevState => ({
          resources: prevState.resources.filter(
            resource => resource.id !== resourceId
          )
        }))
        this.props.handleListRemoveFavorite(parseInt(listId), resourceId);
      })
      .catch(error => {
        const {
          handleLogOut,
          handleMessageNew,
          handleRequestOpen,
        } = this.props;
        if (error.response && error.response.status === 401) {
          handleMessageNew('Your session has expired. Please log in again.');
          handleLogOut();
        } else if (error.response && error.response.status === 403) {
          handleRequestOpen('password');
        } else {
          handleMessageNew('Oops! Something went wrong.');
        }
      });
  }

  render() {
    const currentList = this.props.lists.find(
      list => list.slug == this.props.match.params.listId,
    );
    const isMobile = this.props.width < breakpoints['sm'];
    if (isMobile) {
      return (
        <FavoritesListMobile
          {...this.state}
          {...this.props}
          list={currentList}
          handleListSelect={this.handleListSelect}
          handleMenuOpen={this.handleMenuOpen}
          handleMenuClose={this.handleMenuClose}
          handleRemoveFavorite={this.handleRemoveFavorite}
        />
      );
    } else {
      return (
        <FavoritesList
          {...this.state}
          {...this.props}
          list={currentList}
          handleListSelect={this.handleListSelect}
          handleMenuOpen={this.handleMenuOpen}
          handleMenuClose={this.handleMenuClose}
          handleRemoveFavorite={this.handleRemoveFavorite}
        />
      );
    }
  }
}

FavoritesListContainer.defaultProps = {
  session: null,
  user: null,
};

FavoritesListContainer.propTypes = {
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListRemoveFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withRouter(withWidth(FavoritesListContainer));
