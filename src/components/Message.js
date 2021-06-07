import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
	close: {
		width: theme.spacing(4),
		height: theme.spacing(4)
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
				data-test-id="snackbar-close-button"
			>
				<CloseIcon />
			</IconButton>
		]}
	/>
);

Message.propTypes = {
	classes: PropTypes.object.isRequired,
	handleMessageClose: PropTypes.func.isRequired,
	message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	open: PropTypes.bool.isRequired
};

export default withStyles(styles)(Message);
