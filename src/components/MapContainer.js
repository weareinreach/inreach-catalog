import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import withWidth from './withWidth';
import breakpoints from '../theme/breakpoints';
import AsylumConnectMap from './AsylumConnectMap';
import SearchFormContainer from './search/SearchFormContainer';
import SearchResultsContainer from './search/SearchResultsContainer';
import OneDegreeResourceQuery from '../helpers/OneDegreeResourceQuery';
import Resource from './resource/Resource';

const styles = (theme) => ({
  searchArea: {
    padding: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    containerMap: {
      height: "calc(100% - 91px)",
      overflowY: 'auto'
    }
  }
});

class MapContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
    //this.state = { dialog: 'none' };
    //
    let { nearLatLng, selectedResourceTypes } = this.parseParams(props.match.params);
    this.state = {
      nearAddress: '',
      nearLatLng,
      mapCenter: nearLatLng,
      searchStatus: null,
      errorMessage: false,
      selectedResourceTypes,
      searching: false,
      searchResults: [],
      searchResultsIndex: [],
      searchResultSlugs: []
    }
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
    var selectedResourceTypes = this.state.selectedResourceTypes.slice();
    
    if(checked && selectedResourceTypes.indexOf(target.value) < 0) {
      selectedResourceTypes.push(target.value)
      this.setState({
        selectedResourceTypes: selectedResourceTypes,
        searchStatus: null
      });
    } else if(!checked && (index = selectedResourceTypes.indexOf(target.value)) >= 0) {
      selectedResourceTypes.splice(index, 1)
      this.setState({
        selectedResourceTypes: selectedResourceTypes,
        searchStatus: null
      });
    }
  }

  handleSearchButtonClick() {
    this.clearErrors();
    
    if(this.state.nearLatLng == null || this.state.nearAddress == this.state.nearLatLng) {
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } 

    if(this.state.selectedResourceTypes.length == 0) {
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
      .addTags(this.state.selectedResourceTypes)
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
    var newOrgIds = [], newOrgs = [], newOrgSlugs =[];
    data.organizations.forEach((organization, index) => {
      if(this.state.searchResultsIndex.indexOf(organization.id) === -1) {
        newOrgIds.push(organization.id);
        newOrgSlugs.push(organization.slug);
        newOrgs.push(organization);
      }
    });

    this.setState({
      searchResultsIndex: this.state.searchResultsIndex.concat(newOrgIds),
      searchResultSlugs: this.state.searchResultSlugs.concat(newOrgSlugs),
      searchResults: this.state.searchResults.concat(newOrgs),
      searching: false
    });
  }

  parseParams(params) {
    var nearLatLng = null, selectedResourceTypes = [];
    if(params.near) {
      var latLng = decodeURIComponent(params.near).split(',')
      nearLatLng = {
        lat: parseFloat(latLng[0]),
        lng: parseFloat(latLng[1])
      }
    }

    if(params.for) {
      selectedResourceTypes = decodeURIComponent(params.for).split(',');
    }

    return {selectedResourceTypes, nearLatLng};
  }

  reparseURL(ev) {
    let { nearLatLng, selectedResourceTypes } = this.parseParams(this.props.match.params);
    this.setState({
      nearLatLng,
      selectedResourceTypes
    });
  }

  Routes() {
    /*return  (
        
    );*/
  }

  render() {
    this.mapProps = {};
    if(this.state.mapCenter) {
      this.mapProps.center = this.state.mapCenter;
      this.mapProps.zoom = 8;
    }
    if(this.state.searchResults) {
      this.mapProps.resources = this.state.searchResults;
    }
    const { Routes } = this; 
    const isMobile = this.props.width < breakpoints['sm'];

    const map = (props) => (
      <div style={props.style}>
        <AsylumConnectMap {...this.props} 
          mapProps={this.mapProps} classes={null}
          loadingElement={<div style={{ width:"100%", height: window.innerHeight+"px" }} />}
          containerElement={<div style={{ width:"100%",height: window.innerHeight+"px" }} />}
          mapElement={<div style={{ width:"100%",height: window.innerHeight+"px" }} />} 
        />
      </div>
    );
    return (
      <Router>
        <div className={"container--map "+this.props.classes.containerMap}> 
          <Grid container spacing={0}>
            <Grid item xs={12} sm={8}>
              <div className="container--search">
                <Switch>
                  <Route exact path="/" render={props => <SearchFormContainer {...props} {...this.state}
                    handlePlaceSelect={this.handlePlaceSelect} 
                    handlePlaceChange={this.handlePlaceChange}
                    handleSearchButtonClick={this.handleSearchButtonClick}
                    handleResourceTypeSelect={this.handleResourceTypeSelect}
                     />} />
                    }
                  <Route path="/search/:near/:for/:filter/:sort" render={ props => <SearchResultsContainer {...props} {...this.state}
                    mapProps={this.mapProps}
                    fetchSearchResults={this.fetchSearchResults}
                    clearSearchStatus={this.clearSearchStatus}
                    handlePlaceSelect={this.handlePlaceSelect} 
                    handlePlaceChange={this.handlePlaceChange}
                    handleSearchButtonClick={this.handleSearchButtonClick}
                    handleResourceTypeSelect={this.handleResourceTypeSelect}
                    session={this.props.session}
                    user={this.props.user}
                    />} />
                  <Route path="/resource/:id" render={ props => <Resource {...props} mapProps={this.mapProps} handleMessageNew={this.props.handleMessageNew} resource={(() => {
                    let resourceIndex = this.state.searchResultSlugs.indexOf(props.match.params.id.toLowerCase());
                    return resourceIndex > -1 ? this.state.searchResults[resourceIndex] : null })() } />} />
                </Switch>
              </div>
            </Grid>
            {isMobile ? null :
            <StickyContainer style={{ /* if the map width changes these must be updated to follow suit */
              flexBasis: "33.3333%",
              flexGrow: "0",
              flexShrink: "0",
              maxWidth:"33.3333%"
            }}>
              <Grid item xs={12} sm={12}>
                <Sticky>
                  {map}
                </Sticky>          
              </Grid>
            </StickyContainer>}
          </Grid> 
        </div>
      </Router>
    );
  }
};

export default withWidth(withStyles(styles)(MapContainer));
