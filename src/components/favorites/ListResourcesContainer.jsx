import React from 'react';
import PropTypes from 'prop-types';

import ListResources from './ListResources';

class ListResourcesContainer extends React.Component {
  render() {
    return (
      <ListResources resources={this.props.resources} />
    );
  }
}

ListResourcesContainer.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListResourcesContainer;
