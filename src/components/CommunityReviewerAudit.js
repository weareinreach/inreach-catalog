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
	question: {
		fontSize: '18px',
		fontWeight: '600',
		lineHeight: '25px',
		marginBottom: '48px',
		marginTop: `${theme.spacing(4.5)}px`
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

const CommunityReviewerAudit = (props) => {
	const {classes, handleChange, auditAnswer, handleUpdateUser} = props;

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
					id="account.signup-subtitle-reviewer-2"
					defaultMessage='Please click here to read over the volunteer expectations for Local Community Reviewers at InReach. If you must check "no" for any expectation, please reach out to your supervisor with questions. Thank you!'
					description="Sub-title for the Local Community Reviewer dialog"
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
				data-test-id="community-reviewer-question-form"
			>
				<Typography className={classes.formQuestion} variant="h3">
					<FormattedMessage
						id="account.signup-community-reviewer-audit-question"
						defaultMessage="I understand that I am expected to audit the InReach App for LGBTQ+ affirming organizations in my local area. I will let my supervisor know of any organizations I believe are not LGBTQ+ affirming using my knowledge of my local community. I will report all of my suggestions and opinions on the internal Local Community Reviewer log spreadsheet in Google Drive. *"
						description="Understanding of Audit requirements"
					/>
				</Typography>
				<RadioGroup name="auditAnswer" onChange={handleChange} required={true}>
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
									checked={handleRadioButton(auditAnswer) === type.dbValue}
									data-test-id={type.dbValue}
								/>
							</Grid>
						))}
					</Grid>
				</RadioGroup>
				<AsylumConnectButton
					disabled={!auditAnswer}
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

export default withStyles(styles)(CommunityReviewerAudit);
