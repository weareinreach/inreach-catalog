import React from 'react';

import {
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
//import { StickyContainer, Sticky } from 'react-sticky';

import Sticky from 'react-sticky-state';

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

/*const Map = (props) => (
  
);*/

class MapContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    let { nearLatLng, selectedResourceTypes, selectedFilters, selectedSort } = this.parseParams(props.match.params);
    this.state = {
      nearAddress: '',
      nearLatLng,
      mapCenter: nearLatLng,
      searchStatus: null,
      selectedResourceTypes,
      selectedFilters,
      selectedSort,
      searching: false,
      searchResults: [],
      searchResultsIndex: [],
      searchResultSlugs: []
    }
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this)
    this.handleFilterSelect = this.handleFilterSelect.bind(this)
    this.handleSortSelect = this.handleSortSelect.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.fetchNextSearchResultsPage = this.fetchNextSearchResultsPage.bind(this)
    this.processSearchResults = this.processSearchResults.bind(this)
    this.clearSearchFilters = this.clearSearchFilters.bind(this)
    this.clearSearchStatus = this.clearSearchStatus.bind(this)
  }

  componentWillMount() {
    window.addEventListener('popstate', this.reparseURL.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this.reparseURL.bind(this))
  }

  clearSearchStatus() {
    this.setState({
      searchStatus: null
    });
  }

  clearSearchFilters() { 
    this.setState({
      selectedFilters: []
    })
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

  handleFilterSelect(event, checked) { 
    var index;
    const target = event.target;
    var selectedFilters = this.state.selectedFilters.slice();
    
    if(checked && selectedFilters.indexOf(target.value) < 0) {
      selectedFilters.push(target.value)
      this.setState({
        selectedFilters: selectedFilters
      });
    } else if(!checked && (index = selectedFilters.indexOf(target.value)) >= 0) {
      selectedFilters.splice(index, 1)
      this.setState({
        selectedFilters: selectedFilters,
      });
    }
  }

  handleSortSelect(event, value) {
    this.setState({
      selectedSort: event.target.value,
    });
  }

  handleSearchButtonClick() {    
    if(this.state.nearLatLng == null || this.state.nearAddress == this.state.nearLatLng) {
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } 

    if(this.state.selectedResourceTypes.length == 0) {
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } 
    
    this.setState({
      mapCenter: this.state.nearLatLng,
      searchStatus: 'refresh'
    });

    var resourceTypes = encodeURIComponent(this.state.selectedResourceTypes.length ? this.state.selectedResourceTypes.join(',') : 'any');
    var latLng = encodeURIComponent(this.state.nearLatLng.lat + ',' + this.state.nearLatLng.lng);
    var filters = encodeURIComponent(this.state.selectedFilters.length ? this.state.selectedFilters.join(',') : 'all');
    var sort = encodeURIComponent(this.state.selectedSort);
    this.props.history.push('/search/'+latLng+'/'+resourceTypes+'/'+filters+'/'+sort);
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
      .setFilters(this.state.selectedFilters)
      .setOrder(this.state.selectedSort)
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
    var nearLatLng = null, selectedResourceTypes = [], selectedFilters = [], selectedSort = 'best';
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

    if(params.filter) {
      if(params.filter !== "all") {
        selectedFilters = decodeURIComponent(params.filter).split(',');
      }
    }

    if(params.sort) {
      selectedSort = params.sort
    }

    return {selectedResourceTypes, nearLatLng, selectedFilters, selectedSort};
  }

  reparseURL(ev) { console.log('re-parsing');
    let { nearLatLng, selectedResourceTypes } = this.parseParams(this.props.match.params);
    this.setState({
      nearLatLng,
      selectedResourceTypes
    });
  }

  render() {
    const mapProps = {};
    if(this.state.mapCenter) {
      mapProps.center = this.state.mapCenter;
      mapProps.zoom = 8;
    }
    if(this.state.searchResults) {
      mapProps.resources = this.state.searchResults;
    }
    const isMobile = this.props.width < breakpoints['sm'];

    return (
        <div className={"container--map "+this.props.classes.containerMap}> 
          <Grid container spacing={0} alignItems='stretch'>
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
                  <Route path="/search/:near/:for/:filter/:sort" render={ props => (
                    <SearchResultsContainer {...props} {...this.state}
                      mapProps={mapProps}
                      fetchSearchResults={this.fetchSearchResults}
                      clearSearchFilters={this.clearSearchFilters}
                      clearSearchStatus={this.clearSearchStatus}
                      handleListAddFavorite={this.props.handleListAddFavorite}
                      handleListRemoveFavorite={this.props.handleListRemoveFavorite}
                      handleListNew={this.props.handleListNew}
                      handleMessageNew={this.props.handleMessageNew}
                      handlePlaceSelect={this.handlePlaceSelect} 
                      handlePlaceChange={this.handlePlaceChange}
                      handleSearchButtonClick={this.handleSearchButtonClick}
                      handleResourceTypeSelect={this.handleResourceTypeSelect}
                      handleFilterSelect={this.handleFilterSelect}
                      handleSortSelect={this.handleSortSelect}
                      lists={this.props.lists}
                      session={this.props.session}
                      user={this.props.user}
                    />)}
                  />
                  <Route path="/resource/:id" render={ props => (
                    <Resource {...props}
                      handleListAddFavorite={this.props.handleListAddFavorite}
                      handleListRemoveFavorite={this.props.handleListRemoveFavorite}
                      handleListNew={this.props.handleListNew}
                      handleMessageNew={this.props.handleMessageNew}
                      lists={this.props.lists}
                      mapProps={mapProps}
                      resource={(() => {
                        let resourceIndex = this.state.searchResultSlugs.indexOf(props.match.params.id.toLowerCase());
                        return resourceIndex > -1 ? this.state.searchResults[resourceIndex] : null })()
                      }
                      session={this.props.session}
                      user={this.props.user}
                    />)}
                  />
                </Switch>
              </div>
            </Grid>
            {isMobile ? null :
            <Grid item xs={12} sm={4}>
              <Sticky>
                <div>
                  <AsylumConnectMap {...this.props} 
                    mapProps={mapProps} classes={null}
                    loadingElement={<div style={{ width:"100%", height: window.innerHeight+"px" }} />}
                    containerElement={<div style={{ width:"100%",height: window.innerHeight+"px" }} />}
                    mapElement={<div style={{ width:"100%",height: window.innerHeight+"px" }} />} 
                  />
                </div>
              </Sticky>          
            </Grid>}
          </Grid> 
        </div>
    );
  }
};

export default withWidth(withStyles(styles)(MapContainer));
