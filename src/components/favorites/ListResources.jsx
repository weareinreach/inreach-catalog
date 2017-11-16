import React from 'react';
import PropTypes from 'prop-types';

import ResourceListItem from '../resource/ResourceListItem';

const ListResources = ({ handleListRemoveFavorite, resources }) => (
  <div>
    {resources.map(resource =>
      <ResourceListItem
        isOnFavoritesList={true}
        handleListRemoveFavorite={handleListRemoveFavorite}
        key={resource.id}
        resource={resource}
      />
    )}
  </div>
);

ListResources.propTypes = {
  handleListRemoveFavorite: PropTypes.func.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListResources;
