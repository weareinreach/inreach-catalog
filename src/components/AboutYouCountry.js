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

	const [touchedCountry, setTouchedCountry] = useState(false);

	const intl = useIntl();

	const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);

	const handleTouchCountry = () => {
		setTouchedCountry(true);
	};

	return (
		<>
			<DialogTitle>
				<FormattedMessage id="account.signup-about-you" />
			</DialogTitle>
			<DialogSubTitle className={classes.sideMargin}>
				<FormattedMessage id="account.signup-about-you-subtitle" />
			</DialogSubTitle>
			<div className={classes.greyLine} />
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
								touchedCountry && textFieldTest.test(specifiedCountry) === false
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
		</>
	);
};

export default withStyles(styles)(AboutYouCountry);
