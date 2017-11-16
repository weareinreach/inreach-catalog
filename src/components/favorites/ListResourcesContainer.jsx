import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import config from '../../config/config.js';
import ListResources from './ListResources';

class ListResourcesContainer extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <ListResources
        handleListRemoveFavorite={this.props.handleListRemoveFavorite}
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
