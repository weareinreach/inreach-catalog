import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import DialogButton from './DialogButton';
import DialogTitle from './DialogTitle';
import PrivacyText from './PrivacyText';

const PrivacyDialog = ({handleRequestClose}) => (
	<div>
		<DialogTitle>
			<FormattedMessage id="legal.privacy-statement" />
		</DialogTitle>
		<PrivacyText />
		<DialogButton handleRequestClose={handleRequestClose}>
			<FormattedMessage id="action.ok" />
		</DialogButton>
	</div>
);

PrivacyDialog.propTypes = {
	handleRequestClose: PropTypes.func.isRequired
};

export default PrivacyDialog;
