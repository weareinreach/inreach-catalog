import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle} from '../dialog';
import ListNewFormContainer from './ListNewFormContainer';

const ListNewDialog = ({
  handleListAddFavorite,
  handleListNew,
  handleLogOut,
  handleMessageNew,
  handleRequestClose,
  origin,
  originList,
  session,
  user,
}) => (
  <div>
    <DialogTitle>Create a New Favorites List</DialogTitle>
    <ListNewFormContainer
      handleListAddFavorite={handleListAddFavorite}
      handleListNew={handleListNew}
      handleLogOut={handleLogOut}
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      origin={origin}
      originList={originList}
      session={session}
      user={user}
    />
  </div>
);

ListNewDialog.defaultProps = {
  session: null,
  user: null,
  originList: null
};

ListNewDialog.propTypes = {
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  origin: PropTypes.string.isRequired,
  originList: PropTypes.string,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default ListNewDialog;
