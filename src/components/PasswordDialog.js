import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {FormattedMessage} from 'react-intl';

import PasswordFormContainer from './PasswordFormContainer';
import DialogTitle from './DialogTitle';

const PasswordMobile = ({
	handleConfirmSession,
	handleMessageNew,
	handleRequestClose,
	session
}) => (
	<div>
		<Paper>
			<DialogTitle>
				<FormattedMessage id="form.confirm-password" />
			</DialogTitle>
			<PasswordFormContainer
				handleConfirmSession={handleConfirmSession}
				handleMessageNew={handleMessageNew}
				handleRequestClose={handleRequestClose}
				session={session}
			/>
		</Paper>
	</div>
);

PasswordMobile.propTypes = {
	handleConfirmSession: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	session: PropTypes.string.isRequired
};

export default PasswordMobile;
