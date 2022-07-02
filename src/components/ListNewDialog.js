import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import DialogTitle from './DialogTitle';
import ListNewFormContainer from './ListNewFormContainer';

const ListNewDialog = ({
	handleListNew,
	handleLogOut,
	handleMessageNew,
	handleRequestClose,
	session,
	user
}) => (
	<div>
		<DialogTitle>
			<FormattedMessage
				id="favorites.create-new-list"
				defaultMessage="Create New Favorites List"
				description="Title for Create New Favorites dialog box"
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
	</div>
);

ListNewDialog.defaultProps = {
	session: null,
	user: null
};

ListNewDialog.propTypes = {
	handleListNew: PropTypes.func.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	session: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired
};

export default ListNewDialog;
