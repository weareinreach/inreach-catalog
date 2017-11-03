import React from 'react';
import PropTypes from 'prop-types';

import FavoritesList from './FavoritesList';

class FavoritesListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      open: false,
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMenuOpen(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuClose() {
    this.setState({ open: false });
  };

  render() {
    return (
      <FavoritesList
        {...this.state}
        {...this.props}
        handleMenuOpen={this.handleMenuOpen}
        handleMenuClose={this.handleMenuClose}
      />
    );
  }
}

export default FavoritesListContainer;
