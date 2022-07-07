import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import DialogButton from './DialogButton';
import DialogTitle from './DialogTitle';
import PrivacyText from './PrivacyText';

const PrivacyDialog = ({handleRequestClose}) => (
	<div>
		<DialogTitle>
			<FormattedMessage
				id="legal.privacy-statement"
				defaultMessage="InReach Privacy Statement"
				description="label for privacy statement modal"
			/>
		</DialogTitle>
		<PrivacyText />
		<DialogButton handleRequestClose={handleRequestClose}>
			<FormattedMessage
				id="action.ok"
				defaultMessage="OK"
				description="button to close the modal"
			/>
		</DialogButton>
	</div>
);

PrivacyDialog.propTypes = {
	handleRequestClose: PropTypes.func.isRequired
};

export default PrivacyDialog;
