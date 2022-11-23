import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import {breakpoints} from '../theme';

import {
	communityReviewerVerifyOptions,
	handleRadioButton
} from '../data/communityReviwerFormOptions';

import {deleteUser, catalogPost} from '../utils/api';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto',
		marginTop: '25px'
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		marginLeft: '48px',
		marginRight: '36px',
		marginTop: '24px'
	},
	formContainerMobile: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		marginLeft: '24px',
		marginRight: '24px',
		marginTop: '12px'
	},
	formQuestion: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '24.51px',
		marginBottom: '24px'
	},
	greyLine: {
		width: 'auto',
		height: '1px',
		backgroundColor: theme.palette.common.darkGrey,
		marginTop: `${theme.spacing(3)}px`
	},
	nextBtn: {
		marginTop: '24px',
		marginBottom: 'unset'
	},
	sideMargin: {
		marginLeft: '48px',
		marginRight: '48px'
	}
});

const CommunityReviewerVerify = (props) => {
	const {
		classes,
		handleChange,
		verifyAnswer,
		handleUpdateUser,
		handleLogOut,
		handleMessageNew,
		userData,
		handleRequestClose
	} = props;
	const [password, setPassword] = useState(props.password);
	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	const intl = useIntl();

	return (
		<>
			<DialogTitle>
				<FormattedMessage
					id="account.signup-community-reviewer-dialog-title"
					defaultMessage="InReach Local Community Reviewer Questionnaire"
					description="Title for the Local Community Reviewer dialog"
				/>
			</DialogTitle>
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage
					id="account.signup-subtitle-reviewer-1"
					defaultMessage="To register for this account type, you must be knowledgeable about the local LGBTQ+ community and support services in your area."
					description="sign up dialog header message"
					values={{
						b: (chunks) => <strong>{chunks}</strong>,
						clickHere: (
							<a
								href="https://inreach.org/become-a-local-community-reviewer"
								target="_blank"
								rel="noopener noreferrer"
								className="hide--on-print"
							>
								<FormattedMessage
									id="resource.click-here"
									defaultMessage="Click Here"
									description="link that takes user to Local Community Reviewer vetting process details"
								/>
							</a>
						)
					}}
				/>
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<form
				className={
					isMobile ? classes.formContainerMobile : classes.formContainer
				}
				onSubmit={handleUpdateUser}
				data-test-id="community-reviewer-verify-form"
			>
				<Typography className={classes.formQuestion} variant="h3">
					<FormattedMessage
						id="account.signup-community-reviewer-verify-question"
						defaultMessage="Have you already been verified by the InReach team as a Local Community Reviewer? *"
						description="Question asking for pre-verification"
					/>
				</Typography>
				<RadioGroup name="verifyAnswer" onChange={handleChange} required={true}>
					<Grid container spacing={0}>
						{communityReviewerVerifyOptions.map((type, index) => (
							<Grid item xs={6} key={index}>
								<FormControlLabel
									value={type.dbValue}
									control={<Radio />}
									label={intl.formatMessage({
										id: type.formatMessageId,
										defaultMessage: type.defaultMessage,
										description: type.description
									})}
									checked={handleRadioButton(verifyAnswer) === type.dbValue}
									data-test-id={type.dbValue}
								/>
							</Grid>
						))}
					</Grid>
				</RadioGroup>
				{verifyAnswer === 'false' ? (
					<Typography data-test-id="community-reviewer-not-affiliated">
						<FormattedMessage
							id="account.signup-community-reviewer-not-affiliated1"
							defaultMessage="Thanks very much for your interest! The Local Community Reviewer Program is only open to internal InReach affiliates as we put the final touches on this new user account. Public registration will open in January 2023. For now, your account will be created as a standard user account. Please watch our website and social media for updates."
							description="Text explaining that the Local Community Reviewer account is not available to the public just yet."
						/>
					</Typography>
				) : null}
				<AsylumConnectButton
					disabled={!verifyAnswer}
					testIdName="community-reviewer-next-button"
					variant="primary"
					className={classes.nextBtn}
				>
					<FormattedMessage
						id="navigation.next"
						defaultMessage="Next"
						description="Next button"
					/>
				</AsylumConnectButton>
			</form>
		</>
	);
};

export default withStyles(styles)(CommunityReviewerVerify);
