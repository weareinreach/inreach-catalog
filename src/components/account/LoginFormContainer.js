import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import config from '../../config/config.js';

import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
    const {handleMessageNew, handleRequestClose} = this.props;
    const {email, password} = this.state;
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/session`;
    const payload = JSON.stringify({
      session: {
        login_key: email,
        password,
      },
    });
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Basic ZGVtbzoxNm1pc3Npb24=',
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 201) {
          response.json().then(({jwt}) => {
            window.localStorage.setItem('jwt', jwt);
            handleRequestClose();
          });
        } else {
          handleMessageNew('The email or password you entered was incorrect.');
        }
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong.');
      });
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
}

LoginFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default LoginFormContainer;
