import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {withStyles} from '@material-ui/core/styles';

import DialogTitle from './DialogTitle';
import ShareFormContainer from './ShareFormContainer';

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

const ShareDialog = (props) => {
	const {
		classes,
		handleMessageNew,
		handleRequestOpen,
		handleRequestClose,
		listId,
		listTitle,
		session,
		shareType,
		user
	} = props;

	return (
		<div className={classes.container}>
			<DialogTitle className={classes.wordWrap} data-test-id="share-list-title">
				<FormattedMessage id="action.share-question" /> "{listTitle}" ?
			</DialogTitle>
			<ShareFormContainer
				handleMessageNew={handleMessageNew}
				handleRequestClose={handleRequestClose}
				handleRequestOpen={handleRequestOpen}
				session={session}
				listId={listId}
				shareType={shareType}
				user={user}
			/>
		</div>
	);
};

ShareDialog.defaultProps = {
	session: null
};

ShareDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string
};

export default withStyles(styles)(ShareDialog);
