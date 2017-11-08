import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import fetchUserLists from '../../helpers/fetchUserLists';

import FavoritesList from './FavoritesList';

class FavoritesListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      dialog: 'none',
      lists: [],
      open: false,
    };

    this.fetchLists = this.fetchLists.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleListNew = this.handleListNew.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    const {session} = this.props;
    if (session) {
      this.fetchLists(session);
    } else {
      console.log('no session');
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
      })
      .catch(response => {
        console.warn(response);
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
    return (
      <FavoritesList
        {...this.state}
        {...this.props}
        list={currentList}
        handleDialogOpen={this.handleDialogOpen}
        handleDialogClose={this.handleDialogClose}
        handleListNew={this.handleListNew}
        handleListSelect={this.handleListSelect}
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

export default withRouter(FavoritesListContainer);
