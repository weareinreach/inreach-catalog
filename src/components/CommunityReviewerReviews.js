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
	nextBtn: {
		marginTop: '24px',
		marginBottom: 'unset'
	},
	sideMargin: {
		marginLeft: '48px',
		marginRight: '48px'
	},
	borderOutline: {
		borderWidth: '2px',
		//border box colors
		//border color when not hover or focus, darkGrey: '#e9e9e9', but have to use code not theme
		'& .MuiOutlinedInput-root': {
			borderColor: '#e9e9e9'
		},
		//border color when hover, light black, 'rgba(29, 31, 35, .5)', but have to use code not theme
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: 'rgba(29, 31, 35, .5)'
		},
		//border color on focus, blue with box shadow but have to use code not theme
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: '#5073B3',
			boxShadow: '0px 0px 10px rgba(80, 115, 179, 0.5)'
		},
		//border color with error
		'& .MuiOutlinedInput-root.Mui-error': {
			borderColor: 'red'
		},

		//input box text color is black under all conditions except error
		'& .MuiOutlinedInput-input': {
			color: '#1D1F23'
		},
		'&:hover .MuiOutlinedInput-input': {
			color: 'black'
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			color: '#1D1F23'
		},

		//Input label
		'& .MuiInputLabel-outlined': {
			color: 'grey'
		},
		'&:hover .MuiInputLabel-outlined': {
			color: 'brown'
		},
		'& .MuiInputLabel-outlined.Mui-focused': {
			color: 'maroon'
		},

		//helper text
		'& .MuiFormHelperText-root': {
			color: 'green',
			fontSize: '12px'
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: 'red',
			fontSize: '12px'
		}
	}
});

const CommunityReviewerReviews = (props) => {
	const {classes, handleChange, reviewsAnswer, handleUpdateUser} = props;

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
						id="account.signup-community-reviewer-reviews-question"
						defaultMessage="I understand that I am expected to leave public written reviews and ratings (1 to 5 stars) in the InReach App for organizations in my local area that I am familiar with. I will not leave any reviews or ratings for organizations I am not familiar with. I will not write reviews or leave ratings for organizations outside of my local community. I also agree to not write any hate speech, or other discriminatory or unprofessional reviews. *"
						description="Understanding of Reviews requirements"
					/>
				</Typography>
				<RadioGroup
					name="reviewsAnswer"
					onChange={handleChange}
					required={true}
				>
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
									checked={handleRadioButton(reviewsAnswer) === type.dbValue}
									data-test-id={type.dbValue}
								/>
							</Grid>
						))}
					</Grid>
				</RadioGroup>
				<AsylumConnectButton
					disabled={!reviewsAnswer}
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

export default withStyles(styles)(CommunityReviewerReviews);
