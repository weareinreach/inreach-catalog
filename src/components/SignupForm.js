import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

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
	backgroundTransparent: {backgroundColor: 'transparent'},
	cursor: {cursor: 'pointer', color: theme.palette.secondary[400]}
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
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.email" />
		) : selection === LAWYER_TYPE ? (
			<FormattedMessage id="form.lawyer-email" />
		) : (
			<FormattedMessage id="form.organization.email" />
		);

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
							password.length > 0 && password.length < 8 ? (
								<FormattedMessage id="error.password-length" />
							) : null
						}
						id="password"
						label=<FormattedMessage id="form.password" />
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
						label=<FormattedMessage id="form.confirm-password" />
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
						<FormattedMessage id="account.join-organization" />
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
							<FormattedMessage id="account.join-organization" />
						</AsylumConnectButton>
					</div>
					<Typography variant="body1" data-test-id="sign-up-form-body-text">
						<FormattedMessage id="account.join-organization-later" />
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
							<FormattedMessage id="account.join-organization-request-received" />
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
