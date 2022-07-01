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
						<FormattedMessage id="action.password-reset-success" />
					);
				}
				//bad email - user does not exist
				else if (res.status.status === 400) {
					handleMessageNew(<FormattedMessage id="error.incorrect-email" />);
				}
			})
			// something else went wrong so handle it here
			.catch((error) => {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
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
