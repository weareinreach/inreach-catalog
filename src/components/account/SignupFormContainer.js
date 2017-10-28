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

  handleOrganizationSearchChange(event, { newValue }) {
    this.setState({ organizationSearch: newValue });
  };

  handleOrganizationsFetchRequested() {
    this.setState({ isLoadingOrganizations: true });
    this.debouncedLoadOrganizations();
  }

  handleOrganizationsClearRequested() {
    this.setState({ organizations: [] });
  }

  handleOrganizationSelect(event, { suggestion }) {
    this.setState({ organizationSelection: suggestion });
  }

  handleSelect(selection) {
    this.setState({selection});
  };

  handleSubmit(event) {
    event.preventDefault();
    const {handleMessageNew, handleRequestClose} = this.props;
    const {email, password, organizationSearch, organizationSelection, passwordConfirmation} = this.state;
    if (password !== passwordConfirmation) {
      handleMessageNew('Sorry. The passwords you have entered do not match');
      return;
    }
    if (!organizationSelection || organizationSearch !== organizationSelection.name) {
      handleMessageNew('Please select an organization.');
      return;
    }

    const userPayload = JSON.stringify({
      user: {
        email,
        password,
      },
    });
    this.createUser(userPayload)
      .then(response => {
        if (response.status !== 201) {
          handleMessageNew(`Sorry. An account for that email might aleady exist.`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        window.localStorage.setItem('jwt', data.jwt);
        if (this.state.selection === 'provider') {
          const affiliationPayload = JSON.stringify({
            affiliation: {
              organization_name: 'organization',
              fetchable_id: 1,
            }
          });
          return this.createAffiliation(affiliationPayload);
        } else {
          handleRequestClose();
        }
      })
      .then(response => {
        debugger
        console.log(response);
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong.');
      });
  }

  createUser(payload) {
    const apiDomain = config[process.env.NODE_ENV].odas;
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

  createAffiliation(paylaod) {
    const url = `${apiDomain}api/affiliations`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: window.localStorage.get('jwt'),
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: affiliationPayload,
    };
    return fetch(url, options);
  }

  loadOrganizations() {
    const apiDomain = config[process.env.NODE_ENV].odrs;
    const url = `${apiDomain}organizations.jsonp?`;
    const apiKeyParam = `api_key=${config[process.env.NODE_ENV].odApiKey}`;
    const queryParams = `&locale=en&per_page=6&query%5Btext%5D=${this.state.organizationSearch}`;
    fetchJsonp(url + apiKeyParam + queryParams)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoadingOrganizations: false,
          organizations: data.organizations,
        })
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
        handleOrganizationsClearRequested={this.handleOrganizationsClearRequested}
        handleOrganizationsFetchRequested={this.handleOrganizationsFetchRequested}
        handleSelect={this.handleSelect}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

SignupFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default SignupFormContainer;
