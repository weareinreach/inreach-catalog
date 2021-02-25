import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const DisclaimerText = () => (
	<FormattedMessage id="legal.disclaimer-full">
		{(disclaimer) => <Typography variant="body1">{disclaimer}</Typography>}
	</FormattedMessage>
);

export default DisclaimerText;
