import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {createList} from '../utils/api';

import ListNewForm from './ListNewForm';

class ListNewFormContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: ''
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
			session,
			user,
			handleListNew,
			handleMessageNew,
			handleRequestOpen,
			handleRequestClose,
			handleLogOut
		} = this.props;
		const {name} = this.state;
		const payload = {
			userId: user,
			name: name
		};
		createList(payload, session)
			.then((data) => {
				if (data.error) {
					handleMessageNew(<FormattedMessage id="error.unspecified" />);
					handleRequestClose();
					return;
				}
				handleListNew(data.list, session);
				handleRequestClose();
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					handleMessageNew(<FormattedMessage id="app.inactivity-sign-in" />);
					handleLogOut();
					handleRequestClose();
				} else if (error.response && error.response.status === 403) {
					handleRequestOpen('password');
				} else {
					handleMessageNew(<FormattedMessage id="error.unspecified" />);
					handleRequestClose();
				}
			});
	}

	render() {
		return (
			<ListNewForm
				{...this.props}
				{...this.state}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

ListNewFormContainer.defaultProps = {
	session: null,
	user: null
};

ListNewFormContainer.propTypes = {
	handleLogOut: PropTypes.func.isRequired,
	handleListNew: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	session: PropTypes.string,
	user: PropTypes.string
};

export default withRouter(ListNewFormContainer);
