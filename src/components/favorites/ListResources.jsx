import React from 'react';
import PropTypes from 'prop-types';

import ResourceListItem from '../ResourceListItem';

const ListResources = ({ handleRemoveFavorite, resources }) => (
  <div>
    {resources.map(resource =>
      <ResourceListItem
        isOnFavoritesList={true}
        handleRemoveFavorite={handleRemoveFavorite}
        key={resource.id}
        resource={resource}
      />
    )}
  </div>
);

ListResources.propTypes = {
  handleRemoveFavorite: PropTypes.func.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListResources;
