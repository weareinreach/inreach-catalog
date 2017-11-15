import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import config from '../../config/config.js';
import ListResources from './ListResources';

class ListResourcesContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
  }

  handleRemoveFavorite(resourceId) {
    console.log(resourceId);
  }

  render() {
    return (
      <ListResources
        handleRemoveFavorite={this.handleRemoveFavorite}
        resources={this.props.resources}
      />
    );
  }
}

ListResourcesContainer.propTypes = {
  handleListRemoveFavorite: PropTypes.func.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListResourcesContainer;
