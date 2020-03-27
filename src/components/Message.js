import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

const Message = ({classes, handleMessageClose, message, open}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={open}
    autoHideDuration={6000}
    onRequestClose={handleMessageClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id'
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={handleMessageClose}
      >
        <CloseIcon />
      </IconButton>
    ]}
  />
);

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMessageClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(Message);
