import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import {geocodeByAddress} from 'react-places-autocomplete';
import {Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SuggestInfo from './SuggestInfo';
import SuggestHour from './SuggestHour';
import SuggestAdditional from './SuggestAdditional';
import AsylumConnectButton from './AsylumConnectButton';
import {catalogPost} from '../utils/api';
import withOrganizations from './withOrganizations';

import {features, requirements} from '../data/suggestionFormData';

const styles = (theme) => ({
	root: {
		padding: '0 10% 10% 10%'
	},
	formType: {
		margin: '5% 0 5% 0'
	},
	extraMargin: {
		margin: '20px 0 20px 0'
	},
	settingsTypeFont: {
		marginRight: '20px',
		lineHeight: '1.6',
		fontSize: 13,
		fontWeight: 700,
		fontFamily: '"Open Sans", sans-serif',
		color: theme.palette.common.lightBlack,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		cursor: 'pointer'
	}
});

const defaultSchedule = {
	monday_start: '',
	monday_end: '',
	tuesday_start: '',
	tuesday_end: '',
	wednesday_start: '',
	wednesday_end: '',
	thursday_start: '',
	thursday_end: '',
	friday_start: '',
	friday_end: '',
	saturday_start: '',
	saturday_end: '',
	sunday_start: '',
	sunday_end: '',
	notes: ''
};

const defaultResource = {
	name: '',
	website: '',
	region: '',
	description: '',
	tags: [],
	emails: [
		{
			title: '',
			first_name: '',
			last_name: '',
			email: ''
		}
	],
	properties: {
		'source-name': 'asylumconnect',
		'community-asylum-seeker': 'true',
		'community-lgbt': 'true'
	},
	locations: [
		{
			name: '',
			address: '',
			unit: '',
			city: '',
			state: '',
			zip_code: '',
			is_primary: true,
			phones: [
				{
					digits: '',
					phone_type: 'Office',
					is_primary: true
				}
			],
			schedule: {
				monday_start: '',
				monday_end: '',
				tuesday_start: '',
				tuesday_end: '',
				wednesday_start: '',
				wednesday_end: '',
				thursday_start: '',
				thursday_end: '',
				friday_start: '',
				friday_end: '',
				saturday_start: '',
				saturday_end: '',
				sunday_start: '',
				sunday_end: '',
				notes: ''
			}
		}
	],
	phones: [
		{
			digits: '',
			phone_type: 'Office',
			is_primary: true
		}
	]
};

class Suggestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			affiliation: null,
			isSent: false,
			selectedDays: {
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false,
				sunday: false
			},
			resourceData: defaultResource,
			nonEngServices: [],
			address: '',
			features: features,
			requirements: requirements,
			tags: [],
			emails: [],
			location: {}
		};
		this.handleChangeGeneralInfo = this.handleChangeGeneralInfo.bind(this);
		this.handleChangePhone = this.handleChangePhone.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleSelectAddress = this.handleSelectAddress.bind(this);
		this.handleSelectNonEngServices =
			this.handleSelectNonEngServices.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDaySelect = this.handleDaySelect.bind(this);
		this.handleChangeSchedule = this.handleChangeSchedule.bind(this);
		this.handleRequirementSelect = this.handleRequirementSelect.bind(this);
		this.handleFeatureSelect = this.handleFeatureSelect.bind(this);
		this.handleTagSelect = this.handleTagSelect.bind(this);
		this.organizeData = this.organizeData.bind(this);
		this.submitResource = this.submitResource.bind(this);
	}

	handleChangeGeneralInfo(name, value) {
		const {resourceData} = this.state;
		let updatedResourceData;
		updatedResourceData = update(resourceData, {$merge: {[name]: value}});
		this.setState({resourceData: updatedResourceData});
	}
	handleChangePhone(name, value) {
		const {resourceData} = this.state;
		let updatedResourceData1, updatedResourceData2;
		updatedResourceData1 = update(resourceData, {
			phones: {0: {$merge: {[name]: value}}}
		});
		updatedResourceData2 = update(updatedResourceData1, {
			locations: {0: {phones: {0: {$merge: {[name]: value}}}}}
		});
		this.setState({resourceData: updatedResourceData2});
	}
	handleChangeEmail(name, value) {
		// Update current list of email
		let emailList = value.split(',');
		if (emailList.length > 1) {
			for (let i = 0; i < emailList.length; i++) {
				emailList[i] = emailList[i].trim();
			}
		} else {
			emailList[0] = value;
		}
		this.setState({emails: emailList});
	}
	handleSelectAddress(address) {
		let updatedLocation = {};
		this.setState({address});

		geocodeByAddress(address)
			.then((results) => {
				if (results.length && results[0].address_components) {
					results[0].address_components.forEach((piece) => {
						if (
							piece.types &&
							piece.types.indexOf('administrative_area_level_1') >= 0
						) {
							updatedLocation.state = piece.long_name;
						} else if (
							piece.types &&
							piece.types.indexOf('administrative_area_level_2') >= 0
						) {
							updatedLocation.area = piece.long_name;
						} else if (piece.types && piece.types.indexOf('postal_code') >= 0) {
							updatedLocation.zip_code = piece.long_name;
						} else if (piece.types && piece.types.indexOf('locality') >= 0) {
							updatedLocation.city = piece.long_name;
						} else if (piece.types && piece.types.indexOf('route') >= 0) {
							updatedLocation.route = piece.long_name;
						} else if (
							piece.types &&
							piece.types.indexOf('street_number') >= 0
						) {
							updatedLocation.street_number = piece.long_name;
						}
					});
				}
			})
			.catch((error) => {
				this.props.handleMessageNew(
					<FormattedMessage id="error.no-location-entered" />
				);
			});
		this.setState({location: updatedLocation});
	}
	handleSelectNonEngServices(action, nonEngService, index) {
		const {resourceData, nonEngServices} = this.state;
		let updatedNonEngServices,
			requestService,
			updatedProperties,
			updatedResourceData;

		if (action === 'add') {
			// Add selected service to nonEngServices state
			updatedNonEngServices = update(nonEngServices, {$push: [nonEngService]});
			// Add selected service to request resource Data
			requestService = {['lang-' + nonEngService.split(' ').join('-')]: 'true'};
			updatedResourceData = update(resourceData, {
				properties: {$merge: requestService}
			});
		} else {
			// Remove selected service from nonEngServices
			updatedNonEngServices = update(nonEngServices, {$splice: [[index, 1]]});
			// Remove select service from request resourceData
			requestService = 'lang-' + nonEngService.split(' ').join('-');
			// Find index of the select service in resourceData.properties array
			updatedProperties = resourceData.properties;
			delete updatedProperties[requestService];

			updatedResourceData = update(resourceData, {
				properties: {$set: updatedProperties}
			});
		}
		this.setState({
			nonEngServices: updatedNonEngServices,
			resourceData: updatedResourceData
		});
	}
	handleDaySelect(select, value, startValue, endValue) {
		const {selectedDays} = this.state;
		let updatedSelectedDays;
		if (select === 'select') {
			updatedSelectedDays = update(selectedDays, {
				$merge: {[value]: !selectedDays[value]}
			});
		} else {
			updatedSelectedDays = update(selectedDays, {
				$merge: {[value.split('_')[0]]: true}
			});
		}
		this.setState({selectedDays: updatedSelectedDays});
	}
	handleChangeSchedule(name, value) {
		const {resourceData} = this.state;
		let updatedResourceData = update(resourceData, {
			locations: {0: {schedule: {$merge: {[name]: value}}}}
		});
		this.setState({resourceData: updatedResourceData});
	}
	handleFeatureSelect(event, checked) {
		const {value} = event.target;
		const {features, resourceData} = this.state;

		// update current status of a feature
		let index = features.findIndex((f) => f.name === value);
		let updatedFeatures = update(features, {
			[index]: {$merge: {value: checked}}
		});
		this.setState({features: updatedFeatures});

		// add/remove feature to/from resourceData
		let updatedResourceData;
		if (checked) {
			let updatedFeature = {[value]: checked.toString()};
			updatedResourceData = update(resourceData, {
				properties: {$merge: updatedFeature}
			});
		} else {
			let indexResource = resourceData.properties.findIndex(
				(p) => Object.keys(p)[0] === value
			);
			if (indexResource >= 0) {
				updatedResourceData = update(resourceData, {
					properties: {$splice: [[1, indexResource]]}
				});
			}
		}
		this.setState({resourceData: updatedResourceData});
	}
	handleRequirementSelect(event, checked) {
		const {value} = event.target;
		const {requirements, resourceData} = this.state;

		// update current status of a requirement
		const index = requirements.findIndex((f) => f.name === value);
		let updatedRequirements = update(requirements, {
			[index]: {$merge: {value: checked}}
		});
		this.setState({requirements: updatedRequirements});

		// add/remove feature to/from resourceData
		let updatedResourceData;
		if (checked) {
			let updatedRequirement = {[value]: checked.toString()};
			updatedResourceData = update(resourceData, {
				properties: {$merge: updatedRequirement}
			});
		} else {
			let indexResource = resourceData.properties.findIndex(
				(p) => Object.keys(p)[0] === value
			);
			if (indexResource >= 0) {
				updatedResourceData = update(resourceData, {
					properties: {$splice: [[1, indexResource]]}
				});
			}
		}
		this.setState({resourceData: updatedResourceData});
	}
	handleTagSelect(event, checked) {
		var index;
		const target = event.target;
		const {resourceData} = this.state;
		var selectedResourceTypes = this.state.tags.slice();

		if (checked && selectedResourceTypes.indexOf(target.value) < 0) {
			selectedResourceTypes.push(target.value);
			this.setState({
				tags: selectedResourceTypes
			});
		} else if (
			!checked &&
			(index = selectedResourceTypes.indexOf(target.value)) >= 0
		) {
			selectedResourceTypes.splice(index, 1);
			this.setState({
				tags: selectedResourceTypes
			});
		}

		let updatedResourceData = update(resourceData, {
			tags: {$set: selectedResourceTypes}
		});
		this.setState({resourceData: updatedResourceData});
	}
	handleClick() {
		// Require authentication for submission
		const {handleMessageNew, handleRequestOpen, session} = this.props;
		if (!session) {
			handleRequestOpen('login');
			handleMessageNew(<FormattedMessage id="account.user-sign-in-prompt" />);
		} else {
			// Organize resourceData ready for submiting request (154)
			this.organizeData();
		}
	}

	organizeData() {
		const {resourceData, selectedDays, location} = this.state;
		let updatedResourceData1,
			updatedEmailList,
			updatedResourceData2,
			updatedResourceData3,
			updatedResourceData4;
		// Update/reformat resourceData
		// 1: Remove unselected time in schedule object
		let {schedule} = resourceData.locations[0];
		for (let timeKey in schedule) {
			let day = timeKey.split('_')[0];
			if (!selectedDays[day]) {
				schedule = update(schedule, {$merge: {[timeKey]: ''}});
			}
		}
		updatedResourceData1 = update(resourceData, {
			locations: {0: {schedule: {$merge: schedule}}}
		});

		// 2: Update current email list
		updatedEmailList = this.state.emails.map((e) => {
			return {title: '', first_name: '', last_name: '', email: e};
		});
		updatedResourceData2 = update(updatedResourceData1, {
			emails: {$set: updatedEmailList}
		});

		// 3: Update locations object
		updatedResourceData3 = update(updatedResourceData2, {
			locations: {
				0: {
					address: {
						$set: location ? location.street_number + ' ' + location.route : ''
					},
					city: {$set: location ? location.city : ''},
					state: {$set: location ? location.state : ''},
					zip_code: {$set: location ? location.zip_code : ''}
				}
			}
		});

		// 4: Update region
		updatedResourceData4 = update(updatedResourceData3, {
			region: {$set: location.area + ', ' + location.state}
		});

		this.setState({resourceData: updatedResourceData4});

		const {
			name,
			website,
			description,
			emails,
			properties,
			locations,
			phones,
			schedules
		} = updatedResourceData4;

		const finalResource = {
			description,
			emails,
			name,
			is_published: false,
			locations,
			phones,
			properties,
			schedules,
			slug: name.split(' ').join('-'),
			website
		};

		this.submitResource(finalResource);
	}

	submitResource(data) {
		catalogPost('/organizations', data)
			.then(() => {
				this.setState({isSent: true});
				this.props.handleMessageNew(
					<FormattedMessage id="action.suggestion-received" />
				);
			})
			.catch(() => {
				this.props.handleMessageNew(
					<FormattedMessage id="error.unspecified" />
				);
			});
	}

	render() {
		const {classes} = this.props;
		const {
			selectedDays,
			isSent,
			resourceData,
			nonEngServices,
			address,
			features,
			requirements,
			tags,
			emails
		} = this.state;

		const locale = this?.props?.match?.params?.locale;
		const {name, website, description, phones} = resourceData;

		const textFieldTest = new RegExp(/\s*(?:[\S]\s*){2}$/);

		return (
			<div className={classes.root}>
				<div>
					<Typography
						variant="h4"
						className={classes.formType}
						data-test-id="suggest-page-title"
					>
						<FormattedMessage id="suggestion.suggest-resource" />
					</Typography>
					<Typography type="body1" data-test-id="suggest-page-body">
						<FormattedMessage id="suggestion.thank-you-for-contributing" />{' '}
					</Typography>
					<Typography type="body1" data-test-id="suggest-page-body">
						{locale === 'en_US' && (
							<FormattedMessage
								id="suggestion.country-disclaimer-united-states"
								values={{
									b: (chunks) => (
										<strong style={{color: 'black'}}>{chunks}</strong>
									),
									otherLocale1Link: (
										<Link
											to={`/en_CA/suggestions/new`}
											className="hide--on-print"
										>
											<FormattedMessage
												id="suggeston.click-here"
												values={{
													other: <FormattedMessage id="app.country-canada" />
												}}
											/>
										</Link>
									),
									otherLocale2Link: (
										<Link
											to={`/en_MX/suggestions/new`}
											className="hide--on-print"
										>
											<FormattedMessage
												id="suggeston.click-here"
												values={{
													other: <FormattedMessage id="app.country-mexico" />
												}}
											/>
										</Link>
									)
								}}
							/>
						)}
						{locale === 'en_CA' && (
							<FormattedMessage
								id="suggestion.country-disclaimer-canada"
								values={{
									b: (chunks) => (
										<strong style={{color: 'black'}}>{chunks}</strong>
									),
									otherLocale1Link: (
										<Link
											to={`/en_US/suggestions/new`}
											className="hide--on-print"
										>
											<FormattedMessage
												id="suggeston.click-here"
												values={{
													other: (
														<FormattedMessage id="app.country-united-states" />
													)
												}}
											/>
										</Link>
									),
									otherLocale2Link: (
										<Link
											to={`/en_MX/suggestions/new`}
											className="hide--on-print"
										>
											<FormattedMessage
												id="suggeston.click-here"
												values={{
													other: <FormattedMessage id="app.country-mexico" />
												}}
											/>
										</Link>
									)
								}}
							/>
						)}
						{locale === 'en_MX' && (
							<FormattedMessage
								id="suggestion.country-disclaimer-mexico"
								values={{
									b: (chunks) => (
										<strong style={{color: 'black'}}>{chunks}</strong>
									),
									otherLocale1Link: (
										<Link
											to={`/en_US/suggestions/new`}
											className="hide--on-print"
										>
											<FormattedMessage
												id="suggeston.click-here"
												values={{
													other: (
														<FormattedMessage id="app.country-united-states" />
													)
												}}
											/>
										</Link>
									),
									otherLocale2Link: (
										<Link
											to={`/en_CA/suggestions/new`}
											className="hide--on-print"
										>
											<FormattedMessage
												id="suggeston.click-here"
												values={{
													other: <FormattedMessage id="app.country-canada" />
												}}
											/>
										</Link>
									)
								}}
							/>
						)}
						.
					</Typography>

					<SuggestInfo
						address={address}
						country={this.props.country}
						emails={emails}
						digits={phones[0].digits}
						description={description}
						locale={this.props.locale}
						name={name}
						nonEngServices={nonEngServices}
						t={this.props.t}
						website={website}
						handleChangeGeneralInfo={this.handleChangeGeneralInfo}
						handleChangePhone={this.handleChangePhone}
						handleChangeEmail={this.handleChangeEmail}
						handleSelectAddress={this.handleSelectAddress}
						handleSelectNonEngServices={this.handleSelectNonEngServices}
						{...this.props}
					/>
					{!this.props.organizationSelection ? (
						<>
							<SuggestHour
								schedule={defaultSchedule}
								selectedDays={selectedDays}
								handleChange={this.handleChangeSchedule}
								handleDaySelect={this.handleDaySelect}
							/>

							<SuggestAdditional
								handleRequirementSelect={this.handleRequirementSelect}
								selectedRequirements={requirements}
								handleFeatureSelect={this.handleFeatureSelect}
								selectedFeatures={features}
								handleTagSelect={this.handleTagSelect}
								selectedTags={tags}
								locale={this.props.locale}
								t={this.props.t}
							/>

							{!isSent ? (
								<div>
									<AsylumConnectButton
										variant="secondary"
										testIdName="suggest-page-suggest-button"
										onClick={this.handleClick}
										disabled={this.props.organizationSelection}
									>
										<FormattedMessage id="suggestion.suggest-resource-new" />
									</AsylumConnectButton>
									<Typography
										type="body1"
										className={classes.extraMargin}
										data-test-id="suggest-page-footer"
									>
										<FormattedMessage id="resource.changes-subject-to-review" />
									</Typography>
								</div>
							) : (
								<div className={classes.settingsTypeFont}>
									<span>
										<FormattedMessage id="resource.change-request-received" />{' '}
										<a
											href="mailto:catalog@asylumconnect.org"
											className={classes.boldFont}
										>
											catalog@asylumconnect.org
										</a>
										.
									</span>
								</div>
							)}
						</>
					) : null}
				</div>
			</div>
		);
	}
}

Suggestion.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withOrganizations(Suggestion));
