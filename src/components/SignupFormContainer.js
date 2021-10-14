import React from 'react';
import PropTypes from 'prop-types';
import {createOrgOwner} from '../utils/api';
import {catalogPost} from '../utils/api';

import SignupForm from './SignupForm';
import withOrganizations from './withOrganizations';

class SignupFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
			email: '',
			name: 'user name',
			password: '',
			passwordConfirmation: '',
			selection: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCreateAffiliation = this.handleCreateAffiliation.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleStepNext = this.handleStepNext.bind(this);
		this.handleStepBack = this.handleStepBack.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSelect(selection) {
		this.setState({selection});
		this.handleStepNext();
	}

	handleStepNext() {
		this.setState((prevState) => ({activeStep: prevState.activeStep + 1}));
	}

	handleStepBack() {
		this.setState((prevState) => ({activeStep: prevState.activeStep - 1}));
	}

	handleCreateAffiliation(event) {
		event.preventDefault();
		const {handleMessageNew, organizationSelection, session, userData} =
			this.props;

		if (!organizationSelection) {
			handleMessageNew('Please select an organization.');
			return;
		}
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
					`Sorry. Something went wrong connecting you to your organization.`
				);
			});
	}

	handleSignUp(event) {
		event.preventDefault();
		const {handleMessageNew, handleRequestClose, handleRequestOpen} =
			this.props;
		const {email, name, password, passwordConfirmation, selection} = this.state;
		const isProfessional = selection === 'lawyer' || selection === 'provider';

		if (password.length < 8) {
			handleMessageNew('Password must be at least 8 characters.');
			return;
		}

		if (password !== passwordConfirmation) {
			handleMessageNew('The passwords you have entered do not match');
			return;
		}

		const body = {
			catalogType: selection,
			email,
			isProfessional,
			password,
			name
		};
		const handleError = () => handleMessageNew('Oops! Something went wrong.');

		catalogPost('/users', body)
			.then((user) => {
				if (user.error) {
					if (user.status.status === 409) {
						handleMessageNew(
							'User account already exists. Try logging in instead.'
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
						handleRequestOpen('thankyou');
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
