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

function DeleteListDialog(props) {
	const confirmDelete = () => {
		const {handleMessageNew} = props;

		deleteList(props.listId, props.user)
			.then(() => {
				handleMessageNew(
					<FormattedMessage id="favorites.delete.list.dialog.success.message" />
				);
				props.handleFetchUser(props.session);
				props.handleRequestClose();
				props.history.push('/' + props.locale + '/favorites');
			})
			.catch(() => {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
			});
	};

	const {classes, handleRequestClose} = props;
	let isShared = true;

	if (props.listVisibility !== 'shared') {
		isShared = false;
	}

	return (
		<div className={classes.container}>
			<DialogTitle data-test-id="delete-list-title">
				<FormattedMessage id="favorites.delete.list.dialog.title" />
				{props.listTitle}?
			</DialogTitle>
			{isShared ? (
				<Typography type="body1" data-test-id="delete-list-shared">
					<FormattedMessage id="favorites.delete.list.dialog.shared.message" />
				</Typography>
			) : null}
			<AsylumConnectButton
				variant="primary"
				onClick={confirmDelete}
				className={classes.marginTop}
				testIdName="delete-list-delete-button"
				children={<FormattedMessage id="action.delete" />}
			></AsylumConnectButton>

			<AsylumConnectButton
				variant="secondary"
				testIdName="delete-list-cancel-button"
				onClick={handleRequestClose}
				children={<FormattedMessage id="action.cancel" />}
			></AsylumConnectButton>
		</div>
	);
}

DeleteListDialog.propTypes = {
	handleRequestClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteListDialog);
