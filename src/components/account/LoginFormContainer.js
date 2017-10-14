import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config/config.js';
import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const apiDomain = config[process.env.NODE_ENV];
    const payload = {
      'login_key': this.state.name,
      password: this.state.password,
    };
  }

  render() {
    return (
      <LoginForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
};

export default LoginFormContainer;
