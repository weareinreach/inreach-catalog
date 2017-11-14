import React from 'react';
import PropTypes from 'prop-types';

import ResourceListItem from '../ResourceListItem';

const ListResources = ({ resources }) => (
  <div>
    {resources.map(resource =>
      <ResourceListItem
        key={resource.id}
        resource={resource}
      />
    )}
  </div>
);

ListResources.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListResources;
