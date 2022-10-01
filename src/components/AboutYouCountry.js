import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import DialogSubTitle from './DialogSubTitle';
import {breakpoints} from '../theme';

import {aboutYouCountryOptions} from '../data/aboutYouFormOptions';

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

const AboutYouCountry = (props) => {
	const {
		classes,
		handleChange,
		countryOfOrigin,
		specifiedCountry,
		handleUpdateUser
	} = props;

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];

	// const [ touchedCountry, setTouchedCountry ] = useState( false );

	const intl = useIntl();

	const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);

	const countryText = (country) =>
		intl.formatMessage({
			id: country.formatMessageId,
			defaultMessage: country.defaultMessage
		});

	const [boxDisabled, setBoxDisabled] = useState(false);
	const [resetToggle, setResetToggle] = useState(0);

	const boxLabel = intl.formatMessage({
		id: 'aboutyou.country.select',
		defaultMessage: 'Choose a country'
	});

	const handleChangeHelper = (value) => {
		const event = {
			target: {
				name: 'countryOfOrigin',
				value: value.dbValue
			}
		};
		handleChange(event);
	};

	const handleCheckbox = () => {
		if (!boxDisabled) {
			setResetToggle(resetToggle + 1);
			const event = {
				target: {name: 'countryOfOrigin', value: 'preferNotToSay'}
			};
			handleChange(event);
		}
		setBoxDisabled(!boxDisabled);
	};

	return (
		<>
			<DialogTitle>
				<FormattedMessage
					id="account.signup-about-you"
					defaultMessage="About You"
					description="Title for the About You sign up dialog"
				/>
			</DialogTitle>
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage
					id="account.signup-about-you-subtitle"
					defaultMessage="Help us improve your experience by telling us more about yourself"
					description="Sub-title for the About You sign up dialog"
				/>
			</DialogSubTitle>
			<div className={classes.greyLine} />
			<form
				className={
					isMobile ? classes.formContainerMobile : classes.formContainer
				}
				onSubmit={handleUpdateUser}
				data-test-id="about-you-country-form"
			>
				<Typography className={classes.formQuestion} variant="h3">
					<FormattedMessage
						id="aboutyou.country"
						defaultMessage="My country of origin is..."
						description="Question asking the country of origin"
					/>
				</Typography>
				<Autocomplete
					key={resetToggle}
					options={aboutYouCountryOptions}
					autoHighlight
					id="countrySelect"
					name="countryOfOrigin"
					disabled={boxDisabled}
					onChange={(e, value) => handleChangeHelper(value)}
					getOptionLabel={(country) => countryText(country)}
					renderOption={(opt) => <>{`${opt.flag} ${countryText(opt)}`}</>}
					renderInput={(params) => (
						<TextField
							{...params}
							inputProps={{...params.inputProps}}
							autoComplete="country-name"
							variant="outlined"
							label={boxLabel}
						/>
					)}
				/>
				<FormControlLabel
					className={classes.labels}
					value="preferNotToSay"
					control={<Checkbox onChange={() => handleCheckbox()} />}
					labelPlacement="end"
					label={intl.formatMessage({
						id: 'aboutyou.answer-prefer-not-to-say',
						defaultMessage: 'Prefer not to say'
					})}
				/>
				<AsylumConnectButton
					disabled={
						countryOfOrigin.includes('other') &&
						!textFieldTest.test(specifiedCountry)
					}
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

export default withStyles(styles)(AboutYouCountry);
