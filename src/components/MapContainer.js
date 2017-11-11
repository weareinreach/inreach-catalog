import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import AsylumConnectMap from './AsylumConnectMap';
import SearchFormContainer from './search/SearchFormContainer';
import SearchResultsContainer from './search/SearchResultsContainer';
import OneDegreeResourceQuery from '../helpers/OneDegreeResourceQuery';

const styles = (theme) => ({
  searchArea: {
    padding: '2rem',
  },
  container: {
    minHeight: '500px'
  }
});

const Resource = () => (
  <div>
    <h2>Resource</h2>
  </div>
);
const GoogleMap =() => (
  <div>
    <h2>Google Map</h2>
  </div>
);

class MapContainer extends React.Component {
  constructor(props, context) { console.log(props);
    super(props, context)
    //this.state = { dialog: 'none' };
    //
    let { nearLatLng, selectedResources } = this.parseParams(props.match.params);
    this.state = {
      nearAddress: '',
      nearLatLng,
      mapCenter: nearLatLng,
      searchStatus: null,
      errorMessage: false,
      selectedResources,
      searching: false,
      searchResults: [],
      searchResultsIndex: []
    }
    console.log(this.props);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.fetchNextSearchResultsPage = this.fetchNextSearchResultsPage.bind(this)
    this.processSearchResults = this.processSearchResults.bind(this)
    this.clearSearchStatus = this.clearSearchStatus.bind(this)
    this.Routes = this.Routes.bind(this)
  }

  componentWillMount() {
    this.clearErrors();

    window.addEventListener('popstate', this.reparseURL.bind(this));
    //window.onpopstate = this.reparseURL.bind(this);
  }
  
  clearErrors() {
    this.setState({
      errorMessage: false
    });
  }

  clearSearchStatus() {
    this.setState({
      searchStatus: null
    });
  }

  handlePlaceSelect(address) {

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({
        nearAddress: address,
        nearLatLng: latLng
      }))
      .catch(error => console.error('Error', error))

  }

  handlePlaceChange(address) {
    this.setState({
      nearAddress: address,
      nearLatLng: null,
      searchStatus: null
    });
  }

  handleResourceTypeSelect(event, checked) { 
    var index;
    const target = event.target;
    var selectedResources = this.state.selectedResources.slice();
    
    if(checked && selectedResources.indexOf(target.value) < 0) {
      selectedResources.push(target.value)
      this.setState({
        selectedResources: selectedResources,
        searchStatus: null
      });
    } else if(!checked && (index = selectedResources.indexOf(target.value)) >= 0) {
      selectedResources.splice(index, 1)
      this.setState({
        selectedResources: selectedResources,
        searchStatus: null
      });
    }
  }

  handleSearchButtonClick() {
    this.clearErrors();
    
    if(this.state.nearLatLng == null || this.state.nearAddress == this.state.nearLatLng) {
      /*this.setState({
        searchStatus: "error",
        errorMessage: "Unable to find your location, please try entering your city, state in the box above."
      });*/
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } 

    if(this.state.selectedResources.length == 0) {
      /*this.setState({
        searchStatus: "error",
        errorMessage: "Please select at least one resource type from the dropdown"
      });*/
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } 
    
    this.setState({
      searchStatus: 'redirect',
      mapCenter: this.state.nearLatLng
    });
  }

  fetchSearchResults() {
    this.setState({
      searching: true,
      searchResultsIndex: [],
      searchResults: []
    });
    this.queryOneDegree = new OneDegreeResourceQuery();
    this.queryOneDegree
      .addTags(this.state.selectedResources)
      .setLocation(this.state.nearLatLng)
      .fetchOrganizations({
        callback: this.processSearchResults
      });
  }

  fetchNextSearchResultsPage() {
    this.queryOneDegree.nextPage();
    this.queryOneDegree.fetchOrganizations({
      callback: this.processSearchResults
    });
  }

  processSearchResults(data) {
    var newOrgIds = [], newOrgs = [];
    data.organizations.forEach((organization, index) => {
      if(this.state.searchResultsIndex.indexOf(organization.id) === -1) {
        newOrgIds.push(organization.id);
        newOrgs.push(organization);
      }
    });

    this.setState({
      searchResultsIndex: this.state.searchResultsIndex.concat(newOrgIds),
      searchResults: this.state.searchResults.concat(newOrgs),
      searching: false
    });
  }

  parseParams(params) {
    var nearLatLng = null, selectedResources = [];
    if(params.near) {
      var latLng = decodeURIComponent(params.near).split(',')
      nearLatLng = {
        lat: parseFloat(latLng[0]),
        lng: parseFloat(latLng[1])
      }
    }

    if(params.for) {
      selectedResources = decodeURIComponent(params.for).split(',');
    }

    return {selectedResources, nearLatLng};
  }

  reparseURL(ev) {
    let { nearLatLng, selectedResources } = this.parseParams(this.props.match.params);
    this.setState({
      nearLatLng,
      selectedResources
    });
  }

  Routes() {
    return  (
        <Switch>
          <Route exact path="/" render={props => <SearchFormContainer {...props} {...this.state}
            handlePlaceSelect={this.handlePlaceSelect} 
            handlePlaceChange={this.handlePlaceChange}
            handleSearchButtonClick={this.handleSearchButtonClick}
            handleResourceTypeSelect={this.handleResourceTypeSelect}
             />} />
            }
          <Route path="/search/:near/:for/:filter/:sort" render={ props => <SearchResultsContainer {...props} {...this.state}
            fetchSearchResults={this.fetchSearchResults}
            clearSearchStatus={this.clearSearchStatus}
            handlePlaceSelect={this.handlePlaceSelect} 
            handlePlaceChange={this.handlePlaceChange}
            handleSearchButtonClick={this.handleSearchButtonClick}
            handleResourceTypeSelect={this.handleResourceTypeSelect}
            session={this.props.session}
            user={this.props.user}
            />} />
          <Route path="/resource/:id" render={ props => <Resource />} />
        </Switch>
    );
  }

  render() {
    //const { classes } = this.props
    //const { searchArea } = classes;
    const addedProps = this.state;
    var mapProps = {};
    if(this.state.mapCenter) {
      mapProps.center = this.state.mapCenter;
      mapProps.zoom = 8;
    }
    if(this.state.searchResults) {
      mapProps.resources = this.state.searchResults;
    }

    const { Routes } = this;

    return (
      <Router>
      <div className="container--map"> 
        {/* TODO: Adjust this to the Material UI Tab Components for Mobile */}
        <Grid container spacing={0}>
          <Grid item xs={12} md={7}>
            <div className="container--search">
              <Grid container alignItems='center' justify='center' spacing={0} className={this.props.classes.container}>
                <Grid item md={10} lg={9} sm={12}>
                  <Routes />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={5} >
            {/* Map Component */}
            <AsylumConnectMap {...this.props} 
              mapProps={mapProps} classes={null}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />} 
            />
          </Grid>
        </Grid>
      </div>
      </Router>
    );
  }
};

export default withStyles(styles)(MapContainer);
