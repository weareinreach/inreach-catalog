import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import SignupFormContainer from './SignupFormContainer';
import ActionButton from './ActionButton';

const styles = (theme) => ({
	container: {
		minWidth: '503px',
		minHeight: '561px',
		overflowY: 'auto',
		'border-top': 'solid 6px #5073B3'
	}
});

const SignupDialog = ({
	handleLogIn,
	handleMessageNew,
	handleRequestClose,
	handleRequestOpen,
	history,
	locale,
	session,
	userData,
	classes
}) => (
	<div className={classes.container} data-test-id="dialog-container-sign-up">
		<ActionButton
			onClick={handleRequestClose}
			testIdName="dialog-close-button"
			variant="primary"
		>
			&times;
		</ActionButton>
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

export default withStyles(styles)(SignupDialog);
