import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from './DialogTitle';
import SignupFormContainer from './SignupFormContainer';

const SignupDialog = ({
	handleLogIn,
	handleMessageNew,
	handleRequestClose,
	handleRequestOpen,
	history,
	locale,
	session,
	userData
}) => (
	<div data-test-id="dialog-container-sign-up">
		<DialogTitle>Sign Up</DialogTitle>
		<SignupFormContainer
			handleLogIn={handleLogIn}
			handleMessageNew={handleMessageNew}
			handleRequestClose={handleRequestClose}
			handleRequestOpen={handleRequestOpen}
			history={history}
			locale={locale}
			session={session}
			userData={userData}
		/>
	</div>
);

SignupDialog.defaultProps = {
	session: null
};

SignupDialog.propTypes = {
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	session: PropTypes.string
};

export default SignupDialog;
