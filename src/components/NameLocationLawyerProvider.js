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
	organizationTypesLawyer,
	organizationTypesProvider
} from '../data/organizationTypeFormOptions';

const LAWYER_TYPE = 'lawyer';

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
	formQuestion0: {
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '600',
		lineHeight: '24.51px',
		marginBottom: '16px',
		marginTop: '28px'
	},
	greyLine: {
		width: 'auto',
		height: '1px',
		backgroundColor: theme.palette.common.darkGrey,
		marginTop: `${theme.spacing(3)}px`
	},
	gridTxtAlign: {
		textAlign: 'left'
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

const NameLocationLawyerProvider = (props) => {
	const {
		classes,
		handleStepNext,
		handleChange,
		name,
		orgType,
		specifiedOrgType,
		selection,
		currentLocation
	} = props;

	const intl = useIntl();

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	const [touchedName, setTouchedName] = useState(false);
	const [touchedLocation, setTouchedLocation] = useState(false);
	const [touchedOrgType, setTouchedOrgType] = useState(false);

	const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);

	const orgTypeQuestion =
		selection === LAWYER_TYPE ? (
			<FormattedMessage
				id="account.signup-organization-orgType-lawyer"
				defaultMessage="Where do you practice law? *"
				description="question - for lawyer form"
			/>
		) : (
			<FormattedMessage
				id="account.signup-organization-orgType-provider"
				defaultMessage="Where do you work or volunteer? *"
				description="question for volunteer form"
			/>
		);
	const orgTypeOptions =
		selection === LAWYER_TYPE
			? organizationTypesLawyer
			: organizationTypesProvider;
	const orgTypeOther =
		selection === LAWYER_TYPE ? (
			<FormattedMessage
				id="account.signup-organization-orgType-lawyer-other"
				defaultMessage="I practice law here:"
				description="placeholder for the I practice law here, input field"
			/>
		) : (
			<FormattedMessage
				id="account.signup-organization-orgType-provider-other"
				defaultMessage="I work/volunteer here:"
				description="placeholder for the I volunteer here, input field"
			/>
		);

	const isOrgValid = () => {
		if (
			name &&
			textFieldTest.test(name) &&
			currentLocation &&
			textFieldTest.test(currentLocation)
		) {
			if (
				(orgType && orgType !== 'other') ||
				(orgType === 'other' && textFieldTest.test(specifiedOrgType))
			) {
				return true;
			}
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
						description="Sign Up dialog title"
					/>
				</DialogTitle>
			)}
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage
					id="app.welcome-main-3"
					defaultMessage="The world's first tech platform matching LGBTQ+ people with safe, verified resources."
					description="Sub-title describing the InReach application"
				/>
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<form
				className={
					isMobile ? classes.formContainerMobile : classes.formContainer
				}
				onSubmit={handleStepNext}
				data-test-id="name-location-form"
			>
				<FormLabel required className={classes.labels} margin="none">
					<FormattedMessage
						id="form.lawyer-organization-name"
						defaultMessage="First and Last Name"
						description="label for the Name input field"
					/>
				</FormLabel>
				<TextField
					onBlur={setTouchedName}
					error={touchedName && !textFieldTest.test(name)}
					helperText={
						touchedName && !textFieldTest.test(name) ? (
							<FormattedMessage
								id="error.text-field-name"
								defaultMessage="'Name' field must contain at least 2 characters"
								description="error message if the Name input field is not formatted properly"
							/>
						) : touchedName && textFieldTest.test(name) ? (
							<FormattedMessage
								id="form.field-valid-name"
								defaultMessage="'Name' field is valid"
								description="Success message if the Name field is formatted properly"
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
				<FormLabel required className={classes.labels} margin="none">
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
								description="Success message if the Name field is formatted properly"
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
							<Grid item xs={isMobile ? 12 : 6} key={index}>
								<FormControlLabel
									value={type.dbValue}
									control={<Radio />}
									label={intl.formatMessage({id: type.formatMessageId})}
									checked={orgType === type.dbValue}
									data-test-id={type.dbValue}
								/>
							</Grid>
						))}
					</Grid>
				</RadioGroup>
				{orgType === 'other' ? (
					<>
						<FormLabel required className={classes.labels} margin="none">
							{orgTypeOther}
						</FormLabel>
						<TextField
							onBlur={setTouchedOrgType}
							error={touchedOrgType && !textFieldTest.test(specifiedOrgType)}
							helperText={
								touchedOrgType && !textFieldTest.test(specifiedOrgType) ? (
									<FormattedMessage
										id="error.text-field-orgType"
										defaultMessage="'Organization Type' field must contain at least 2 characters"
										description="Error message for the Organization input field"
									/>
								) : touchedOrgType && textFieldTest.test(specifiedOrgType) ? (
									<FormattedMessage
										id="form.field-valid-orgType"
										defaultMessage="'Organization Type' field is valid"
										description="Success message for the Organization input field"
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
					disabled={!isOrgValid()}
					testIdName="sign-up-form-next-button"
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

export default withStyles(styles)(NameLocationLawyerProvider);
