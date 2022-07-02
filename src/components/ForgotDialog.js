import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import DialogTitle from './DialogTitle';
import ForgotFormContainer from './ForgotFormContainer';

const ForgotDialog = ({
	handleMessageNew,
	handleRequestClose,
	handleRequestOpen
}) => (
	<div>
		<DialogTitle>
			<FormattedMessage
				id="account.reset-password"
				defaultMessage="Reset Your Password"
				description="Reset password dialog title"
			/>
		</DialogTitle>
		<ForgotFormContainer
			handleMessageNew={handleMessageNew}
			handleRequestClose={handleRequestClose}
			handleRequestOpen={handleRequestOpen}
		/>
	</div>
);

ForgotDialog.propTypes = {
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired
};

export default ForgotDialog;
