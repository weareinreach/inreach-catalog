import React from 'react';
import PropTypes from 'prop-types';

const ListResources = ({ resources }) => (
  <p> List Resources </p>
);

ListResources.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListResources;
