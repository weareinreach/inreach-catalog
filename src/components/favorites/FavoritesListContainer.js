import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import { withRouter } from 'react-router-dom';

import config from '../../config/config.js';

import FavoritesList from './FavoritesList';

class FavoritesListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      dialog: 'none',
      lists: [],
      open: false,
    };

    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    const { session } = this.props;
    if (session) {
      const apiDomain = config[process.env.OD_API_ENV].odas;
      const url = `${apiDomain}api/account/collections/all`;
      const options = {
        headers: {
          Authorization: session,
          'Content-Type': 'application/json',
          OneDegreeSource: 'asylumconnect',
        },
      };
      fetch(url, options)
        .then(response => {
          if (response.status === 200) {
            return response.json()
          } else {
            console.log(response);
          }
        })
        .then(data => {
          this.setState({ lists: data.collections });
        })
        .catch(response => {
          debugger
        })
    } else {
      console.log('no session')
    }
  }

  handleDialogOpen(dialog) {
    this.setState({dialog});
  }

  handleDialogClose() {
    this.setState({dialog: 'none'});
  }

  handleListSelect(list) {
    const { history, user } = this.props;
    history.push(`/favorites/${user}/${list.id}`);
    this.handleMenuClose();
  }

  handleMenuOpen(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuClose() {
    this.setState({ open: false });
  };

  render() {
    const currentList = this.state.lists.find(list =>
      list.id == this.props.match.params.listId
    );
    return (
      <FavoritesList
        {...this.state}
        {...this.props}
        list={currentList}
        handleDialogOpen={this.handleDialogOpen}
        handleDialogClose={this.handleDialogClose}
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
