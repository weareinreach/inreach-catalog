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
			email: 'a@a.ca',
			name: 'xx',
			password: 'xxxxxxxX1@',
			passwordConfirmation: '',
			selection: '',
			seekerSteps: [0, 2, 7, 8, 9, 10, 11],
			currentLocation: 'xx',
			orgType: 'Legal nonprofit',
			immigrationStatus: '',
			countryOfOrigin: '',
			ethnicityRace: '',
			sogIdentity: '',
			age: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCreateAffiliation = this.handleCreateAffiliation.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleStepNext = this.handleStepNext.bind(this);
		this.handleStepBack = this.handleStepBack.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
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
					if (this.state.activeStep > 5) {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep - 5]},
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

	handleStepBack() {
		this.setState(
			(prevState) => ({activeStep: prevState.activeStep - 1}),
			function () {
				if (this.state.selection === 'seeker') {
					if (this.state.activeStep > 5) {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep - 5]},
							function () {}
						);
					} else {
						this.setState(
							{activeStep: this.state.seekerSteps[this.state.activeStep - 1]},
							function () {}
						);
					}
				}
				if (this.state.activeStep === 0) {
					this.setState({selection: ''});
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
		console.log(this.activeStep);
		this.handleStepNext();
		// 		updateEmail(newEmail) {
		// 	updateUser(this.state.userData, {email: newEmail})
		// 		.then((data) => {
		// 			this.setState({userData: data.user, isEmailUpdated: true});
		// 			this.props.handleMessageNew('Your email has been updated.');
		// 		})
		// 		.catch((error) => this.handleOdasError(error));
		// }
	}

	handleSignUp(event) {
		event.preventDefault();
		const {handleMessageNew, handleRequestClose, handleRequestOpen} =
			this.props;
		const {
			email,
			name,
			password,
			passwordConfirmation,
			selection,
			currentLocation,
			orgType
		} = this.state;
		const isProfessional = selection === 'lawyer' || selection === 'provider';
		const emailTest = new RegExp(/\S+@\S+\.\S+/);
		const pswdTest = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'
		);

		if (pswdTest.test(password) === false) {
			handleMessageNew(<FormattedMessage id="error.password-format" />);
			return;
		}

		if (emailTest.test(email) === false) {
			handleMessageNew(<FormattedMessage id="error.email-format" />);
			return;
		}

		const body = {
			catalogType: selection,
			email,
			isProfessional,
			password,
			name,
			currentLocation,
			orgType
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
						// handleRequestClose();
						// handleRequestOpen('thankyou');
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
				handleCreateAffiliation={this.handleCreateAffiliation}
				handleSelect={this.handleSelect}
				handleSignUp={this.handleSignUp}
				handleStepNext={this.handleStepNext}
				handleStepBack={this.handleStepBack}
				handleUpdateUser={this.handleUpdateUser}
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
