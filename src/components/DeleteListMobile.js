import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import DialogTitle from './DialogTitle';
import {deleteList} from '../utils/api';

const styles = (theme) => ({
	spacingTop: {marginTop: '1rem'},
	backButton: {
		paddingBottom: '0.83em'
	},
	root: {
		flexGrow: 1,
		marginLeft: '2.5em',
		marginRight: '2.5em',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack,
		boxShadow: 'none'
	}
});

const DeleteListMobile = (props) => {
	const confirmDelete = async () => {
		deleteList(props.listId, props.user)
			.then((response) => {
				if (response.status === 200) {
					handleMessageNew(
						<FormattedMessage id="favorites.delete-list-dialog-success-message" />
					);
					handleFetchUser(props.session);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				} else if (
					response.error &&
					(response.status.status === 401 || response.status.status === 500)
				) {
					handleMessageNew(
						<FormattedMessage id="error.sign-in-to-delete-resources" />
					);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				} else if (response.error && response.status.status === 404) {
					handleMessageNew(<FormattedMessage id="error.resource-not-found" />);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				} else {
					handleMessageNew(<FormattedMessage id="error.unspecified" />);
					handleRequestClose();
					history.push('/' + props.locale + '/favorites');
				}
			})
			// something else went wrong so handle it here
			.catch((error) => {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
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
		<div>
			<Paper className={classes.root}>
				<Toolbar
					classes={{
						root: classes.toolbarRoot,
						gutters: classes.toolbarGutters
					}}
				>
					<AsylumConnectBackButton
						onClick={() => {
							handleRequestClose();
						}}
					/>
				</Toolbar>
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
					className={classes.spacingTop}
					testIdName="delete-list-delete-button"
				>
					<FormattedMessage id="action.delete" />
				</AsylumConnectButton>

				<AsylumConnectButton
					variant="secondary"
					className={classes.spacingTop}
					testIdName="delete-list-cancel-button"
					onClick={handleRequestClose}
				>
					<FormattedMessage id="action.cancel" />
				</AsylumConnectButton>
			</Paper>
		</div>
	);
};

DeleteListMobile.propTypes = {
	classes: PropTypes.object.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteListMobile);
