import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import MobileStepper from '@material-ui/core/MobileStepper';
import TextField from '@material-ui/core/TextField';
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
	backgroundTransparent: {backgroundColor: 'transparent'}
});

const SignupForm = ({
	activeStep,
	classes,
	email,
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
		selection === SEEKER_TYPE
			? 'Email'
			: selection === LAWYER_TYPE
			? 'Firm, Organization or School Email'
			: 'Organization Email';

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
						Which are you?
					</Typography>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(SEEKER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-help-myself-button"
					>
						I am looking for help for myself
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(LAWYER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-attorney-button"
					>
						I am an attorney or law student
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottomLg}
						onClick={() => handleSelect(PROVIDER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-non-legal-service-provider-button"
					>
						I am a non-legal service provider
					</AsylumConnectButton>
					<div
						onClick={() => handleRequestOpen('login')}
						data-test-id="dialog-container-sign-up-already-have-account"
					>
						<Typography variant="body1">
							<span className={classes.link}>Already have an account?</span>
						</Typography>
					</div>
				</div>
			)}
			{activeStep === 1 && (
				<form className={classes.container} onSubmit={handleSignUp}>
					<TextField
						id="email"
						label={emailLabel}
						margin="normal"
						name="email"
						onChange={handleChange}
						required
						type="email"
						value={email}
						data-test-id="sign-up-form-email-input"
					/>
					<TextField
						error={password.length > 0 && password.length < 8}
						helperText={
							password.length > 0 && password.length < 8
								? 'Password must be at least 8 characters.'
								: null
						}
						id="password"
						label="Password"
						margin="normal"
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={password}
						data-test-id="sign-up-form-password-input"
					/>
					<TextField
						id="passwordConfirmation"
						label="Confirm Password"
						margin="normal"
						name="passwordConfirmation"
						onChange={handleChange}
						required
						type="password"
						value={passwordConfirmation}
						data-test-id="sign-up-form-password-confirmation-input"
					/>
					<Typography
						variant="body1"
						className={classes.paddingVertical}
						data-test-id="sign-up-form-agreement-statement"
					>
						By clicking "Sign Up," you agree to AsylumConnect's{` `}
						<a
							href="https://asylumconnect.org/privacy"
							target="_blank"
							rel="noopener noreferrer"
							data-test-id="sign-up-form-privacy-link"
						>
							Privacy Policy
						</a>
						{` `}and{` `}
						<a
							href="https://asylumconnect.org/terms-of-use"
							target="_blank"
							rel="noopener noreferrer"
							data-test-id="sign-up-form-terms-link"
						>
							Terms of Use
						</a>
						.
					</Typography>
					<AsylumConnectButton
						testIdName="sign-up-form-submit-button"
						variant="primary"
					>
						Sign Up
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 2 && (
				<form onSubmit={handleCreateAffiliation}>
					""
					<Typography variant="h6" data-test-id="sign-up-form-header-text">
						Connect to Your Organization
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
						>
							Join Organization
						</AsylumConnectButton>
					</div>
					<Typography variant="body1" data-test-id="sign-up-form-body-text">
						You may also join your organization later in account settings.
					</Typography>
				</form>
			)}
			{activeStep === 3 && (
				<form onSubmit={handleRequestOpen('thankyou')}>
					<Typography variant="h6 " data-test-id="sign-up-form-header-text">
						Confirmation
					</Typography>
					<div className={classes.marginVertical}>
						<Typography variant="body1" data-test-id="sign-up-form-body-text">
							Thank you for requesting to join an organization's profile page on
							AsylumConnect. Our team will review your request shortly. We will
							reach out if we need more information to verify your connection to
							the requested organization.
						</Typography>
					</div>
					<div className={classes.marginVertical}>
						<AsylumConnectButton
							variant="primary"
							testIdName="sign-up-form-finish-registration-button"
						>
							Finish Registration
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
				<div data-test-id="sign-up-form-back-button" className={classes.flex}>
					<Button size="small" onClick={handleStepBack}>
						<KeyboardArrowLeft />
						Back
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
