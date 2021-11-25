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

import {
	aboutYouImmigrationOptions,
	aboutYouCountryOptions,
	aboutYouSogOptions,
	aboutYouEthnicityOptions,
	aboutYouAgeOptions
} from '../data/aboutYouFormOptions';
import {
	organizationTypesLawyer,
	organizationTypesProvider
} from '../data/organizationTypeFormOptions';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import AsylumConnectSignupAgreement from './AsylumConnectSignupAgreement';
import OrganizationAutocomplete from './OrganizationAutocomplete';

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
	question: {
		fontSize: '18px',
		fontWeight: '600',
		lineHeight: '25px',
		marginBottom: '48px',
		marginTop: `${theme.spacing(4.5)}px`
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
	marginBottom: {marginBottom: '2rem'},
	marginBottomLg: {marginBottom: '3rem'},
	marginVertical: {margin: '2rem 0'},
	stepperSpacing0: {
		marginTop: '28px',
		marginBottom: '64px'
	},
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
	formQuestion: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '24.51px',
		marginBottom: '24px'
	},
	formQuestion0: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '24.51px',
		marginBottom: '16px',
		marginTop: '28px'
	},
	formQuestion1: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '24.51px',
		marginBottom: '8px'
	},
	formQuestion2: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '20px',
		marginBottom: '24px'
	},
	formStatement: {
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '24px',
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
	labels: {
		textAlign: 'left',
		paddingLeft: '.25rem',
		marginBottom: '.25rem',
		marginTop: '1rem'
	},
	gridTxtAlign: {
		textAlign: 'left'
	},
	nextBtn: {
		marginTop: '24px',
		marginBottom: 'unset'
	},
	nextBtn2: {
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

const SignupForm = (props) => {
	const {
		activeStep,
		classes,
		email,
		name,
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
		handleUpdateUser,
		isLoadingOrganizations,
		locale,
		organizations,
		organizationSearch,
		organizationSelection,
		password,
		selection,
		currentLocation,
		orgType,
		specifiedOrgType,
		orgName,
		orgPositionTitle,
		reasonForJoining,
		immigrationStatus,
		countryOfOrigin,
		sogIdentity,
		ethnicityRace,
		age,
		specifiedCountry,
		specifiedIdentity,
		specifiedEthnicity
	} = props;

	const intl = useIntl();

	const [touchedName, setTouchedName] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);
	const [touchedLocation, setTouchedLocation] = useState(false);
	const [touchedOrgType, setTouchedOrgType] = useState(false);
	const [touchedOrgName, setTouchedOrgName] = useState(false);
	const [touchedPosition, setTouchedPosition] = useState(false);
	const [touchedReason, setTouchedReason] = useState(false);
	const [touchedCountry, setTouchedCountry] = useState(false);
	const [touchedIdentity, setTouchedIdentity] = useState(false);
	const [touchedEthnicity, setTouchedEthnicity] = useState(false);

	const dialogTitle =
		activeStep < 3 ? (
			<FormattedMessage id="account.sign-up" />
		) : activeStep === 3 || activeStep === 4 ? (
			<FormattedMessage id="account.signup-organization-affiliation-title" />
		) : activeStep > 4 && activeStep < 11 ? (
			<FormattedMessage id="account.signup-about-you" />
		) : null;

	const dialogSubTitle =
		activeStep < 3 ? (
			<FormattedMessage id="account.signup-subtitle" />
		) : activeStep === 3 && selection === LAWYER_TYPE ? (
			<FormattedMessage id="account.signup-organization-law-affiliation-subtitle" />
		) : activeStep === 3 && selection === PROVIDER_TYPE ? (
			<FormattedMessage id="account.signup-organization-provider-affiliation-subtitle" />
		) : activeStep > 4 && activeStep < 11 ? (
			<FormattedMessage id="account.signup-about-you-subtitle" />
		) : null;

	const emailLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.email" />
		) : selection === LAWYER_TYPE ? (
			<FormattedMessage id="form.lawyer-email" />
		) : (
			<FormattedMessage id="form.organisation-email" />
		);

	const nameLabel =
		selection === SEEKER_TYPE ? (
			<FormattedMessage id="form.name" />
		) : (
			<FormattedMessage id="form.lawyer-organization-name" />
		);

	const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);
	const emailTest = new RegExp(/\S+@\S+\.\S+/);
	const pswdTest = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?])(?=.{10,})'
	);

	const orgTypeQuestion =
		selection === LAWYER_TYPE ? (
			<FormattedMessage id="account.signup-organization-orgType-lawyer" />
		) : (
			<FormattedMessage id="account.signup-organization-orgType-provider" />
		);
	const orgTypeOptions =
		selection === LAWYER_TYPE
			? organizationTypesLawyer
			: organizationTypesProvider;
	const orgTypeOther =
		selection === LAWYER_TYPE ? (
			<FormattedMessage id="account.signup-organization-orgType-lawyer-other" />
		) : (
			<FormattedMessage id="account.signup-organization-orgType-provider-other" />
		);
	const handleTouchName = () => {
		setTouchedName(true);
	};

	const handleTouchEmail = () => {
		setTouchedEmail(true);
	};

	const handleTouchPassword = () => {
		setTouchedPassword(true);
	};

	const handleTouchLocation = () => {
		setTouchedLocation(true);
	};

	const handleTouchOrgType = () => {
		setTouchedOrgType(true);
	};

	const handleTouchOrgName = () => {
		setTouchedOrgName(true);
	};

	const handleTouchPosition = () => {
		setTouchedPosition(true);
	};

	const handleTouchReason = () => {
		setTouchedReason(true);
	};

	const handleTouchCountry = () => {
		setTouchedCountry(true);
	};

	const handleTouchIdentity = () => {
		setTouchedIdentity(true);
	};

	const handleTouchEthnicity = () => {
		setTouchedEthnicity(true);
	};

	const isValid = () => {
		if (
			name &&
			textFieldTest.test(name) === true &&
			email &&
			emailTest.test(email) === true &&
			password &&
			pswdTest.test(password) === true
		) {
			return true;
		}

		return false;
	};

	const isOrgValid = () => {
		if (
			name &&
			textFieldTest.test(name) === true &&
			currentLocation &&
			textFieldTest.test(currentLocation) === true
		) {
			if (
				(orgType && orgType !== 'Other (specify)') ||
				(orgType === 'Other (specify)' &&
					textFieldTest.test(specifiedOrgType) === true)
			) {
				return true;
			}
		}

		return false;
	};

	return (
		<div
			className={classes.container}
			data-test-id="sign-up-form-base-container"
		>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogSubTitle className={classes.sideMargin}>
				{dialogSubTitle}
			</DialogSubTitle>
			<div className={classes.greyLine} />
			{activeStep === 0 && (
				<div data-test-id="sign-up-catalog-type">
					<Typography className={classes.question} variant="h3">
						<FormattedMessage id="account.signup-catalog-type-selection-prompt" />
					</Typography>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(SEEKER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-help-myself-button"
					>
						<FormattedMessage id="account.signup-catalog-type-asylum-seeker" />
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottom}
						onClick={() => handleSelect(LAWYER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-attorney-button"
					>
						<FormattedMessage id="account.signup-catalog-type-legal-provider" />
					</AsylumConnectButton>
					<AsylumConnectButton
						className={classes.marginBottomLg}
						onClick={() => handleSelect(PROVIDER_TYPE)}
						variant="primary"
						testIdName="dialog-container-sign-up-non-legal-service-provider-button"
					>
						<FormattedMessage id="account.signup-catalog-type-non-legal-provider" />
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
				<form
					className={classes.formContainer}
					onSubmit={handleStepNext}
					data-test-id="name-location-form"
				>
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
						error={touchedName && textFieldTest.test(name) === false}
						helperText={
							touchedName && textFieldTest.test(name) === false ? (
								<FormattedMessage
									id="error.text-field"
									values={{field: 'Name'}}
								/>
							) : touchedName && textFieldTest.test(name) === true ? (
								<FormattedMessage
									id="form.field-valid"
									values={{field: 'name'}}
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
					<FormLabel
						required
						className={classes.labels}
						classes={classes.fontWeightMedium}
						margin="none"
					>
						<FormattedMessage id="account.signup-organization-location" />
					</FormLabel>
					<TextField
						onBlur={handleTouchLocation}
						error={
							touchedLocation && textFieldTest.test(currentLocation) === false
						}
						helperText={
							touchedLocation &&
							textFieldTest.test(currentLocation) === false ? (
								<FormattedMessage
									id="error.text-field"
									values={{field: 'Location'}}
								/>
							) : touchedLocation &&
							  textFieldTest.test(currentLocation) === true ? (
								<FormattedMessage
									id="form.field-valid"
									values={{field: 'location'}}
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
					<Typography className={classes.formQuestion0} variant="h3">
						{orgTypeQuestion}
					</Typography>
					<RadioGroup
						name="orgType"
						value={orgType}
						onChange={handleChange}
						required={true}
					>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{orgTypeOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
										checked={orgType.includes(type)}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					{orgType === 'Other (specify)' ? (
						<>
							<FormLabel
								required
								className={classes.labels}
								classes={classes.fontWeightMedium}
								margin="none"
							>
								{orgTypeOther}
							</FormLabel>
							<TextField
								onBlur={handleTouchOrgType}
								error={
									touchedOrgType &&
									textFieldTest.test(specifiedOrgType) === false
								}
								helperText={
									touchedOrgType &&
									textFieldTest.test(specifiedOrgType) === false ? (
										<FormattedMessage
											id="error.text-field"
											values={{field: 'Organization type'}}
										/>
									) : touchedOrgType &&
									  textFieldTest.test(specifiedOrgType) === true ? (
										<FormattedMessage
											id="form.field-valid"
											values={{field: 'organization type'}}
										/>
									) : null
								}
								id="specifiedOrgType"
								margin="none"
								name="specifiedOrgType"
								onChange={handleChange}
								required
								type="text"
								value={specifiedOrgType}
								placeholder={intl.formatMessage({
									id: 'account.signup-generic-placeholder'
								})}
								data-test-id="sign-up-form-orgType-input"
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
					<AsylumConnectButton
						disabled={isOrgValid() === false ? true : false}
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 2 && (
				<form
					className={classes.formContainer}
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
								onBlur={handleTouchName}
								error={touchedName && textFieldTest.test(name) === false}
								helperText={
									touchedName && textFieldTest.test(name) === false ? (
										<FormattedMessage
											id="error.text-field"
											values={{field: 'Name'}}
										/>
									) : touchedName && textFieldTest.test(name) === true ? (
										<FormattedMessage
											id="form.field-valid"
											values={{field: 'name'}}
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
						</>
					) : null}
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
								<FormattedMessage
									id="form.field-valid"
									values={{field: 'email'}}
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
					<FormLabel required className={classes.labels} margin="none">
						<FormattedMessage id="form.password" />
					</FormLabel>
					<TextField
						onBlur={handleTouchPassword}
						error={touchedPassword && pswdTest.test(password) === false}
						helperText={
							touchedPassword && pswdTest.test(password) === false ? (
								<FormattedMessage id="error.password-format" />
							) : touchedPassword && pswdTest.test(password) === true ? (
								<FormattedMessage
									id="form.field-valid"
									values={{field: 'password'}}
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
						disabled={isValid() === false ? true : false}
						testIdName="sign-up-form-submit-button"
						variant="primary"
						className={classes.noBottomMargin}
					>
						<FormattedMessage id="account.sign-up" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 3 && (
				<form
					className={classes.formContainer}
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
						onClick={() => handleStepNext()}
					>
						<FormattedMessage id="action.skip" />
					</Typography>
				</form>
			)}
			{activeStep === 4 && (
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
							className={classes.orgBody2}
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
			)}
			{activeStep === 5 && (
				<form
					className={classes.formContainer}
					onSubmit={handleUpdateUser}
					data-test-id="about-you-organization"
				>
					<FormLabel
						className={classes.formLabel}
						classes={classes.fontWeightMedium}
						margin="none"
					>
						<FormattedMessage id="aboutyou.organization-name" />
					</FormLabel>
					<TextField
						onBlur={handleTouchOrgName}
						id="orgName"
						margin="none"
						name="orgName"
						onChange={handleChange}
						type="text"
						value={orgName}
						placeholder={intl.formatMessage({
							id: 'aboutyou.organization-name-placeholder'
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
						<FormattedMessage id="aboutyou.organization-postion" />
					</FormLabel>
					<TextField
						onBlur={handleTouchPosition}
						id="orgPositionTitle"
						margin="none"
						name="orgPositionTitle"
						onChange={handleChange}
						type="text"
						value={orgPositionTitle}
						placeholder={intl.formatMessage({
							id: 'aboutyou.organization-postion-placeholder'
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
						<FormattedMessage id="aboutyou.organization-reason" />
					</FormLabel>
					<TextField
						onBlur={handleTouchReason}
						id="reasonForJoining"
						margin="none"
						name="reasonForJoining"
						onChange={handleChange}
						type="text"
						value={reasonForJoining}
						placeholder={intl.formatMessage({
							id: 'aboutyou.organization-reason-placeholder'
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
						disabled={isValid() === false ? true : false}
						testIdName="about-you-next-button"
						variant="primary"
						className={classes.nextBtn2}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 6 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						<FormattedMessage id="aboutyou.immigration" />
					</Typography>
					<RadioGroup
						name="immigrationStatus"
						onChange={handleChange}
						required={true}
					>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{aboutYouImmigrationOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
										checked={immigrationStatus.includes(type)}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					<AsylumConnectButton
						// disabled={isOrgValid() === false ? true : false}
						testIdName="about-you-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 7 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						<FormattedMessage id="aboutyou.country" />
					</Typography>
					<RadioGroup
						name="countryOfOrigin"
						onChange={handleChange}
						required={true}
					>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{aboutYouCountryOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
										checked={countryOfOrigin === type}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					{countryOfOrigin === 'Other (specify)' ? (
						<>
							<FormLabel
								required
								className={classes.labels}
								classes={classes.fontWeightMedium}
								margin="none"
							>
								<FormattedMessage id="aboutyou.country-other" />
							</FormLabel>
							<TextField
								onBlur={handleTouchCountry}
								error={
									touchedCountry &&
									textFieldTest.test(specifiedCountry) === false
								}
								helperText={
									handleTouchCountry &&
									textFieldTest.test(specifiedCountry) === false ? (
										<FormattedMessage
											id="error.text-field"
											values={{field: 'Country'}}
										/>
									) : touchedCountry &&
									  textFieldTest.test(specifiedCountry) === true ? (
										<FormattedMessage
											id="form.field-valid"
											values={{field: 'country'}}
										/>
									) : null
								}
								id="specifiedCountry"
								margin="none"
								name="specifiedCountry"
								onChange={handleChange}
								required
								type="text"
								value={specifiedCountry}
								placeholder={intl.formatMessage({
									id: 'aboutyou.country-other-placeholder'
								})}
								data-test-id="about-you-country"
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
					<AsylumConnectButton
						disabled={
							countryOfOrigin.includes('Other (specify)') &&
							textFieldTest.test(specifiedCountry) === false
						}
						testIdName="about-you-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 8 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion1} variant="h3">
						<FormattedMessage id="aboutyou.identity" />
					</Typography>
					<Typography className={classes.formQuestion2} variant="h3">
						<FormattedMessage id="aboutyou.select-all" />
					</Typography>

					<Grid container spacing={0} className={classes.gridTxtAlign}>
						{aboutYouSogOptions.map((type, index) => (
							<Grid item xs={4}>
								<FormControlLabel
									disabled={
										sogIdentity.includes('Prefer not to say') &&
										type != 'Prefer not to say'
									}
									key={type}
									value={type}
									control={<Checkbox />}
									label={type}
									name="sogIdentity"
									onChange={handleChangeArray}
									checked={sogIdentity.includes(type)}
								/>
							</Grid>
						))}
					</Grid>
					{sogIdentity.includes('Other (specify)') ? (
						<>
							<FormLabel
								required
								className={classes.labels}
								classes={classes.fontWeightMedium}
								margin="none"
							>
								<FormattedMessage id="aboutyou.identity" />
							</FormLabel>
							<TextField
								onBlur={handleTouchIdentity}
								error={
									touchedIdentity &&
									textFieldTest.test(specifiedIdentity) === false
								}
								helperText={
									handleTouchIdentity &&
									textFieldTest.test(specifiedIdentity) === false ? (
										<FormattedMessage
											id="error.text-field"
											values={{field: 'Self-Identity'}}
										/>
									) : touchedCountry &&
									  textFieldTest.test(specifiedIdentity) === true ? (
										<FormattedMessage
											id="form.field-valid"
											values={{field: 'self-identity'}}
										/>
									) : null
								}
								id="specifiedIdentity"
								margin="none"
								name="specifiedIdentity"
								onChange={handleChange}
								required
								type="text"
								value={specifiedIdentity}
								placeholder={intl.formatMessage({
									id: 'account.signup-generic-placeholder'
								})}
								data-test-id="about-you-sogIdentity"
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
					<AsylumConnectButton
						disabled={
							sogIdentity.includes('Other (specify)') &&
							textFieldTest.test(specifiedIdentity) === false
						}
						testIdName="about-you-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 9 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion1} variant="h3">
						<FormattedMessage id="aboutyou.ethnicity" />
					</Typography>
					<Typography className={classes.formQuestion2} variant="h3">
						<FormattedMessage id="aboutyou.select-all" />
					</Typography>

					<Grid container spacing={0} className={classes.gridTxtAlign}>
						{aboutYouEthnicityOptions.map((type, index) => (
							<Grid item xs={6}>
								<FormControlLabel
									disabled={
										ethnicityRace.includes('Prefer not to say') &&
										type != 'Prefer not to say'
									}
									key={type}
									value={type}
									control={<Checkbox />}
									label={type}
									name="ethnicityRace"
									onChange={handleChangeArray}
									checked={ethnicityRace.includes(type)}
								/>
							</Grid>
						))}
					</Grid>
					{ethnicityRace.includes('Other (specify)') ? (
						<>
							<FormLabel
								required
								className={classes.labels}
								classes={classes.fontWeightMedium}
								margin="none"
							>
								<FormattedMessage id="aboutyou.ethnicity" />
							</FormLabel>
							<TextField
								onBlur={handleTouchEthnicity}
								error={
									touchedEthnicity &&
									textFieldTest.test(specifiedEthnicity) === false
								}
								helperText={
									handleTouchEthnicity &&
									textFieldTest.test(specifiedEthnicity) === false ? (
										<FormattedMessage
											id="error.text-field"
											values={{field: 'Ethnicity or Race'}}
										/>
									) : touchedCountry &&
									  textFieldTest.test(specifiedEthnicity) === true ? (
										<FormattedMessage
											id="form.field-valid"
											values={{field: 'Ethnicty or Race'}}
										/>
									) : null
								}
								id="specifiedEthnicity"
								margin="none"
								name="specifiedEthnicity"
								onChange={handleChange}
								required
								type="text"
								value={specifiedEthnicity}
								placeholder={intl.formatMessage({
									id: 'account.signup-generic-placeholder'
								})}
								data-test-id="about-you-ethnicity"
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
					<AsylumConnectButton
						disabled={
							ethnicityRace.includes('Other (specify)') &&
							textFieldTest.test(specifiedEthnicity) === false
						}
						testIdName="about-you-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="navigation.next" />
					</AsylumConnectButton>
				</form>
			)}
			{activeStep === 10 && (
				<form className={classes.formContainer} onSubmit={handleUpdateUser}>
					<Typography className={classes.formQuestion} variant="h3">
						<FormattedMessage id="aboutyou.age" />
					</Typography>
					<RadioGroup name="age" onChange={handleChange} required={true}>
						<Grid container spacing={0} className={classes.gridTxtAlign}>
							{aboutYouAgeOptions.map((type, index) => (
								<Grid item xs={6}>
									<FormControlLabel
										key={type}
										value={type}
										control={<Radio />}
										label={type}
									/>
								</Grid>
							))}
						</Grid>
					</RadioGroup>
					<AsylumConnectButton
						testIdName="sign-up-form-next-button"
						variant="primary"
						className={classes.nextBtn}
					>
						<FormattedMessage id="action.submit" />
					</AsylumConnectButton>
				</form>
			)}
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
			{(activeStep === 1 || activeStep === 2) && (
				<div className={classes.flex + ' ' + classes.backButton}>
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
			{activeStep > 6 && activeStep < 11 && (
				<div className={classes.flex + ' ' + classes.backButton}>
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
	selection: PropTypes.string.isRequired,
	intl: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
