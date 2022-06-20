import React from 'react';
import {FormattedMessage} from 'react-intl';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {breakpoints} from '../theme';

const styles = (theme) => ({
	container: {
		flexDirection: 'column',
		textAlign: 'center',
		width: 'fit-content',
		marginTop: '48px',
		marginBottom: '24px'
	},
	containerMobile: {
		flexDirection: 'column',
		textAlign: 'center',
		width: 'fit-content',
		marginTop: '12px',
		marginBottom: '12px'
	},
	flex: {display: 'flex'},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer'
	},
	cursor: {cursor: 'pointer', color: theme.palette.secondary[400]}
});

const AsylumConnectSignupAgreement = (props) => {
	const {classes} = props;

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	return (
		<Typography
			variant="body1"
			className={isMobile ? classes.containerMobile : classes.container}
			data-test-id="sign-up-form-agreement-statement"
		>
			<FormattedMessage
				id="legal.sign-up-agree-to-terms"
				defaultMessage="By clicking Sign Up you agree to InReach's"
				description="legal agree to terms text"
			/>
			{` `}
			<FormattedMessage
				id="legal.privacy-policy"
				defaultMessage="Privacy Policy"
				description="link to privacy policy"
			>
				{(privacy) => (
					<a
						href="https://inreach.org/privacy/"
						rel="noopener noreferrer"
						target="_blank"
						data-test-id="sign-up-form-privacy-link"
					>
						{privacy}
					</a>
				)}
			</FormattedMessage>{' '}
			<FormattedMessage id="legal.and" />{' '}
			<FormattedMessage
				id="legal.terms-of-use"
				defaultMessage="Terms of Use"
				description="link to terms of use"
			>
				{(terms) => (
					<a
						href="https://inreach.org/terms-of-use/"
						rel="noopener noreferrer"
						target="_blank"
						data-test-id="sign-up-form-terms-link"
					>
						{terms}
					</a>
				)}
			</FormattedMessage>
			{'.'}
		</Typography>
	);
};

export default withStyles(styles)(AsylumConnectSignupAgreement);
