import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import ForgotForm from './ForgotForm';
import {catalogPost} from '../utils/api';

class ForgotFormContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		event.preventDefault();
		const {handleMessageNew} = this.props;
		catalogPost('/users/forgotPassword', {email: this.state.email})
			.then((res) => {
				if (res.status === 200) {
					handleMessageNew(
						<FormattedMessage
							id="action.password-reset-success"
							defaultMessage="Your password has been reset successfully! Please check your email."
							description="Message to check your email since your password reset was successful."
						/>
					);
				}
				//bad email - user does not exist
				else if (res.status.status === 400) {
					handleMessageNew(
						<FormattedMessage
							id="error.incorrect-email"
							defaultMessage="Oops! Please check that you entered the correct email address."
							description="Message to check the email address entered because it is invalid"
						/>
					);
				}
			})
			// something else went wrong so handle it here
			.catch((error) => {
				handleMessageNew(
					<FormattedMessage
						id="error.unspecified"
						defaultMessage="Oops! Something went wrong."
						description="Message that there was an error"
					/>
				);
			});
	}

	render() {
		return (
			<ForgotForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

ForgotFormContainer.propTypes = {
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired
};

export default ForgotFormContainer;
