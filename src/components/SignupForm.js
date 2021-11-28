import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {breakpoints} from '../theme';

import {
	organizationTypesLawyer,
	organizationTypesProvider
} from '../data/organizationTypeFormOptions';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import OrganizationAutocomplete from './OrganizationAutocomplete';

import SeekerType from './SeekerType';
import NameLocationLawyerProvider from './NameLocationLawyerProvider';
import NameEmailPswd from './NameEmailPswd';
import AboutYouImmigration from './AboutYouImmigration';
import AboutYouCountry from './AboutYouCountry';
import AboutYouIdentity from './AboutYouIdentity';
import AboutYouEthnicity from './AboutYouEthnicity';
import AboutYouAge from './AboutYouAge';
import AboutYouOrganization from './AboutYouOrganization';

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
	containerMobile: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto',
		height: '975px',
		marginTop: '25px'
	},
	subTitle: {
		fontStyle: 'italic',
		marginBottom: '24px',
		borderBottom: '1px'
	},
	greyLine: {
		width: 'auto',
		height: '1px',
		backgroundColor: theme.palette.common.darkGrey,
		marginTop: `${theme.spacing(3)}px`
	},
	flex: {display: 'flex'},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '20px',
		marginTop: '48px'
	},
	orgBody1: {
		fontSize: '18px',
		fontWeight: '400',
		lineHeight: '24px',
		marginBottom: '17px'
	},
	orgBody2: {
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '24px',
		marginBottom: '64px',
		marginLeft: '48px',
		marginRight: '48px'
	},
	orgBodyMobile: {
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '24px',
		marginBottom: '48px',
		marginLeft: '24px',
		marginRight: '24px'
	},
	marginVertical: {margin: '2rem 0'},
	stepperSpacing1: {
		marginTop: '24px',
		marginBottom: '8px'
	},
	stepperSpacing2: {
		marginTop: '24px',
		marginBottom: '60px'
	},
	backgroundTransparent: {backgroundColor: 'transparent'},
	cursor: {cursor: 'pointer', color: theme.palette.secondary[400]},
	backButton: {
		marginLeft: '48px',
		marginBottom: '36px',
		textAlign: 'center'
	},
	backButtonMobile: {
		marginLeft: '12px',
		marginBottom: '36px'
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
	formStatement: {
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '24px',
		marginTop: '24px'
	},
	labels: {
		textAlign: 'left',
		paddingLeft: '.25rem',
		marginBottom: '.25rem',
		marginTop: '1rem'
	},
	sideMargin: {
		marginLeft: '48px',
		marginRight: '48px'
	},
	sideMarginMobile: {
		marginLeft: '24px',
		marginRight: '24px'
	}
});

