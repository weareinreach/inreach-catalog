import React from 'react';
import PropTypes from 'prop-types';
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
		try {
			await deleteList(props.listId, props.user);
			handleMessageNew(
				<FormattedMessage id="favorites.delete-list-dialog-success-message" />
			);
			handleFetchUser(props.session);
			handleRequestClose();
			history.push('/' + props.locale + '/favorites');
		} catch (error) {
			if (error.response && error.response.status === 401) {
				handleMessageNew(<FormattedMessage id="app.inactivity-sign-in" />);
				handleLogOut();
				handleRequestClose();
			} else if (error.response && error.response.status === 403) {
				handleRequestOpen('password');
			} else {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
				handleRequestClose();
			}
		}
	};

	const {
		classes,
		handleMessageNew,
		handleFetchUser,
		handleRequestClose,
		handleRequestOpen,
		history,
		handleLogOut
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
				<FormattedMessage id="favorites.delete-list-dialog-title" />"
				{props.listTitle}" ?
			</DialogTitle>
			{isShared ? (
				<Typography type="body1" data-test-id="delete-list-shared">
					<FormattedMessage id="favorites.delete-list-dialog-shared-message" />
				</Typography>
			) : null}
			<AsylumConnectButton
				variant="primary"
				onClick={confirmDelete}
				className={classes.marginTop}
				testIdName="delete-list-delete-button"
			>
				<FormattedMessage id="action.delete" />
			</AsylumConnectButton>

			<AsylumConnectButton
				variant="secondary"
				testIdName="delete-list-cancel-button"
				onClick={handleRequestClose}
			>
				<FormattedMessage id="action.cancel" />
			</AsylumConnectButton>
		</div>
	);
};

export default withStyles(styles)(DeleteListDialog);
