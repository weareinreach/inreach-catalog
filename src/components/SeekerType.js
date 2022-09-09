import React from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import {breakpoints} from '../theme';

const LAWYER_TYPE = 'lawyer';
const PROVIDER_TYPE = 'provider';
const SEEKER_TYPE = 'seeker';
const REVIEWER_TYPE = 'reviewer';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto',
		marginTop: '25px'
	},
	greyLine: {
		width: 'auto',
		height: '1px',
		backgroundColor: theme.palette.common.darkGrey,
		marginTop: `${theme.spacing(3)}px`
	},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '20px',
		marginTop: '48px'
	},
	question: {
		fontSize: '18px',
		fontWeight: '600',
		lineHeight: '25px',
		marginBottom: '48px',
		marginTop: `${theme.spacing(4.5)}px`
	},
	marginBottom: {marginBottom: '2rem'},
	marginBottomLg: {marginBottom: '3rem'},
	sideMargin: {
		marginLeft: '48px',
		marginRight: '48px'
	},
	sideMarginMobile: {
		marginLeft: '24px',
		marginRight: '24px'
	}
});

const SeekerType = (props) => {
	const {classes, handleSelect, handleRequestOpen} = props;

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	return (
		<>
			{!isMobile && (
				<DialogTitle>
					<FormattedMessage
						id="account.sign-up"
						defaultMessage="Sign Up"
						description="Sign Up form title"
					/>
				</DialogTitle>
			)}
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage
					id="app.welcome-main-3"
					defaultMessage="The world's first tech platform matching LGBTQ+ people with safe, verified resources."
					description="Sign Up form welcome message"
				/>
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<div
				data-test-id="dialog-container-sign-up-question"
				className={isMobile ? classes.sideMarginMobile : classes.sideMargin}
			>
				<Typography className={classes.question} variant="h3">
					<FormattedMessage
						id="account.signup-catalog-type-selection-prompt"
						defaultMessage="Which are you?"
						description="Sign up form question - what type of user are you"
					/>
				</Typography>
				<AsylumConnectButton
					className={classes.marginBottom}
					onClick={() => handleSelect(SEEKER_TYPE)}
					variant="primary"
					testIdName="dialog-container-sign-up-help-myself-button"
				>
					<FormattedMessage
						id="account.signup-catalog-type-asylum-seeker"
						defaultMessage="I am looking for help for Myself"
						description="button to select myself option"
					/>
				</AsylumConnectButton>
				<AsylumConnectButton
					className={classes.marginBottom}
					onClick={() => handleSelect(LAWYER_TYPE)}
					variant="primary"
					testIdName="dialog-container-sign-up-attorney-button"
				>
					<FormattedMessage
						id="account.signup-catalog-type-legal-provider"
						defaultMessage="I am an Attorney or Law Student"
						description="button to select lawyer option"
					/>
				</AsylumConnectButton>
				<AsylumConnectButton
					className={classes.marginBottom}
					onClick={() => handleSelect(PROVIDER_TYPE)}
					variant="primary"
					testIdName="dialog-container-sign-up-non-legal-service-provider-button"
				>
					<FormattedMessage
						id="account.signup-catalog-type-non-legal-provider"
						defaultMessage="I am a non-legal Service Provider"
						description="button to select provider option"
					/>
				</AsylumConnectButton>
				<AsylumConnectButton
					className={classes.marginBottomLg}
					onClick={() => handleSelect(REVIEWER_TYPE)}
					variant="primary"
					testIdName="dialog-container-sign-up-reviewer-button"
				>
					<FormattedMessage
						id="account.signup-catalog-type-reviewer"
						defaultMessage="I am a Local Community Reviewer"
						description="button to select local community reviewer opton"
					/>
				</AsylumConnectButton>
				<div
					onClick={() => handleRequestOpen('login')}
					data-test-id="dialog-container-sign-up-already-have-account"
				>
					<Typography variant="body1">
						<span className={classes.link}>
							<FormattedMessage
								id="account.already-have-account"
								defaultMessage="Already have an account?"
								description="link to go to the sign in form"
							/>
						</span>
					</Typography>
				</div>
			</div>
		</>
	);
};

export default withStyles(styles)(SeekerType);
