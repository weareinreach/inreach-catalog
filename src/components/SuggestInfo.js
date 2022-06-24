import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import TextField from '@material-ui/core/TextField';
import PlacesAutocomplete from 'react-places-autocomplete';
import SuggestInfoNonEngServices from './SuggestInfoNonEngServices';
import OrganizationAutocomplete from './OrganizationAutocomplete';

import {searchInput, searchInputMobile} from '../theme';

function TextMaskCustom(props) {
	return (
		<MaskedInput
			{...props}
			mask={[
				'(',
				/[1-9]/,
				/\d/,
				/\d/,
				')',
				' ',
				/\d/,
				/\d/,
				/\d/,
				'-',
				/\d/,
				/\d/,
				/\d/,
				/\d/
			]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

function getOrgEmails(organizationSelection) {
	let orgEmail = '';
	if (organizationSelection && organizationSelection.emails) {
		organizationSelection.emails.forEach(getEmail);
		function getEmail(item) {
			if (item.is_primary) {
				orgEmail = item.email;
			}
		}
	}
	return orgEmail;
}

const styles = (theme) => ({
	root: {},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		'& > div': {
			margin: '15px 0 15px 0'
		}
	},
	formType: {
		marginTop: '10%'
	},
	inputLabel: {
		'& label': theme.custom.inputLabel,
		'&>div': {
			marginTop: '20px'
		},
		'& input': theme.custom.inputText
	},
	settingsTypeFont: {
		fontSize: 13,
		fontWeight: 700,
		fontFamily: '"Inter", sans-serif',
		letterSpacing: '-.02em',
		color: theme.palette.secondary[500],
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		cursor: 'pointer'
	},
	inputAddressLabel: {
		'& label': theme.custom.inputLabel,
		'&>div': {
			marginTop: '40px'
		}
	},
	searchInput: searchInput(theme),
	[theme.breakpoints.down('xs')]: {
		searchInput: searchInputMobile(theme)
	},
	searchInputContainer: {
		position: 'relative'
	},
	placesContainer: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[2],
		border: 'none',
		width: '100%',
		'& div': theme.custom.inputText
	},
	placesContainer2: {
		padding: '20px'
	},
	container: {
		flexGrow: 1,
		position: 'relative',
		height: 200
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	textField: {
		width: '100%'
	}
});

class SuggestInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangePhone = this.handleChangePhone.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
		this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
		this.handleChangeAutoAddress = this.handleChangeAutoAddress.bind(this);
		this.handleServiceSelect = this.handleServiceSelect.bind(this);
		this.handleServiceDelete = this.handleServiceDelete.bind(this);
	}

	handleChange(event) {
		// Checks value from resource search to prevent infinite setState
		if (event !== undefined) {
			const {name, value} = event.target;
			this.props.handleChangeGeneralInfo(name, value);
		}
	}
	handleChangePhone(e) {
		const {name, value} = e.target;
		this.props.handleChangePhone(name, value);
	}
	handleChangeEmail(e) {
		const {name, value} = e.target;
		this.props.handleChangeEmail(name, value);
	}
	handleChangeAutoAddress(address) {
		this.props.handleSelectAddress(address);
	}
	handleToggleDropDown() {
		this.setState({open: !this.state.open});
	}
	handlePlaceSelect(address) {
		this.props.handleSelectAddress(address);
	}
	handleServiceSelect(service) {
		if (!this.props.nonEngServices.includes(service)) {
			this.props.handleSelectNonEngServices('add', service, 0);
		}
	}
	handleServiceDelete(service) {
		const index = this.props.nonEngServices.findIndex((s) => {
			return s === service;
		});
		if (index >= 0) {
			this.props.handleSelectNonEngServices('remove', service, index);
		}
	}
	render() {
		const {
			classes,
			name,
			website,
			description,
			address,
			emails,
			digits,
			nonEngServices,
			t,
			country,
			handleBlurOrganizations,
			handleOrganizationSearchChange,
			handleOrganizationSelect,
			handleOrganizationsFetchRequested,
			handleOrganizationsClearRequested,
			isLoadingOrganizations,
			locale,
			organizations,
			organizationSearch,
			organizationSelection,
			intl
		} = this.props;

		const searchOptions = {
			componentRestrictions: {
				country: typeof country === 'string' ? country.toLowerCase() : 'us'
			}
		};

		const placeholderAddressString = intl
			.formatMessage({
				id: 'search.search-field-placeholder',
				defaultMessage: 'Start typing city, county or state in the US…',
				description: 'Placeholder for the location search bar'
			})
			.toString();
		const placeholderEmailString = intl
			.formatMessage({
				id: 'form.resource-email-address-placeholder',
				defaultMessage: 'Resource email addresses',
				description: 'Placeholder for email address'
			})
			.toString();

		return (
			<div className={classes.root}>
				<form className={classes.form}>
					<OrganizationAutocomplete
						handleBlurOrganizations={handleBlurOrganizations}
						handleOrganizationSearchChange={handleOrganizationSearchChange}
						handleOrganizationSelect={handleOrganizationSelect}
						handleOrganizationsFetchRequested={
							handleOrganizationsFetchRequested
						}
						handleOrganizationsClearRequested={
							handleOrganizationsClearRequested
						}
						isLoadingOrganizations={isLoadingOrganizations}
						locale={locale}
						organizationSearch={organizationSearch}
						organizationSelection={organizationSelection}
						organizations={organizations}
					/>
					{organizationSelection ? (
						<p style={{lineHeight: '25px'}} data-test-id="suggest-page-body-2">
							<FormattedMessage
								id="suggestion.organization-already-exists"
								defaultMessage="Thank you for your interest in contributing to the InReach resource app! It seems we already have {existingOrgLink} on the app. You can join this organization by signing up for a provider account {orgSignup}"
								description="Thank you message for attmpt to add an already exsiting organization"
								values={{
									existingOrgLink: (
										<Link
											to={`/${locale}/resource/${organizationSelection.slug}`}
											className="hide--on-print"
										>
											{' '}
											{organizationSelection.name}{' '}
										</Link>
									),
									orgSignup: (
										<Link
											to={`/${locale}/resource/${organizationSelection.slug}`}
										>
											{' '}
											<FormattedMessage
												id="legal.privacy-here"
												defaultMessage="here."
												description="Click here prompt for legal privacy"
											/>
										</Link>
									)
								}}
							/>
						</p>
					) : null}
					{!organizationSelection ? (
						<>
							<TextField
								data-test-id="suggest-page-name"
								className={classes.inputLabel}
								label={
									intl.formatMessage({
										id: 'suggestion.name',
										defaultMessage: 'Name',
										description: 'Suggestion name placeholder'
									}) + ':'
								}
								id="name"
								name="name"
								value={
									organizationSelection ? organizationSelection.name : null
								}
								multiline={true}
								InputLabelProps={{
									shrink: true
								}}
								placeholder={intl.formatMessage({
									id: 'suggestion.name',
									defaultMessage: 'Name',
									description: 'Suggestion name placeholder'
								})}
								onChange={this.handleChange}
								type="text"
							/>
							<FormControl className={classes.inputAddressLabel}>
								<InputLabel
									children={
										intl.formatMessage({
											id: 'suggestion.address',
											defaultMessage: 'Address',
											description: 'Suggestion addresss placeholder'
										}) + ':'
									}
									shrink
									data-test-id="suggest-page-address"
								/>
								<PlacesAutocomplete
									onChange={this.handlePlaceSelect}
									onSelect={this.handlePlaceSelect}
									searchOptions={searchOptions}
									value={
										organizationSelection
											? organizationSelection.address
											: address
									}
								>
									{({
										getInputProps,
										suggestions,
										getSuggestionItemProps,
										loading
									}) => (
										<div
											className={classes.searchInputContainer}
											data-test-id="suggest-page-address-input"
										>
											<input
												{...getInputProps({
													type: 'text',
													className:
														classes.placesContainer +
														' ' +
														classes.placesContainer2,
													placeholder: t(placeholderAddressString),
													name: 'search--near',
													id: 'search--near'
												})}
											/>
											<div className={classes.placesContainer}>
												{loading && (
													<div>
														<FormattedMessage
															id="form.resource-email-address-placeholder"
															defaultMessage="Resource email addresses"
															description="placeholder for resource email address"
														/>
													</div>
												)}
												{suggestions.map((suggestion, index) => {
													return (
														<ListItem
															data-test-id={`suggested-address-item-${index}`}
															button
															key={suggestion.id}
															divider={true}
															dense={true}
															{...getSuggestionItemProps(suggestion)}
														>
															<ListItemIcon>
																<PlaceIcon />
															</ListItemIcon>
															<ListItemText
																primary={
																	suggestion?.formattedSuggestion?.mainText
																}
																secondary={
																	suggestion?.formattedSuggestion?.secondaryText
																}
															/>
														</ListItem>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</FormControl>
							<TextField
								data-test-id="suggest-page-about"
								className={classes.inputLabel}
								label={
									intl.formatMessage({
										id: 'resource.about-header',
										defaultMessage: 'About',
										description: 'About header for resource'
									}) + ':'
								}
								name="description"
								value={
									organizationSelection
										? organizationSelection.description
										: null
								}
								multiline={true}
								InputLabelProps={{
									shrink: true
								}}
								placeholder={intl.formatMessage({
									id: 'form.resource-description-placeholder',
									defaultMessage: 'Short description of resource',
									description: 'Prompt for a short description of the resource'
								})}
								onChange={this.handleChange}
								type="email"
							/>
							<FormControl className={classes.inputAddressLabel}>
								<InputLabel
									children={
										intl.formatMessage({
											id: 'resource.language-services',
											defaultMessage: 'Language Services',
											description: 'Resource language services message'
										}) + ':'
									}
									shrink
								/>
								<SuggestInfoNonEngServices
									services={nonEngServices}
									handleClick={this.handleServiceSelect}
									handleDelete={this.handleServiceDelete}
								/>
							</FormControl>
							<TextField
								data-test-id="suggest-page-website"
								className={classes.inputLabel}
								label={
									intl.formatMessage({
										id: 'resource.website-label',
										defaultMessage: 'Website',
										description: 'label for website of resource'
									}) + ':'
								}
								id="website"
								name="website"
								value={
									organizationSelection ? organizationSelection.website : null
								}
								InputLabelProps={{
									shrink: true
								}}
								placeholder={intl.formatMessage({
									id: 'form.website-placeholder',
									defaultMessage: 'URL',
									description: 'Website URL placeholder'
								})}
								onChange={this.handleChange}
							/>
							<FormControl className={classes.inputLabel}>
								<InputLabel
									children={
										intl.formatMessage({
											id: 'resource.phone-numbers',
											defaultMessage: 'Phone number(s)',
											description: 'prompt fot resource phone number'
										}) + ':'
									}
									shrink
								/>
								<Input
									data-test-id="suggest-page-phone-number"
									name="digits"
									value={digits}
									inputComponent={TextMaskCustom}
									onChange={this.handleChangePhone}
								/>
							</FormControl>
							<TextField
								data-test-id="suggest-page-email"
								className={classes.inputLabel}
								label={
									intl.formatMessage({
										id: 'resource.email-label',
										defaultMessage: 'Email',
										description: 'Resource email label'
									}) + ':'
								}
								name="email"
								type="text"
								// value={organizationSelection ? organizationSelection.emails.join(', ') : null}
								value={
									organizationSelection
										? getOrgEmails(organizationSelection)
										: null
								}
								InputLabelProps={{
									shrink: true
								}}
								placeholder={placeholderEmailString}
								onChange={this.handleChangeEmail}
							/>
						</>
					) : null}
				</form>
			</div>
		);
	}
}

SuggestInfo.propTypes = {
	classes: PropTypes.object.isRequired,
	info: PropTypes.object,
	handleCollectInfoData: PropTypes.func
};

export default withStyles(styles)(injectIntl(SuggestInfo));
