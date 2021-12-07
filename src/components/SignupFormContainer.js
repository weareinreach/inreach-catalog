import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import {createOrgOwner, catalogPost, updateUser} from '../utils/api';

import SignupForm from './SignupForm';
import withOrganizations from './withOrganizations';

class SignupFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
			email: '',
			name: '',
			password: '',
			selection: '',
			seekerSteps: [0, 2, 6, 7, 8, 9, 10],
			currentLocation: '',
			orgType: '',
			immigrationStatus: '',
			countryOfOrigin: '',
			ethnicityRace: [],
			sogIdentity: [],
			age: '',
			specifiedOrgType: '',
			specifiedCountry: '',
			specifiedIdentity: '',
			specifiedEthnicity: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeArray = this.handleChangeArray.bind(this);
		this.handleCreateAffiliation = this.handleCreateAffiliation.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleStepNext = this.handleStepNext.bind(this);
		this.handleStepBack = this.handleStepBack.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleSkip = this.handleSkip.bind(this);
		this.handleResetState = this.handleResetState.bind(this);
	}

	handleResetState() {
		this.setState({selection: ''});
		this.setState({specifiedOrgType: ''});
		this.setState({orgType: ''});
		this.setState({email: ''});
		this.setState({name: ''});
		this.setState({currentLocation: ''});
		this.setState({password: ''});
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleChangeArray(event, isChecked) {
		let tempArray = [];
		let tempArray2 = [];

		let index = '';

		//add to sogIdentity array
		if (event.target.name === 'sogIdentity' && isChecked) {
			if (event.target.value === 'aboutyou.answer-prefer-not-to-say') {
				tempArray.push(event.target.value);
				this.setState({sogIdentity: tempArray});
			} else {
				tempArray = this.state.sogIdentity.slice();
				tempArray.push(event.target.value);
				let uniq = [...new Set(tempArray)];
				this.setState({sogIdentity: uniq});
			}
		}
		//remove from sogIdentity array
		if (event.target.name === 'sogIdentity' && !isChecked) {
			tempArray = [...this.state.sogIdentity];

			//if 'Other' was unchecked, remove the specifiedId value from the array
			if (event.target.value === 'aboutyou.answer-other') {
				tempArray2 = tempArray.filter(function (item) {
					return item.indexOf('specifiedIdentity:') !== 0;
				});
				tempArray = tempArray2;
			}
			//remove unchecked items from array
			index = tempArray.indexOf(event.target.value);
			if (index !== -1) {
				tempArray.splice(index, 1);
				this.setState({sogIdentity: tempArray});
			}
		}

		//add to ethnicityRace array
		if (event.target.name === 'ethnicityRace' && isChecked) {
			if (event.target.value === 'aboutyou.answer-prefer-not-to-say') {
				tempArray.push(event.target.value);
				this.setState({ethnicityRace: tempArray});
			} else {
				tempArray = this.state.ethnicityRace.slice();
				tempArray.push(event.target.value);
				let uniq = [...new Set(tempArray)];
				this.setState({ethnicityRace: uniq});
			}
		}

		//remove from ethnicityRace array
		if (event.target.name === 'ethnicityRace' && !isChecked) {
			tempArray = [...this.state.ethnicityRace];

			//if 'Other' was unchecked, remove the specifiedId value from the array
			if (event.target.value === 'aboutyou.answer-other') {
				tempArray2 = tempArray.filter(function (item) {
					return item.indexOf('specifiedEthnicity:') !== 0;
				});
				tempArray = tempArray2;
			}
			//remove unchecked items from array
			index = tempArray.indexOf(event.target.value);
			if (index !== -1) {
				tempArray.splice(index, 1);
				this.setState({ethnicityRace: tempArray});
			}
		}
	}

	handleSelect(type) {
		this.setState({selection: type}, function () {
			this.handleStepNext();
		});
	}

	handleStepNext() {
		this.setState(
			(prevState) => ({activeStep: prevState.activeStep + 1}),
			function () {
				if (this.state.selection === 'seeker') {
					if (this.state.activeStep > 6) {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep - 4]},
							function () {}
						);
					} else {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep]},
							function () {}
						);
					}
				}
			}
		);
	}

	handleSkip() {
		this.setState((prevState) => ({activeStep: prevState.activeStep + 2}));
	}

	handleStepBack() {
		this.setState(
			(prevState) => ({activeStep: prevState.activeStep - 1}),
			function () {
				if (this.state.selection === 'seeker') {
					if (this.state.activeStep > 4) {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep - 4]},
							function () {}
						);
					} else {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep - 1]},
							function () {
								//reset values if the user goes back to the beginning
								if (this.state.activeStep === 0) {
									this.handleResetState();
								}
							}
						);
					}
				}
				//reset values if the user goes back to the beginning
				if (this.state.activeStep === 0) {
					this.handleResetState();
				}
			}
		);
	}

	handleCreateAffiliation(event) {
		event.preventDefault();
		const {handleMessageNew, organizationSelection, session, userData} =
			this.props;

		if (organizationSelection) {
			const {_id} = organizationSelection;

			createOrgOwner(
				{email: userData.email, orgId: _id, userId: userData._id},
				session
			)
				.then(() => {
					this.handleStepNext();
					return;
				})
				.catch(() => {
					handleMessageNew(
						<FormattedMessage id="error.joining-organization-failed" />
					);
				});
		} else {
			handleMessageNew(<FormattedMessage id="error.organization-empty" />);
		}
	}

	handleUpdateUser(event) {
		event.preventDefault();

		const {handleMessageNew, organizationSelection, session, userData} =
			this.props;

		let tempArray = [];

		let body = {
			age: this.state.age,
			countryOfOrigin:
				this.state.countryOfOrigin === 'aboutyou.answer-other'
					? this.state.specifiedCountry
					: this.state.countryOfOrigin,
			immigrationStatus: this.state.immigrationStatus,
			orgName: this.state.orgName,
			orgPositionTitle: this.state.orgPositionTitle,
			reasonForJoining: this.state.reasonForJoining
		};

		//if 'Other' is selected for a multi-select, need to push the specified value into the array then set the body
		if (this.state.sogIdentity.includes('aboutyou.answer-other')) {
			let specifiedID = 'specifiedIdentity: ' + this.state.specifiedIdentity;
			tempArray = this.state.sogIdentity.slice();
			tempArray.push(specifiedID);
			let uniq = [...new Set(tempArray)];
			this.setState({sogIdentity: uniq}, function () {
				body['sogIdentity'] = this.state.sogIdentity;
				updateUser(userData, body)
					.then((data) => {
						this.setState({userData: data.user}, function () {});
					})
					.catch((error) => console.og(error));
				//if error, send to screen
			});
		} else {
			body['sogIdentity'] = this.state.sogIdentity;
			updateUser(userData, body)
				.then((data) => {
					this.setState({userData: data.user}, function () {});
				})
				.catch((error) => console.og(error));
			//if error, send to screen
		}

		if (this.state.ethnicityRace.includes('aboutyou.answer-other')) {
			let specifiedID = 'specifiedIdentity: ' + this.state.specifiedEthnicity;
			tempArray = this.state.ethnicityRace.slice();
			tempArray.push(this.state.specifiedEthnicity);
			let uniq = [...new Set(tempArray)];
			this.setState({ethnicityRace: uniq}, function () {
				body['ethnicityRace'] = this.state.ethnicityRace;
			});
		} else {
			body['ethnicityRace'] = this.state.ethnicityRace;
		}

		updateUser(userData, body)
			.then((data) => {
				this.setState({userData: data.user}, function () {
					console.log('data from the update: ', data);
				});
				// this.props.handleMessageNew('Your email has been updated.');
			})
			.catch((error) => console.og(error));
		//if error, send to screen

		//determine next step in the workflow
		if (this.state.activeStep === 10 || this.state.activeStep === 5) {
			this.props.handleRequestOpen('thankyou');
		} else {
			this.handleStepNext();
		}
	}

	handleSignUp(event) {
		event.preventDefault();
		const {handleMessageNew, handleRequestClose, handleRequestOpen} =
			this.props;
		const {
			email,
			name,
			password,
			selection,
			currentLocation,
			orgType,
			specifiedOrgType
		} = this.state;

		const isProfessional = selection === 'lawyer' || selection === 'provider';
		const emailTest = new RegExp(/\S+@\S+\.\S+/);
		const pswdTest = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?])(?=.{10,})'
		);

		if (pswdTest.test(password) === false) {
			handleMessageNew(<FormattedMessage id="error.password-format" />);
			return;
		}

		if (emailTest.test(email) === false) {
			handleMessageNew(<FormattedMessage id="error.email-format" />);
			return;
		}

		// if orgType state is 'other', need to set it to the specified value before saving
		// don't want to change the state directly, else the "Other" radio button won't be checked
		const body = {
			catalogType: selection,
			email,
			isProfessional,
			password,
			name,
			currentLocation,
			orgType: orgType === 'Other (specify)' ? specifiedOrgType : orgType
		};

		const handleError = () =>
			handleMessageNew(<FormattedMessage id="error.unspecified" />);

		catalogPost('/users', body)
			.then((user) => {
				if (user.error) {
					if (user.status.status === 409) {
						handleMessageNew(
							<FormattedMessage id="error.user-already-exists" />
						);
						return;
					}
					handleError();
					return;
				}

				catalogPost('/auth', {email, password}).then((auth) => {
					if (auth.error) {
						handleError();
						return;
					}

					this.props.handleLogIn(auth.token);
					if (!isProfessional) {
						this.setState(
							{activeStep: this.state.seekerSteps[2]},
							function () {}
						);
					} else {
						this.handleStepNext();
					}
				});
			})
			.catch(handleError);
	}

	render() {
		return (
			<SignupForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleChangeArray={this.handleChangeArray}
				handleCreateAffiliation={this.handleCreateAffiliation}
				handleSelect={this.handleSelect}
				handleSignUp={this.handleSignUp}
				handleStepNext={this.handleStepNext}
				handleStepBack={this.handleStepBack}
				handleUpdateUser={this.handleUpdateUser}
				handleSkip={this.handleSkip}
			/>
		);
	}
}

SignupFormContainer.defaultProps = {
	session: null
};

SignupFormContainer.propTypes = {
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	session: PropTypes.string
};

export default withOrganizations(SignupFormContainer);
