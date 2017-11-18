import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import ListShareFormContainer from './ListShareFormContainer';

const ListShareDialog = ({
  handleMessageNew,
  handleRequestClose,
  listId,
  listTitle,
  session,
}) => (
  <div>
    <DialogTitle>Share "{listTitle}"</DialogTitle>
    <ListShareFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      session={session}
      listId={listId}
    />
  </div>
);

ListShareDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
};

export default ListShareDialog;
