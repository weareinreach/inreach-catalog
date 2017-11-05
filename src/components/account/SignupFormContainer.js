import React from 'react';
import PropTypes from 'prop-types';
import fetchJsonp from 'fetch-jsonp';
import fetch from 'node-fetch';
import debounce from 'lodash/debounce';

import config from '../../config/config.js';

import SignupForm from './SignupForm';

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isLoadingOrganizations: false,
      organizations: [],
      organizationSearch: '',
      organizationSelection: null,
      password: '',
      passwordConfirmation: '',
      selection: '',
    };

    this.debouncedLoadOrganizations = debounce(this.loadOrganizations, 1000);
    this.handleChange = this.handleChange.bind(this);
    this.handleOrganizationSearchChange = this.handleOrganizationSearchChange.bind(this);
    this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this);
    this.handleOrganizationsFetchRequested = this.handleOrganizationsFetchRequested.bind(this);
    this.handleOrganizationsClearRequested = this.handleOrganizationsClearRequested.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleOrganizationSearchChange(event, {newValue}) {
    this.setState({organizationSearch: newValue});
  }

  handleOrganizationsFetchRequested() {
    this.setState({isLoadingOrganizations: true});
    this.debouncedLoadOrganizations();
  }

  handleOrganizationsClearRequested() {
    this.setState({organizations: []});
  }

  handleOrganizationSelect(event, {suggestion}) {
    this.setState({organizationSelection: suggestion});
  }

  handleSelect(selection) {
    this.setState({selection});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {handleMessageNew, handleRequestClose} = this.props;
    const {
      email,
      password,
      organizationSearch,
      organizationSelection,
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
    if (
      selection === 'provider' &&
      (!organizationSelection ||
        organizationSearch !== organizationSelection.name)
    ) {
      handleMessageNew('Please select an organization.');
      return;
    }

    const userPayload = JSON.stringify({
      user: {
        email,
        password,
      },
    });
    const affiliationPayload = this.state.organizationSelection
      ? JSON.stringify({
          affiliation: {
            organization_name: this.state.organizationSelection.name,
            fetchable_id: this.state.organizationSelection.id,
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
        if (selection === 'provider') {
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
        Authorization: 'Basic ZGVtbzoxNm1pc3Npb24=',
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
    return fetch(url, options);
  }

  loadOrganizations() {
    const apiDomain = config[process.env.OD_API_ENV].odrs;
    const url = `${apiDomain}organizations.jsonp?`;
    const apiKeyParam = `api_key=${config[process.env.OD_API_ENV].odApiKey}`;
    const queryParams = `&locale=en&per_page=6&query%5Btext%5D=${this.state
      .organizationSearch}`;
    fetchJsonp(url + apiKeyParam + queryParams)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoadingOrganizations: false,
          organizations: data.organizations,
        });
      });
  }

  render() {
    return (
      <SignupForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleOrganizationSearchChange={this.handleOrganizationSearchChange}
        handleOrganizationSelect={this.handleOrganizationSelect}
        handleOrganizationsClearRequested={
          this.handleOrganizationsClearRequested
        }
        handleOrganizationsFetchRequested={
          this.handleOrganizationsFetchRequested
        }
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

export default SignupFormContainer;
