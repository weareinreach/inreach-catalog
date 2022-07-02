import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import {deleteList} from '../utils/api';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	marginTop: {
		marginTop: theme.spacing(1)
	}
});

const DeleteListDialog = (props) => {
	const confirmDelete = async () => {
		deleteList(props.listId, props.user)
			.then((response) => {
				if (response.status === 200) {
					handleMessageNew(
						<FormattedMessage
							id="favorites.delete-list-dialog-success-message"
							defaultMessage="list was deleted"
							description="message displayed when list delete succeeds"
						/>
					);
					handleFetchUser(props.session);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				} else if (
					response.error &&
					(response.status.status === 401 || response.status.status === 500)
				) {
					handleMessageNew(
						<FormattedMessage
							id="error.sign-in-to-delete-resources"
							defaultMessage="You must be signed in to delete a list"
							description="error message displayed if you are not signed in"
						/>
					);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				} else if (response.error && response.status.status === 404) {
					handleMessageNew(
						<FormattedMessage
							id="error.resource-not-found"
							defaultMessage="list not found"
							description="error message displayed when the list is not found"
						/>
					);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				} else {
					handleMessageNew(
						<FormattedMessage
							id="error.unspecified"
							defaultMessage="Oops! Something went wrong."
							description="an error message"
						/>
					);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				}
			})
			// something else went wrong so handle it here
			.catch((error) => {
				handleMessageNew(
					<FormattedMessage
						id="error.unspecified"
						defaultMessage="Oops! Something went wrong."
						description="an error message"
					/>
				);
				handleRequestClose();
			});
	};

	const {
		classes,
		handleMessageNew,
		handleFetchUser,
		handleRequestClose,
		history
	} = props;

	let isShared = true;

	if (props.listVisibility !== 'shared') {
		isShared = false;
	}

	return (
		<div className={classes.container}>
			<DialogTitle
				className={classes.wordWrap}
				data-test-id="delete-list-title"
			>
				<FormattedMessage
					id="favorites.delete-list-dialog-title"
					defaultMessage="Delete List"
					description="title of delete list dialog"
				/>
				"{props.listTitle}" ?
			</DialogTitle>
			{isShared ? (
				<Typography type="body1" data-test-id="delete-list-shared">
					<FormattedMessage
						id="favorites.delete-list-dialog-shared-message"
						defaultMessage="You have shared this list with others. Once deleted, it will no longer be accessible to those for whom it has been shared."
						description="warning message if deleting a list that has been shared"
					/>
				</Typography>
			) : null}
			<AsylumConnectButton
				variant="primary"
				onClick={confirmDelete}
				className={classes.marginTop}
				testIdName="delete-list-delete-button"
			>
				<FormattedMessage
					id="action.delete"
					defaultMessage="Delete"
					description="button to delete list"
				/>
			</AsylumConnectButton>

			<AsylumConnectButton
				variant="secondary"
				testIdName="delete-list-cancel-button"
				onClick={handleRequestClose}
			>
				<FormattedMessage
					id="action.cancel"
					defaultMessage="Cancel"
					description="button to cancel deleting the list"
				/>
			</AsylumConnectButton>
		</div>
	);
};

export default withStyles(styles)(DeleteListDialog);
