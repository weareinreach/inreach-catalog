import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {catalogPost} from '../utils/api';

import PasswordForm from './PasswordForm';

class PasswordFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: ''
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
		const {
			handleConfirmSession,
			handleMessageNew,
			handleRequestClose,
			session
		} = this.props;
		catalogPost(this.state.password, session)
			.then((response) => {
				handleMessageNew(
					<FormattedMessage
						id="action.confirm-password"
						defaultMessage="Password Confirmed"
						description="message that the password has been entered correctly"
					/>
				);
				handleConfirmSession();
				handleRequestClose();
			})
			.catch((error) => {
				if (error.response.status === 401) {
					handleMessageNew(
						<FormattedMessage
							id="error.incorrect-password"
							defaultMessage="The password you entered was incorrect."
							description="message that the password was not correct"
						/>
					);
				} else {
					handleMessageNew(
						<FormattedMessage
							id="error.unspecified"
							defaultMessage="Oops! Something went wrong."
							description="genreic error message"
						/>
					);
				}
			});
	}

	render() {
		return (
			<PasswordForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

PasswordFormContainer.propTypes = {
	handleConfirmSession: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	session: PropTypes.string.isRequired
};

export default PasswordFormContainer;
