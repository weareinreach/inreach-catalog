import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import MobileStepper from '@material-ui/core/MobileStepper';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';

import OrganizationAutocomplete from './OrganizationAutocomplete';

const LAWYER_TYPE = 'lawyer';
const PROVIDER_TYPE = 'provider';
const SEEKER_TYPE = 'seeker';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	flex: {display: 'flex'},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer'
	},
	paddingVertical: {padding: '2.5rem 0'},
	marginBottom: {marginBottom: '2rem'},
	marginBottomLg: {marginBottom: '3rem'},
	marginTop: {marginTop: '2rem'},
	marginVertical: {margin: '2rem 0'},
	spacingTop: {marginTop: '1rem'},
	backgroundTransparent: {backgroundColor: 'transparent'},
	cursor: {cursor: 'pointer', color: theme.palette.secondary[400]},
	labels: {
		textAlign: 'left',
		paddingLeft: '.25rem',
		marginBottom: '.25rem',
		marginTop: '1rem'
	},
	borderOutline: {
		borderWidth: '2px',
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
		'& .MuiOutlinedInput-input': {
			color: 'green'
		},
		'&:hover .MuiOutlinedInput-input': {
			color: 'black'
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			color: '#1D1F23'
		},
		'& .MuiInputLabel-outlined': {
			color: 'grey'
		},
		'&:hover .MuiInputLabel-outlined': {
			color: 'brown'
		},
		'& .MuiInputLabel-outlined.Mui-focused': {
			color: 'maroon'
		},
		'& .MuiFormHelperText-root': {
			color: 'green'
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: 'red'
		}
	}
});