const SignupForm = (props) => {
	const {
		activeStep,
		classes,
		handleBlurOrganizations,
		handleChange,
		handleChangeArray,
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
		handleSkip,
		handleUpdateUser,
		isLoadingOrganizations,
		locale,
		organizations,
		organizationSearch,
		organizationSelection,
		selection
	} = props;

	const intl = useIntl();

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	const dialogSubTitle =
		selection === LAWYER_TYPE ? (
			<FormattedMessage id="account.signup-organization-law-affiliation-subtitle" />
		) : (
			<FormattedMessage id="account.signup-organization-provider-affiliation-subtitle" />
		);
	return (
		<div
			className={isMobile ? classes.containerMobile : classes.container}
			data-test-id="sign-up-form-base-container"
		>
			{activeStep === 0 && <SeekerType {...props}></SeekerType>}
			{activeStep === 1 && (
				<NameLocationLawyerProvider {...props}></NameLocationLawyerProvider>
			)}
			{activeStep === 2 && <NameEmailPswd {...props}></NameEmailPswd>}
			{activeStep === 3 && (
				<>
					<DialogTitle>
						<FormattedMessage id="account.signup-organization-affiliation-title" />
					</DialogTitle>
					<DialogSubTitle
						className={isMobile ? classes.sideMarginMobile : classes.sideMargin}
					>
						{dialogSubTitle}
					</DialogSubTitle>
					<div className={classes.greyLine} />
					<form
						className={
							isMobile ? classes.formContainerMobile : classes.formContainer
						}
						onSubmit={handleCreateAffiliation}
					>
						<Typography
							variant="body1"
							className={classes.labels}
							data-test-id="sign-up-form-header-text"
							align="left"
						>
							<FormattedMessage id="form.organization-name-title" />
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
								disabled={organizationSelection === null ? true : false}
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
							onClick={() => handleSkip()}
						>
							<FormattedMessage id="action.skip" />
						</Typography>
					</form>
				</>
			)}
			{activeStep === 4 && (
				<>
					<DialogTitle>
						<FormattedMessage id="account.signup-organization-affiliation-title" />
					</DialogTitle>
					<div className={classes.greyLine} />
					<form className={classes.formContainer} onSubmit={handleStepNext}>
						<div className={classes.marginVertical}>
							<Typography
								variant="body1"
								className={classes.orgBody1}
								data-test-id="sign-up-form-org-request-rcv"
							>
								<FormattedMessage id="account.join-organisation-request-received" />
							</Typography>
							<Typography
								variant="body1"
								className={isMobile ? classes.orgBodyMobile : classes.orgBody2}
								data-test-id="sign-up-form-org-request-next"
							>
								<FormattedMessage id="account.join-organization-next-step" />
							</Typography>
						</div>
						<div className={classes.marginVertical}>
							<AsylumConnectButton
								variant="primary"
								testIdName="sign-up-form-finish-registration-button"
							>
								<FormattedMessage id="navigation.next" />
							</AsylumConnectButton>
						</div>
					</form>
				</>
			)}
			{activeStep === 5 && (
				<AboutYouOrganization {...props}></AboutYouOrganization>
			)}
			{activeStep === 6 && (
				<AboutYouImmigration {...props}></AboutYouImmigration>
			)}
			{activeStep === 7 && <AboutYouCountry {...props}></AboutYouCountry>}
			{activeStep === 8 && <AboutYouIdentity {...props}></AboutYouIdentity>}
			{activeStep === 9 && <AboutYouEthnicity {...props}></AboutYouEthnicity>}
			{activeStep === 10 && <AboutYouAge {...props}></AboutYouAge>}
			{activeStep > 4 && activeStep < 11 && (
				<Typography className={classes.formStatement} variant="h5">
					<FormattedMessage id="aboutyou.complete-later" />
				</Typography>
			)}
			{activeStep < 3 && (
				<MobileStepper
					className={
						classes.stepperSpacing1 + ' ' + classes.backgroundTransparent
					}
					type="dots"
					steps={selection === SEEKER_TYPE || selection === '' ? 2 : 3}
					position="static"
					activeStep={
						selection === SEEKER_TYPE && activeStep > 0
							? activeStep - 1
							: activeStep
					}
					nextButton={<div />}
					backButton={<div />}
				/>
			)}
			{(activeStep >= 3 && selection !== SEEKER_TYPE) ||
				activeStep !== 5 ||
				(activeStep !== 2 && (
					<MobileStepper
						className={
							classes.stepperSpacing1 + ' ' + classes.backgroundTransparent
						}
						type="dots"
						steps={2}
						position="static"
						activeStep={activeStep - 3}
						nextButton={<div />}
						backButton={<div />}
					/>
				))}
			{activeStep === 5 && (
				<MobileStepper
					className={
						classes.stepperSpacing2 + ' ' + classes.backgroundTransparent
					}
					type="dots"
					steps={1}
					position="static"
					activeStep={0}
					nextButton={<div />}
					backButton={<div />}
				/>
			)}
			{activeStep > 5 && activeStep < 11 && (
				<MobileStepper
					className={
						activeStep === 6
							? classes.stepperSpacing2
							: classes.stepperSpacing1 + ' ' + classes.backgroundTransparent
					}
					type="dots"
					steps={5}
					position="static"
					activeStep={activeStep - 6}
					nextButton={<div />}
					backButton={<div />}
				/>
			)}
			{(activeStep === 1 ||
				activeStep === 2 ||
				(activeStep > 6 && activeStep < 11)) && (
				<div
					className={
						isMobile
							? classes.flex + ' ' + classes.backButtonMobile
							: classes.flex + ' ' + classes.backButton
					}
				>
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
	selection: PropTypes.string.isRequired
};

export default withStyles(styles)(SignupForm);
