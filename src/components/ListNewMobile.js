import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {FormattedMessage} from 'react-intl';

import AsylumConnectBackButton from './AsylumConnectBackButton';
import ListNewFormContainer from './ListNewFormContainer';
import DialogTitle from './DialogTitle';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: '2.5em',
		marginRight: '2.5em',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack,
		boxShadow: 'none'
	},
	textCenter: {textAlign: 'center'},
	toolbarRoot: {
		justifyContent: 'space-between'
	},
	toolbarGutters: {
		paddingLeft: '0',
		paddingRight: '0'
	}
});

const ListNewMobile = ({
	classes,
	handleListNew,
	handleLogOut,
	handleMessageNew,
	handleRequestClose,
	session,
	user
}) => (
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
			<DialogTitle>
				<FormattedMessage
					id="favorites.create-new-list"
					defaultMessage="create new list"
					description="title of section that allows users to create a new list"
				/>
			</DialogTitle>
			<ListNewFormContainer
				handleListNew={handleListNew}
				handleLogOut={handleLogOut}
				handleMessageNew={handleMessageNew}
				handleRequestClose={handleRequestClose}
				session={session}
				user={user}
			/>
		</Paper>
	</div>
);

ListNewMobile.defaultProps = {
	session: null
};

ListNewMobile.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string
};

export default withStyles(styles)(ListNewMobile);
