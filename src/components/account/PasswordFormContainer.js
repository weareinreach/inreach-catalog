import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import config from '../../config/config.js';
import {confirmSession} from '../../helpers/odasRequests';

import PasswordForm from './PasswordForm';

class PasswordFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
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
      session,
    } = this.props;
    confirmSession(this.state.password, session)
      .then(response => {
        handleMessageNew('Password Confirmed');
        handleConfirmSession();
        handleRequestClose();
      })
      .catch(error => {
        if (response.error.status === 401) {
          handleMessageNew('The password you entered was incorrect.');
        } else {
          handleMessageNew('Oops! Something went wrong.');
        }
      })
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
  session: PropTypes.string.isRequired,
};

export default PasswordFormContainer;
