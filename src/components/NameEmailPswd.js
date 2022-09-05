import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import AsylumConnectSignupAgreement from './AsylumConnectSignupAgreement';
import {breakpoints} from '../theme';

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
		marginTop: '24px'
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

const NameEmailPswd = (props) => {
	const {
		classes,
		email,
		name,
		password,
		selection,
		currentLocation,
		handleSignUp,
		handleChange
	} = props;

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	const nameLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage
				id="form.name"
				defaultMessage="Name (or Alias)"
				description="Input text field for a Name"
			/>
		) : (
			<FormattedMessage
				id="form.lawyer-organization-name"
				defaultMessage="First and Last Name"
				description="Input text field for a Name"
			/>
		);

	const [touchedName, setTouchedName] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedLocation, setTouchedLocation] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);

	const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);
	const emailTest = new RegExp(/\S+@\S+\.\S+/);
	const pswdTest = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?])(?=.{10,})'
	);

	const isValidSeeker = () => {
		if (
			name &&
			textFieldTest.test(name) &&
			email &&
			emailTest.test(email) &&
			password &&
			pswdTest.test(password)
		) {
			return true;
		}
		return false;
	};

	const isValidReviewer = () => {
		if (
			name &&
			textFieldTest.test(name) &&
			email &&
			emailTest.test(email) &&
			password &&
			pswdTest.test(password) &&
			currentLocation &&
			textFieldTest.test(currentLocation)
		) {
			return true;
		}
		return false;
	};

	return (
		<>
			{!isMobile && (
				<DialogTitle>
					<FormattedMessage
						id="account.sign-up"
						defaultMessage="Sign Up"
						description="Account Sign Up Pop-Up"
					/>
				</DialogTitle>
			)}
			<DialogSubTitle className={classes.sideMargin}>
				{selection === SEEKER_TYPE ? (
					<FormattedMessage
						id="app.welcome-main-3"
						defaultMessage="The world's first tech platform matching LGBTQ+ people with safe, verified resources."
						description="sign up dialog header message"
					/>
				) : (
					<FormattedMessage
						id="account.signup-welcome-reviewer"
						defaultMessage="Must be knowledgeable about the local LGBTQ+ community and support services."
						description="sign up dialog header message"
					/>
				)}
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<form
				className={
					isMobile ? classes.formContainerMobile : classes.formContainer
				}
				onSubmit={handleSignUp}
				data-test-id="name-email-password-form"
			>
				<FormLabel
					required
					className={classes.labels}
					classes={classes.fontWeightMedium}
					margin="none"
					data-test-id="sign-up-form-name-label"
				>
					{nameLabel}
				</FormLabel>
				<TextField
					onBlur={setTouchedName}
					error={touchedName && !textFieldTest.test(name)}
					helperText={
						touchedName && !textFieldTest.test(name) ? (
							<FormattedMessage
								id="error.text-field-name"
								defaultMessage="'Name' field must contain at least 2 characters"
								description="error message if name value does not meet requirements"
							/>
						) : touchedName && textFieldTest.test(name) ? (
							<FormattedMessage
								id="form.field-valid-name"
								defaultMessage="'Name' field is valid"
								description="success message when name value meets requirements"
							/>
						) : null
					}
					id="name"
					margin="none"
					name="name"
					onChange={handleChange}
					required
					type="text"
					value={name ?? ''}
					placeholder="John Smith"
					data-test-id="sign-up-form-name-input"
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
				{selection === REVIEWER_TYPE ? (
					<>
						<FormLabel
							required
							className={classes.labels}
							margin="none"
							data-test-id="sign-up-form-location-label"
						>
							<FormattedMessage
								id="account.signup-organization-location"
								defaultMessage="Current location"
								description="Loation input field label"
							/>
						</FormLabel>
						<TextField
							onBlur={setTouchedLocation}
							error={touchedLocation && !textFieldTest.test(currentLocation)}
							helperText={
								touchedLocation && !textFieldTest.test(currentLocation) ? (
									<FormattedMessage
										id="error.text-field-location"
										defaultMessage="'Location' field must contain at least 2 characters"
										description="error message if the Location input field is not formatted properly"
									/>
								) : touchedLocation && textFieldTest.test(currentLocation) ? (
									<FormattedMessage
										id="form.field-valid-location"
										defaultMessage="'Location' field is valid"
										description="Success message if the Location field is formatted properly"
									/>
								) : null
							}
							id="currentLocation"
							margin="none"
							name="currentLocation"
							onChange={handleChange}
							required
							type="text"
							value={currentLocation}
							placeholder="San Francisco"
							data-test-id="sign-up-form-location-input"
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
					</>
				) : null}
				<FormLabel
					required
					className={classes.labels}
					margin="none"
					data-test-id="sign-up-form-email-label"
				>
					<FormattedMessage
						id="form.email"
						defaultMessage="Email"
						description="Input text field for an Email"
					/>
				</FormLabel>
				<TextField
					onBlur={setTouchedEmail}
					error={touchedEmail && !emailTest.test(email)}
					helperText={
						touchedEmail && !emailTest.test(email) ? (
							<FormattedMessage
								id="error.email-format"
								defaultMessage="Your email should have a format similar to 'john@gmail.com'"
								description="error message when email is not formatted properly"
							/>
						) : touchedEmail && emailTest.test(email) ? (
							<FormattedMessage
								id="form.field-valid-email"
								defaultMessage="'Email' field is valid"
								description="success message when email is formatted properly"
							/>
						) : null
					}
					id="email"
					margin="none"
					name="email"
					onChange={handleChange}
					required
					type="email"
					value={email}
					placeholder="john@gmail.com"
					data-test-id="sign-up-form-email-input"
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
					required
					className={classes.labels}
					margin="none"
					data-test-id="sign-up-form-password-label"
				>
					<FormattedMessage
						id="form.password"
						defaultMessage="Password"
						description="Text field to enter a password"
					/>
				</FormLabel>
				<TextField
					onBlur={setTouchedPassword}
					error={touchedPassword && !pswdTest.test(password)}
					helperText={
						touchedPassword && !pswdTest.test(password) ? (
							<FormattedMessage
								id="error.password-format"
								defaultMessage="Invalid password - your password must be at least 10 characters long; it must contain 1 uppercase character, 1 number, and 1 special character of the following !@#$%^&?"
								description="error message when password does not meet requirements"
							/>
						) : touchedPassword && pswdTest.test(password) ? (
							<FormattedMessage
								id="form.field-valid-password"
								defaultMessage="'Password' field is valid"
								description="success message when password meets requirements"
							/>
						) : null
					}
					id="password"
					margin="none"
					name="password"
					onChange={handleChange}
					required
					type="password"
					value={password}
					placeholder="***"
					data-test-id="sign-up-form-password-input"
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
				<AsylumConnectSignupAgreement />
				<AsylumConnectButton
					disabled={
						selection === SEEKER_TYPE ? !isValidSeeker() : !isValidReviewer()
					}
					testIdName="sign-up-form-submit-button"
					variant={
						selection === SEEKER_TYPE || selection === REVIEWER_TYPE
							? 'signUp'
							: 'primary'
					}
					className={classes.noBottomMargin}
				>
					<FormattedMessage
						id="account.sign-up"
						defaultMessage="Sign Up"
						description="Account Sign Up Pop Up"
					/>
				</AsylumConnectButton>
			</form>
		</>
	);
};

export default withStyles(styles)(NameEmailPswd);