const SignupForm = ({
	activeStep,
	classes,
	email,
	name,
	handleBlurOrganizations,
	handleChange,
	handleCreateAffiliation,
	handleMessageNew,
	handleOrganizationSearchChange,
	handleOrganizationSelect,
	handleOrganizationsFetchRequested,
	handleOrganizationsClearRequested,
	handleRequestClose,
	handleRequestOpen,
	handleSelect,
	handleSignUp,
	handleStepNext,
	handleStepBack,
	isLoadingOrganizations,
	locale,
	organizations,
	organizationSearch,
	organizationSelection,
	password,
	passwordConfirmation,
	selection
}) => {
	const emailLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.email" />
		) : selection === LAWYER_TYPE ? (
			<FormattedMessage id="form.lawyer-email" />
		) : (
			<FormattedMessage id="form.organisation.email" />
		);

	const nameLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.name" />
		) : selection === LAWYER_TYPE ? (
			<FormattedMessage id="form.lawyer-organization-name" />
		) : (
			<FormattedMessage id="form.lawyer-organization-name" />
		);

	const nameTest = new RegExp(/\s*(?:[\S]\s*){2}$/);
	const emailTest = new RegExp(/\S+@\S+\.\S+/);
	const pswdTest = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'
	);

	const [touchedName, setTouchedName] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);

	const handleTouchName = () => {
		setTouchedName(true);
	};

	const handleTouchEmail = () => {
		setTouchedEmail(true);
	};

	const handleTouchPassword = () => {
		setTouchedPassword(true);
	};

	const isValid = () => {
		if (
			name &&
			nameTest.test(name) === true &&
			email &&
			emailTest.test(email) === true &&
			password &&
			pswdTest.test(password) === true
		) {
			return true;
		}

		return false;
	};

	return (
		<div
			className={classes.container}
			data-test-id="dialog-container-sign-up-form"
		>
			{activeStep === 0 && (
				<div
					className={classes.container}
					data-test-id="dialog-container-sign-up-question"
				>
					<Typography className={classes.marginBottomLg} variant="h5">
						<FormattedMessage id="user.type-selection-prompt" />
					</Typography>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(SEEKER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-help-myself-button"
					>
						<FormattedMessage id="user.type-asylum-seeker" />
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(LAWYER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-attorney-button"
					>
						<FormattedMessage id="user.type-legal-provider" />
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottomLg}
						onClick={() => handleSelect(PROVIDER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-non-legal-service-provider-button"
					>
						<FormattedMessage id="user.type-non-legal-provider" />
					</AsylumConnectButton>
					<div
						onClick={() => handleRequestOpen('login')}
						data-test-id="dialog-container-sign-up-already-have-account"
					>
						<Typography variant="body1">
							<span className={classes.link}>
								<FormattedMessage id="account.already-have-account" />
							</span>
						</Typography>
					</div>
				</div>
			)}
			{activeStep === 1 && (
				<form className={classes.container} onSubmit={handleSignUp}>
					<FormLabel
						required
						className={classes.labels}
						classes={classes.fontWeightMedium}
						margin="none"
					>
						{nameLabel}
					</FormLabel>
					<TextField
						onBlur={handleTouchName}
						error={touchedName && nameTest.test(name) === false}
						helperText={
							touchedName && nameTest.test(name) === false ? (
								<FormattedMessage id="error.name-format" />
							) : touchedName && nameTest.test(name) === true ? (
								<FormattedMessage id="form.valid" />
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
					<FormLabel required className={classes.labels} margin="none">
						{emailLabel}
					</FormLabel>
					<TextField
						onBlur={handleTouchEmail}
						error={touchedEmail && emailTest.test(email) === false}
						helperText={
							touchedEmail && emailTest.test(email) === false ? (
								<FormattedMessage id="error.email-format" />
							) : touchedEmail && emailTest.test(email) === true ? (
								<FormattedMessage id="form.valid" />
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
						onBlur={handleTouchPassword}
						error={touchedPassword && pswdTest.test(password) === false}
						helperText={
							touchedPassword && pswdTest.test(email) === false ? (
								<FormattedMessage id="error.password-format" />
							) : touchedPassword && pswdTest.test(password) === true ? (
								<FormattedMessage id="form.valid" />
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
					<Typography
						variant="body1"
						className={classes.paddingVertical}
						data-test-id="sign-up-form-agreement-statement"
					>
						<FormattedMessage id="legal.sign-up-agree-to-terms" />
						{` `}
						<FormattedMessage id="legal.privacy-policy">
							{(privacy) => (
								<a
									href="https://asylumconnect.org/privacy"
									rel="noopener noreferrer"
									target="_blank"
									data-test-id="sign-up-form-privacy-link"
								>
									{privacy}
								</a>
							)}
						</FormattedMessage>{' '}
						<FormattedMessage id="legal.and" />{' '}
						<FormattedMessage id="legal.terms-of-use">
							{(terms) => (
								<a
									href="https://asylumconnect.org/terms-of-use"
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
					<AsylumConnectButton
						disabled={isValid() === false ? true : false}
						testIdName="sign-up-form-submit-button"
						variant="primary"
					>
						<FormattedMessage id="account.sign-up" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 2 && (
				<form onSubmit={handleCreateAffiliation}>
					""
					<Typography variant="h6" data-test-id="sign-up-form-header-text">
						<FormattedMessage id="account.join-organisation" />
					</Typography>
					<OrganizationAutocomplete
						handleBlurOrganizations={handleBlurOrganizations}
						handleMessageNew={handleMessageNew}
						handleOrganizationSearchChange={handleOrganizationSearchChange}
						handleOrganizationSelect={handleOrganizationSelect}
						handleOrganizationsFetchRequested={
							handleOrganizationsFetchRequested
						}
						handleOrganizationsClearRequested={
							handleOrganizationsClearRequested
						}
						handleRequestClose={handleRequestClose}
						isLoadingOrganizations={isLoadingOrganizations}
						locale={locale}
						organizationSearch={organizationSearch}
						organizationSelection={organizationSelection}
						organizations={organizations}
					/>
					<div className={classes.marginVertical}>
						<AsylumConnectButton
							variant="primary"
							testIdName="sign-up-form-join-organization-button"
							type="submit"
						>
							<FormattedMessage id="account.join-organisation" />
						</AsylumConnectButton>
					</div>
					<Typography variant="body1" data-test-id="sign-up-form-body-text">
						<FormattedMessage id="account.join-organisation-later" />
					</Typography>
					<Typography
						className={classes.cursor}
						variant="body1"
						data-test-id="sign-up-form-skip-text"
						onClick={() => handleRequestOpen('thankyou')}
					>
						<FormattedMessage id="action.skip" />
					</Typography>
				</form>
			)}
			{activeStep === 3 && (
				<form>
					<Typography variant="h6 " data-test-id="sign-up-form-header-text">
						<FormattedMessage id="action.confirmation" />
					</Typography>
					<div className={classes.marginVertical}>
						<Typography variant="body1" data-test-id="sign-up-form-body-text">
							<FormattedMessage id="account.join-organisation-request-received" />
						</Typography>
					</div>
					<div className={classes.marginVertical}>
						<AsylumConnectButton
							variant="primary"
							testIdName="sign-up-form-finish-registration-button"
							onClick={() => handleRequestOpen('thankyou')}
						>
							<FormattedMessage id="account.finish-registration" />
						</AsylumConnectButton>
					</div>
				</form>
			)}
			<MobileStepper
				className={classes.spacingTop + ' ' + classes.backgroundTransparent}
				type="dots"
				steps={selection === 'provider' || selection === 'lawyer' ? 4 : 2}
				position="static"
				activeStep={activeStep}
				nextButton={<div />}
				backButton={<div />}
			/>
			{activeStep === 1 && (
				<div className={classes.flex}>
					<Button
						data-test-id="sign-up-form-back-button"
						size="small"
						onClick={handleStepBack}
					>
						<KeyboardArrowLeft />
						<FormattedMessage id="navigation.back" />
					</Button>
				</div>
			)}
		</div>
	);
};

SignupForm.defaultProps = {
	organizationSelection: null
};

SignupForm.propTypes = {
	activeStep: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	handleBlurOrganizations: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleCreateAffiliation: PropTypes.func.isRequired,
	handleOrganizationSearchChange: PropTypes.func.isRequired,
	handleOrganizationSelect: PropTypes.func.isRequired,
	handleOrganizationsFetchRequested: PropTypes.func.isRequired,
	handleOrganizationsClearRequested: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleSelect: PropTypes.func.isRequired,
	handleSignUp: PropTypes.func.isRequired,
	handleStepBack: PropTypes.func.isRequired,
	handleStepNext: PropTypes.func.isRequired,
	organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
	organizationSearch: PropTypes.string.isRequired,
	organizationSelection: PropTypes.object,
	password: PropTypes.string.isRequired,
	passwordConfirmation: PropTypes.string.isRequired,
	selection: PropTypes.string.isRequired
};

export default withStyles(styles)(SignupForm);
