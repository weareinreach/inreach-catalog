import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import AsylumConnectBackButton from './AsylumConnectBackButton';
import ShareFormContainer from './ShareFormContainer';
import DialogTitle from './DialogTitle';
import {FormattedMessage} from 'react-intl';

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

const ShareMobile = (props) => {
	const {
		classes,
		dialog,
		handleLogIn,
		handleMessageNew,
		handleRequestClose,
		handleRequestOpen,
		listId,
		listTitle,
		session,
		shareType,
		user
	} = props;

	return (
		<div>
			<Paper className={classes.root}>
				<Toolbar
					classes={{root: classes.toolbarRoot, gutters: classes.toolbarGutters}}
				>
					<AsylumConnectBackButton
						onClick={() => {
							handleRequestClose();
						}}
					/>
				</Toolbar>
				<DialogTitle
					className={classes.wordWrap}
					data-test-id="share-list-title"
				>
					<FormattedMessage id="action.share-question" />"{dialog.split('/')[3]}
					" ?
				</DialogTitle>
				<ShareFormContainer
					handleLogIn={handleLogIn}
					handleMessageNew={handleMessageNew}
					handleRequestClose={handleRequestClose}
					handleRequestOpen={handleRequestOpen}
					listId={dialog.split('/')[2]}
					shareType={dialog.split('/')[1]}
					session={session}
					user={user}
				/>
			</Paper>
		</div>
	);
};

ShareMobile.defaultProps = {
	session: null
};

ShareMobile.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string
};

export default withStyles(styles)(ShareMobile);
