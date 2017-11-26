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
import ReactDOM from 'react-dom';

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
  containerMap: {
    maxWidth: theme.maxColumnWidth,
    margin: "0 auto"
  },
  [theme.breakpoints.down('sm')]: {
    containerMap: {
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
    let ACMap = null;
    this.state = {
      nearAddress: '',
      nearLatLng,
      mapWidth: "100%",
      searchStatus: null,
      selectedResourceTypes,
      selectedFilters,
      selectedSort,
      searching: false,
      searchDisabled: false,
      searchResults: [],
      searchResultsIndex: [],
      searchResultSlugs: [],
      selectedResource: null,
      lastSearch: null,
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
    this.setSelectedResource = this.setSelectedResource.bind(this)
    this.clearSearchFilters = this.clearSearchFilters.bind(this)
    this.clearSearchStatus = this.clearSearchStatus.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeMap.bind(this));

    this.resizeMap();
  }

  componentWillMount() {
    //window.addEventListener('popstate', this.reparseURL.bind(this));
  }
  componentWillUnmount() {
    //window.removeEventListener('popstate', this.reparseURL.bind(this))
    window.removeEventListener('resize', this.resizeMap.bind(this));
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.match.path == '/resource/:id' && 
      (this.props.match.path != '/resource/:id'
        || (this.props.match.params 
            && nextProps.match.params
            && this.props.match.params.id != nextProps.match.params.id
            && this.props.match.path == '/resource/:id'
            ))
    ) {
      this.setSelectedResource(this.getCachedResource(nextProps.match.params.id));
    }
  }

  getCachedResource(slug) {
    let resourceIndex = this.state.searchResultSlugs.indexOf(slug.toLowerCase());
    if(resourceIndex > -1) {
      return this.state.searchResults[resourceIndex];
    } 
    return null 
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
    this.setState({
      nearAddress: address,
      nearLatLng: null
    });
  }

  handlePlaceChange(address) {
    this.setState({
      nearAddress: address,
      nearLatLng: null
    });
  }

  handleResourceTypeSelect(event, checked) { 
    var index;
    const target = event.target;
    var selectedResourceTypes = this.state.selectedResourceTypes.slice();
    
    if(checked && selectedResourceTypes.indexOf(target.value) < 0) {
      selectedResourceTypes.push(target.value).sort();
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
      selectedFilters.push(target.value).sort();
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
    /*if(this.state.nearLatLng == null || this.state.nearAddress == this.state.nearLatLng) {
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } */

    /*if(this.state.selectedResourceTypes.length == 0) {
      this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
      return;
    } */

    this.setState({
      searchDisabled: true
    });

    const redirect = (latLng) => {
      var resourceTypes = encodeURIComponent(this.state.selectedResourceTypes.length ? this.state.selectedResourceTypes.join(',') : 'any');
      var nearLatLng = encodeURIComponent(latLng.lat + ',' + latLng.lng);
      var filters = encodeURIComponent(this.state.selectedFilters.length ? this.state.selectedFilters.join(',') : 'all');
      var sort = encodeURIComponent(this.state.selectedSort);
      this.props.history.push('/search/'+nearLatLng+'/'+resourceTypes+'/'+filters+'/'+sort);
      this.setState({
        searchStatus: 'refresh',
        nearLatLng: latLng,
        searchDisabled: false
      });
    }

    if(this.state.nearLatLng == null) {
      geocodeByAddress(this.state.nearAddress)
        .then(results => getLatLng(results[0]))
        .then(redirect)
        .catch(error => {
          this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
          console.error('Error', error)
          this.setState({
            searchDisabled: false
          });
          
        })
    } else {
      redirect(this.state.nearLatLng)
    }
    
    

    /*var resourceTypes = encodeURIComponent(this.state.selectedResourceTypes.length ? this.state.selectedResourceTypes.join(',') : 'any');
    var latLng = encodeURIComponent(this.state.nearLatLng.lat + ',' + this.state.nearLatLng.lng);
    var filters = encodeURIComponent(this.state.selectedFilters.length ? this.state.selectedFilters.join(',') : 'all');
    var sort = encodeURIComponent(this.state.selectedSort);
    this.props.history.push('/search/'+latLng+'/'+resourceTypes+'/'+filters+'/'+sort);*/
  }

  resizeMap(){

    const node = ReactDOM.findDOMNode(this.ACMap);
    const nodeDimensions = node.getBoundingClientRect();
    let width = document.body.clientWidth - nodeDimensions.x;
    this.setState({mapWidth: width + "px"});
  }

  fetchSearchResults() {
    let { nearLatLng, selectedResourceTypes, selectedFilters, selectedSort, updated, stringified } = this.checkForURLUpdates();
    if(updated && nearLatLng !== null) {
      this.setState({
        nearLatLng,
        selectedResourceTypes,
        selectedFilters,
        selectedSort,
        searching: true,
        searchResultsIndex: [],
        searchResults: [],
        lastSearch: stringified
      });

      this.queryOneDegree = new OneDegreeResourceQuery();
      this.queryOneDegree
        .addTags(selectedResourceTypes)
        .setLocation(nearLatLng)
        .setFilters(selectedFilters)
        .setOrder(selectedSort)
        .fetchOrganizations({
          callback: this.processSearchResults
        });
    }
  }

  fetchNextSearchResultsPage() {
    if(typeof this.queryOneDegree !== 'undefined' && !this.state.searching && !this.queryOneDegree.areAllResultsReturned()) {
      this.queryOneDegree.nextPage();
      this.setState({
        searching: true
      });
      this.queryOneDegree.fetchOrganizations({
        callback: this.processSearchResults
      });
    }
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

  setSelectedResource(resource) {
    this.setState({
      selectedResource: resource
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

    if(params.for && params.for !== "any") {
      selectedResourceTypes = decodeURIComponent(params.for).split(',');
      selectedResourceTypes.sort();
    }

    if(params.filter && params.filter !== "all") {
      selectedFilters = decodeURIComponent(params.filter).split(',');
      selectedFilters.sort();
    }

    if(params.sort) {
      selectedSort = params.sort
    }

    return {selectedResourceTypes, nearLatLng, selectedFilters, selectedSort};
  }

  checkForURLUpdates(ev) { 
    let { nearLatLng, selectedResourceTypes, selectedFilters, selectedSort } = this.parseParams(this.props.match.params);
    let updated = false;
    let stringified = JSON.stringify({
      nearLatLng,
      selectedResourceTypes,
      selectedFilters,
      selectedSort
    });
    if(stringified !== this.state.lastSearch
    ) {
      updated = true;
    }
    return { nearLatLng, selectedResourceTypes, selectedFilters, selectedSort, updated, stringified };
  }

  render() {
    var mapResources = [];
    if(this.state.searchResults || this.state.selectedResource) {
      switch(this.props.match.path) {
        case '/resource/:id':
          mapResources = (this.state.selectedResource ? [this.state.selectedResource] : [])
        break;
        default:
          mapResources = this.state.searchResults;
        break;
      }
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
                    searchDisabled={this.state.searchDisabled}
                     />} />
                    }
                  <Route path="/search/:near/:for/:filter/:sort" render={ props => (
                    <SearchResultsContainer {...props} {...this.state}
                      mapResources={mapResources}
                      fetchSearchResults={this.fetchSearchResults}
                      clearSearchFilters={this.clearSearchFilters}
                      clearSearchStatus={this.clearSearchStatus}
                      fetchNextSearchResultsPage={this.fetchNextSearchResultsPage}
                      handleListAddFavorite={this.props.handleListAddFavorite}
                      handleListRemoveFavorite={this.props.handleListRemoveFavorite}
                      handleListNew={this.props.handleListNew}
                      handleMessageNew={this.props.handleMessageNew}
                      handlePlaceSelect={this.handlePlaceSelect} 
                      handlePlaceChange={this.handlePlaceChange}
                      handleSearchButtonClick={this.handleSearchButtonClick}
                      handleResourceTypeSelect={this.handleResourceTypeSelect}
                      handleRequestOpen={this.props.handleRequestOpen}
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
                      handleRequestOpen={this.props.handleRequestOpen}
                      lists={this.props.lists}
                      mapResources={mapResources}
                      resource={this.getCachedResource(props.match.params.id)}
                      setSelectedResource={this.setSelectedResource}
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
                  <AsylumConnectMap
                    resources={mapResources}
                    loadingElement={<div style={{ width:"100%", height: window.innerHeight+"px" }} />}
                    containerElement={<div style={{ width: this.state.mapWidth,height: window.innerHeight+"px" }} />}
                    mapElement={<div style={{ width:this.state.mapWidth,height: window.innerHeight+"px" }} />} 
                    ref={(el) => this.ACMap = el}
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
