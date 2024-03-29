import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import DialogTitle from './DialogTitle';
import LoginFormContainer from './LoginFormContainer';

const LoginDialog = ({
	handleLogIn,
	handleMessageNew,
	handleRequestClose,
	handleRequestOpen
}) => (
	<div data-test-id="log-in-dialog-container">
		<DialogTitle>
			<FormattedMessage
				id="account.sign-in"
				defaultMessage="Sign In"
				description="sign in form"
			/>
		</DialogTitle>
		<LoginFormContainer
			handleLogIn={handleLogIn}
			handleMessageNew={handleMessageNew}
			handleRequestClose={handleRequestClose}
			handleRequestOpen={handleRequestOpen}
		/>
	</div>
);

LoginDialog.propTypes = {
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired
};

export default LoginDialog;
