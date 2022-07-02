import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {breakpoints} from '../theme';

import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';

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
	formLabel: {
		fontSize: '14px',
		fontWeight: '600',
		lineHeight: '19px',
		textAlign: 'left',
		paddingLeft: '.25rem',
		marginBottom: '.25rem',
		marginTop: '1rem'
	},
	greyLine: {
		width: 'auto',
		height: '1px',
		backgroundColor: theme.palette.common.darkGrey,
		marginTop: `${theme.spacing(3)}px`
	},
	labels: {
		textAlign: 'left',
		paddingLeft: '.25rem',
		marginBottom: '.25rem',
		marginTop: '1rem'
	},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '20px',
		marginTop: '48px'
	},
	nextBtn: {
		marginTop: '48px',
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

const AboutYouOrganization = (props) => {
	const {
		classes,
		orgName,
		orgPositionTitle,
		reasonForJoining,
		handleChange,
		handleUpdateUser
	} = props;

	const intl = useIntl();

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	const [setTouchedOrgName] = useState(false);
	const [setTouchedPosition] = useState(false);
	const [setTouchedReason] = useState(false);

	return (
		<>
			{!isMobile && (
				<DialogTitle>
					<FormattedMessage
						id="account.signup-about-you"
						defaultMessage="About You"
						description="Title for the About You sign up dialog"
					/>
				</DialogTitle>
			)}
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage
					id="account.signup-about-you-subtitle"
					defaultMessage="Help us improve your experience by telling us more about yourself"
					description="Sub-title for the About You sign up dialog"
				/>
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<form
				className={classes.formContainer}
				onSubmit={handleUpdateUser}
				data-test-id="about-you-organization-form"
			>
				<FormLabel
					className={classes.formLabel}
					classes={classes.fontWeightMedium}
					margin="none"
				>
					<FormattedMessage
						id="aboutyou.organization-name"
						defaultMessage="Name of your firm or organization"
						description="question asking about firm/organization name"
					/>
				</FormLabel>
				<TextField
					onBlur={setTouchedOrgName}
					id="orgName"
					margin="none"
					name="orgName"
					onChange={handleChange}
					type="text"
					value={orgName}
					placeholder={intl.formatMessage({
						id: 'aboutyou.organization-name-placeholder',
						defaultMessage: 'Your firm or organization',
						description:
							'Text field placeholder to enter the name of your organization'
					})}
					data-test-id="about-you-organization-name"
					InputLabelProps={{shrink: true}}
					variant="outlined"
					className={classes.borderOutline}
					InputProps={{
						classes: {
							input: classes.borderOutline,
							notchedOutline: classes.borderOutline
						}
					}}
				/>
				<FormLabel
					className={classes.formLabel}
					classes={classes.fontWeightMedium}
					margin="none"
				>
					<FormattedMessage
						id="aboutyou.organization-postion"
						defaultMessage="Your position in the organization"
						description="question asking about your position in the organization"
					/>
				</FormLabel>
				<TextField
					onBlur={setTouchedPosition}
					id="orgPositionTitle"
					margin="none"
					name="orgPositionTitle"
					onChange={handleChange}
					type="text"
					value={orgPositionTitle}
					placeholder={intl.formatMessage({
						id: 'aboutyou.organization-postion-placeholder',
						defaultMessage: 'Your position in the organization',
						description:
							'Text field placeholder to enter your position in the organization'
					})}
					data-test-id="about-you-organization-position"
					InputLabelProps={{shrink: true}}
					variant="outlined"
					className={classes.borderOutline}
					InputProps={{
						classes: {
							input: classes.borderOutline,
							notchedOutline: classes.borderOutline
						}
					}}
				/>
				<FormLabel
					className={classes.formLabel}
					classes={classes.fontWeightMedium}
					margin="none"
				>
					<FormattedMessage
						id="aboutyou.organization-reason"
						defaultMessage="Your reason for joining"
						description="question asking about you joined the platform"
					/>
				</FormLabel>
				<TextField
					onBlur={setTouchedReason}
					id="reasonForJoining"
					margin="none"
					name="reasonForJoining"
					onChange={handleChange}
					type="text"
					value={reasonForJoining}
					placeholder={intl.formatMessage({
						id: 'aboutyou.organization-reason-placeholder',
						defaultMessage: 'I joined InReach because..',
						description:
							'Text field placeholder to enter the reason you joined the platform'
					})}
					data-test-id="about-you-organization-reason"
					InputLabelProps={{shrink: true}}
					variant="outlined"
					className={classes.borderOutline}
					InputProps={{
						classes: {
							input: classes.borderOutline,
							notchedOutline: classes.borderOutline
						}
					}}
				/>
				<AsylumConnectButton
					testIdName="about-you-next-button"
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

export default withStyles(styles)(AboutYouOrganization);
