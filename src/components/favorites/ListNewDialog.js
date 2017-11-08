import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import ListNewFormContainer from './ListNewFormContainer';

const ListNewDialog = ({
  handleListNew,
  handleMessageNew,
  handleRequestClose,
  session,
  user,
}) => (
  <div>
    <DialogTitle>Create a New Favorites List</DialogTitle>
    <ListNewFormContainer
      handleListNew={handleListNew}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      session={session}
      user={user}
    />
  </div>
);

ListNewDialog.defaultProps = {
  session: null,
  user: null,
};

ListNewDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default ListNewDialog;
