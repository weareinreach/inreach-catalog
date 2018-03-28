import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import config from '../../config/config.js';

import SignupForm from './SignupForm';
import withOrganizations from './withOrganizations';

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      selection: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSelect(selection) {
    this.setState({selection});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      handleMessageNew,
      handleRequestClose,
      organizationSelection,
    } = this.props;
    const {
      email,
      password,
      passwordConfirmation,
      selection,
    } = this.state;

    if (password.length < 8) {
      handleMessageNew('Password must be at least 8 characters.');
      return;
    }
    if (password !== passwordConfirmation) {
      handleMessageNew('The passwords you have entered do not match');
      return;
    }
    //Temporarily make the organization field not required
    if (false && selection === 'provider' && !organizationSelection) {
      handleMessageNew('Please select an organization.');
      return;
    }

    const userPayload = JSON.stringify({
      user: {
        email,
        password,
        is_professional: selection === 'provider'
      },
    });

    const affiliationPayload = organizationSelection
      ? JSON.stringify({
          affiliation: {
            organization_name: organizationSelection.name,
            fetchable_id: organizationSelection.id,
          },
        })
      : null;

    this.createUser(userPayload)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          return Promise.reject('USER_POST_FAILURE');
        }
      })
      .then(data => {
        this.props.handleLogIn(data.jwt);
        if (selection === 'provider' && affiliationPayload) {
          return this.createAffiliation(affiliationPayload);
        } else {
          return Promise.reject('USER_POST_SUCCESS');
        }
      })
      .then(response => {
        if (response.status !== 201) {
          return Promise.reject('AFFILIATION_PUT_FAILURE');
        } else {
          handleRequestClose();
        }
      })
      .catch(error => {
        switch (error) {
          case 'USER_POST_SUCCESS':
            handleRequestClose();
            break;
          case 'USER_POST_FAILURE':
            handleMessageNew(
              'Sorry. We could not create an account with that email.',
            );
            break;
          case 'AFFILIATION_PUT_FAILURE':
            handleMessageNew(
              `Sorry. Something went wrong connecting you to your organization.`,
            );
            handleRequestClose();
            break;
          default:
            handleMessageNew('Oops! Something went wrong.');
        }
      });
  }

  createUser(payload) {
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/users`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    return fetch(url, options);
  }

  createAffiliation(payload) {
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/affiliations`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: window.localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    if (typeof config[process.env.OD_API_ENV].basicAuth !== 'undefined') {
      options.headers['Demo-Authorization'] = options.headers['Authorization'];
      options.headers['Authorization'] =
        config[process.env.OD_API_ENV].basicAuth;
    }
    return fetch(url, options);
  }

  render() {
    return (
      <SignupForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

SignupFormContainer.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default withOrganizations(SignupFormContainer);
