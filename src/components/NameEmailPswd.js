import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import AsylumConnectSignupAgreement from './AsylumConnectSignupAgreement';
import {breakpoints} from '../theme';

const LAWYER_TYPE = 'lawyer';
const PROVIDER_TYPE = 'provider';
const SEEKER_TYPE = 'seeker';

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
		handleSignUp,
		handleChange
	} = props;

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	const emailLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.email" />
		) : selection === LAWYER_TYPE ? (
			<FormattedMessage id="form.lawyer-email" />
		) : (
			<FormattedMessage id="form.organization-email" />
		);

	const nameLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.name" />
		) : (
			<FormattedMessage id="form.lawyer-organization-name" />
		);
	const intl = useIntl();

	const [touchedName, setTouchedName] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);

	const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);
	const emailTest = new RegExp(/\S+@\S+\.\S+/);
	const pswdTest = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?])(?=.{10,})'
	);

	const isValid = () => {
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

	return (
		<>
			{!isMobile && (
				<DialogTitle>
					<FormattedMessage id="account.sign-up" />
				</DialogTitle>
			)}
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage id="app.welcome-3" />
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<form
				className={
					isMobile ? classes.formContainerMobile : classes.formContainer
				}
				onSubmit={handleSignUp}
				data-test-id="name-email-password-form"
			>
				{selection === SEEKER_TYPE ? (
					<>
						<FormLabel
							required
							className={classes.labels}
							classes={classes.fontWeightMedium}
							margin="none"
						>
							{nameLabel}
						</FormLabel>
						<TextField
							onBlur={setTouchedName}
							error={touchedName && !textFieldTest.test(name)}
							helperText={
								touchedName && !textFieldTest.test(name) ? (
									<FormattedMessage id="error.text-field-name" />
								) : touchedName && textFieldTest.test(name) ? (
									<FormattedMessage id="form.field-valid-name" />
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
					</>
				) : null}
				<FormLabel required className={classes.labels} margin="none">
					{emailLabel}
				</FormLabel>
				<TextField
					onBlur={setTouchedEmail}
					error={touchedEmail && !emailTest.test(email)}
					helperText={
						touchedEmail && !emailTest.test(email) ? (
							<FormattedMessage id="error.email-format" />
						) : touchedEmail && emailTest.test(email) ? (
							<FormattedMessage id="form.field-valid-email" />
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
				<FormLabel required className={classes.labels} margin="none">
					<FormattedMessage id="form.password" />
				</FormLabel>
				<TextField
					onBlur={setTouchedPassword}
					error={touchedPassword && !pswdTest.test(password)}
					helperText={
						touchedPassword && !pswdTest.test(password) ? (
							<FormattedMessage id="error.password-format" />
						) : touchedPassword && pswdTest.test(password) ? (
							<FormattedMessage id="form.field-valid-password" />
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
					disabled={!isValid()}
					testIdName="sign-up-form-submit-button"
					variant="signUp"
					className={classes.noBottomMargin}
				>
					<FormattedMessage id="account.sign-up" />
				</AsylumConnectButton>
			</form>
		</>
	);
};

export default withStyles(styles)(NameEmailPswd);
