import React, {Component} from 'react';
import debounce from 'lodash/debounce';

const withOrganizations = (WrappedComponent) =>
  class withOrganzations extends Component {
    constructor(props) {
      super(props);
      this.state = {
        organizations: [],
        isLoadingOrganizations: false,
        organizationSearch: '',
        organizationSelection: null,
      };

      this.debouncedLoadOrganizations = debounce(this.loadOrganizations, 1000);
      this.handleBlurOrganizations = this.handleBlurOrganizations.bind(this);
      this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this);
      this.handleOrganizationSearchChange = this.handleOrganizationSearchChange.bind(
        this
      );
      this.handleOrganizationsFetchRequested = this.handleOrganizationsFetchRequested.bind(
        this
      );
      this.handleOrganizationsClearRequested = this.handleOrganizationsClearRequested.bind(
        this
      );
    }

    handleBlurOrganizations(event) {
      this.setState((prevState) =>
        Object.assign(
          {},
          {organizations: []},
          {
            organizationSearch: prevState.organizationSelection
              ? prevState.organizationSelection.name
              : '',
          }
        )
      );
    }

    handleOrganizationSelect(event, {suggestion}) {
      this.setState({
        organizations: [],
        organizationSearch: '',
        organizationSelection: suggestion,
      });
    }

    handleOrganizationSearchChange(event, {newValue}) {
      this.setState({
        organizationSearch: newValue,
        organizationSelection: null,
      });
    }

    handleOrganizationsFetchRequested() {
      this.setState({
        isLoadingOrganizations: true,
        organizationSelection: null,
      });
      this.debouncedLoadOrganizations();
    }

    handleOrganizationsClearRequested() {
      this.setState({organizations: []});
    }

    loadOrganizations() {
      // const apiDomain = config[process.env.OD_API_ENV].odrs;
      // const url = `${apiDomain}organizations.jsonp?`;
      // const apiKeyParam = `api_key=${config[process.env.OD_API_ENV].odApiKey}`;
      // const queryParams = `&locale=en&per_page=6&query%5Btext%5D=${this.state.organizationSearch}`;
      // fetchJsonp(url + apiKeyParam + queryParams)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     this.setState({
      //       isLoadingOrganizations: false,
      //       organizations: data.organizations,
      //     });
      //   });
    }

    render() {
      return (
        <WrappedComponent
          handleBlurOrganizations={this.handleBlurOrganizations}
          handleOrganizationsClearRequested={
            this.handleOrganizationsClearRequested
          }
          handleOrganizationsFetchRequested={
            this.handleOrganizationsFetchRequested
          }
          handleOrganizationSearchChange={this.handleOrganizationSearchChange}
          handleOrganizationSelect={this.handleOrganizationSelect}
          {...this.props}
          {...this.state}
        />
      );
    }
  };

export default withOrganizations;
