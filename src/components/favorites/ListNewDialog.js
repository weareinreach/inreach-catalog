import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import ListNewFormContainer from './ListNewFormContainer';

const ListNewDialog = ({handleMessageNew, handleRequestClose}) => (
  <div>
    <DialogTitle>Create a New Favorites List</DialogTitle>
    <ListNewFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
    />
  </div>
);

ListNewDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default ListNewDialog;
