import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const PrivacyText = () => (
	<Typography variant="body1">
		<FormattedMessage
			id="legal.privacy-google-analytics-usage"
			defaultMessage="The InReach App uses Google Analytics with"
			description="part 1 of message that InReach uses google analytics"
		/>{' '}
		<FormattedMessage
			id="legal.privacy-anonymized-addresses"
			defaultMessage="anonymized IP addresses"
			description="link to google analytics details"
		>
			{(anonymized) => (
				<a
					href="https://support.google.com/analytics/answer/2763052?hl=en"
					target="_blank"
					rel="noopener noreferrer"
				>
					{anonymized}
				</a>
			)}
		</FormattedMessage>{' '}
		<FormattedMessage
			id="legal.privacy-google-analytics-scope"
			defaultMessage="to help analyze how visitors use this site. Google Analytics uses cookies, which are small text files placed on your computer, to collect standard visitor behavior information in an anonymous form. No personally identifiable information is collected about you, unless you explicitly submit that information on this website. If you would like to opt-out of Google Analytics, you may do so by clicking"
			description="part 2 - message that InReach uses google analytics"
		/>{' '}
		<FormattedMessage
			id="legal.privacy-here"
			defaultMessage="here"
			description="link to the Google Analytics privacy policy"
		>
			{(here) => (
				<a
					href="https://tools.google.com/dlpage/gaoptout"
					target="_blank"
					rel="noopener noreferrer"
				>
					{here}
				</a>
			)}
		</FormattedMessage>
	</Typography>
);

export default PrivacyText;
