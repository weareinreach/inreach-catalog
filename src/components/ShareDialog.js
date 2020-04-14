import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from './DialogTitle';
import ShareFormContainer from './ShareFormContainer';

const ShareDialog = ({
  handleMessageNew,
  handleRequestOpen,
  handleRequestClose,
  listId,
  listTitle,
  session,
  shareType
}) => (
  <div>
    <DialogTitle>Share "{listTitle}"</DialogTitle>
    <ShareFormContainer
      handleMessageNew={handleMessageNew}
      handleRequestClose={handleRequestClose}
      handleRequestOpen={handleRequestOpen}
      session={session}
      listId={listId}
      shareType={shareType}
    />
  </div>
);

ShareDialog.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  listTitle: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired
};

export default ShareDialog;
