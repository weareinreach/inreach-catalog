import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const DisclaimerText = () => (
	<FormattedMessage
		id="legal.disclaimer-full"
		defaultMessage="The InReach team will do its best to confirm the eligibility and basic facts about service providers listed on this website. However, we cannot guarantee the viability or capabilities of any such providers. Consequently, InReach assumes no responsibility for the actions of providers listed on this website and asylum seekers who contact any such providers do so at their own risk."
		description="details about the InReach disclaimer"
	>
		{(disclaimer) => (
			<Typography variant="body1" data-test-id="disclaimer-text">
				{disclaimer}
			</Typography>
		)}
	</FormattedMessage>
);

export default DisclaimerText;
