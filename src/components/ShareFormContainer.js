import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {shareResource} from '../utils/api';
import ShareForm from './ShareForm';

class ShareFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			shareUrl: window.location.href
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit = async (event) => {
		const {
			handleMessageNew,
			handleRequestClose,
			handleRequestOpen,
			handleLogOut,
			listId, // either list id or org id
			session,
			shareType,
			user
		} = this.props;
		event.preventDefault();
		if (
			!user ||
			!this.state.email ||
			!this.state.shareUrl ||
			!listId ||
			!shareType
		) {
			handleMessageNew(<FormattedMessage id="error.invalid-request" />);
			return;
		}
		try {
			let payload = {
				email: this.state.email,
				shareType: shareType,
				shareUrl: this.state.shareUrl,
				resource: listId,
				jwt: session,
				userId: user
			};
			await shareResource(payload);
			handleMessageNew(
				`${
					shareType === 'collection' ? (
						<FormattedMessage id="favorites.share-list-success-message" />
					) : (
						<FormattedMessage id="favorites.share-resource-success-message" />
					)
				}`
			);
			handleRequestClose();
		} catch (error) {
			if (error.response && error.response.status === 401) {
				handleMessageNew(<FormattedMessage id="error.session-expired" />);
				handleLogOut();
				handleRequestClose();
			} else if (error.response && error.response.status === 403) {
				handleRequestOpen('password');
			} else {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
				handleRequestClose();
			}
		}
	};

	render() {
		return (
			<ShareForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

ShareFormContainer.propTypes = {
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	listId: PropTypes.string.isRequired,
	session: PropTypes.string.isRequired,
	shareType: PropTypes.string.isRequired
};

export default ShareFormContainer;
