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

class DeleteListDialog extends React.Component {
	constructor(props) {
		super(props);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	confirmDelete() {
		const {handleMessageNew} = this.props;

		deleteList(this.props.listId, this.props.user)
			.then(() => {
				handleMessageNew(
					<FormattedMessage id="favorites.delete.list.dialog.success.message" />
				);
				this.props.handleRequestClose();
				this.props.history.push('/' + this.props.locale + '/favorites');
			})
			.catch(() => {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
			});
	}

	render() {
		const {classes, handleRequestClose} = this.props;
		let isShared = true;

		if (this.props.listVisibility !== 'shared') {
			isShared = false;
		}
		return (
			<div className={classes.container}>
				<DialogTitle data-test-id="delete-list-title">
					<FormattedMessage id="favorites.delete.list.dialog.title" />
					{this.props.listTitle}?
				</DialogTitle>
				{isShared ? (
					<Typography type="body1" data-test-id="delete-list-shared">
						<FormattedMessage id="favorites.delete.list.dialog.shared.message" />
					</Typography>
				) : null }
				<AsylumConnectButton
					variant="primary"
					onClick={this.confirmDelete}
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
}

DeleteListDialog.propTypes = {
	handleRequestClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteListDialog);
