import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import ListShareFormContainer from './ListShareFormContainer';

const ListShareDialog = ({handleMessageNew, handleRequestClose}) => (
  <div>
    <DialogTitle>Share "My List"</DialogTitle>
    <ListShareFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
    />
  </div>
);

ListShareDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default ListShareDialog;
