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
    const {handleMessageNew, handleRequestClose, session} = this.props;
    confirmSession(this.state.password, session)
      .then(response => {
        if (response.status === 200) {
          handleMessageNew('Password Confirmed');
          handleRequestClose();
        } else if (response.status === 401) {
          handleMessageNew('The password you entered was incorrect.');
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong.');
        console.warn(error);
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
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
};

export default PasswordFormContainer;
