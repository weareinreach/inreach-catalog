import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import DialogButton from './DialogButton';
import DialogTitle from './DialogTitle';
import DisclaimerText from './DisclaimerText';

const DisclaimerDialog = ({handleRequestClose}) => (
	<div>
		<DialogTitle>
			<FormattedMessage id="legal.disclaimer" />
		</DialogTitle>
		<DisclaimerText />
		<DialogButton handleRequestClose={handleRequestClose}>
			<FormattedMessage id="action.ok" />
		</DialogButton>
	</div>
);

DisclaimerDialog.propTypes = {
	handleRequestClose: PropTypes.func.isRequired
};

export default DisclaimerDialog;
