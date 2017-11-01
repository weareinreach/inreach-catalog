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

    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose() {
    this.setState({ open: false });
  };

  render() {
    return (
      <FavoritesList
        {...this.state}
        handleClick={this.handleClick}
        handleRequestClose={this.handleRequestClose}
      />
    );
  }
}

export default FavoritesListContainer;
