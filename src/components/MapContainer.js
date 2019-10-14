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
import infograph from "../helpers/Infographics";
import AsylumConnectMap from './AsylumConnectMap';
import SearchFormContainer from './search/SearchFormContainer';
import SearchResultsContainer from './search/SearchResultsContainer';
import OneDegreeResourceQuery from '../helpers/OneDegreeResourceQuery';
import Resource from './resource/Resource';
import Service from './resource/Service';
import Detail from './resource/Detail';
import ResourceTypes from '../helpers/ResourceTypes';

const styles = (theme) => ({
  searchArea: {
    padding: '2rem',
  },
  containerMap: {
    maxWidth: theme.maxColumnWidth,
    margin: "0 auto",
    [theme.breakpoints.down('xs')]: {
      overflowY: 'auto',
      height: '100%',
      backgroundColor: theme.palette.secondary[500]
    }
  }
});

/*const Map = (props) => (
  
);*/

class MapContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    let { inState, nearAddress, nearLatLng, selectedResourceTypes, selectedFilters, selectedSort } = this.parseParams(props.match.params);
    this.props.handleAddressChange(nearAddress);
    let ACMap = null;
    this.state = {
      nearLatLng,
      inState,
      mapWidth: "100%",
      searchStatus: null,
      selectedResourceTypes,
      selectedFilters,
      selectedSort,
      searching: false,
      searchDisabled: false,
      printDisabled: false,
      searchResults: [],
      searchResultsIndex: [],
      searchResultSlugs: [],
      selectedResource: null,
      selectedService: null,
      lastSearch: null,
    }

    this.recentResourceCache = {};

    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this)
    this.handleResourceBackButton = this.handleResourceBackButton.bind(this)
    this.handleFilterSelect = this.handleFilterSelect.bind(this)
    this.handleSortSelect = this.handleSortSelect.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.fetchNextSearchResultsPage = this.fetchNextSearchResultsPage.bind(this)
    this.handlePrintClick = this.handlePrintClick.bind(this)
    this.processSearchResults = this.processSearchResults.bind(this)
    this.setSelectedResource = this.setSelectedResource.bind(this)
    this.setSelectedService = this.setSelectedService.bind(this)
    this.clearResourceTypes = this.clearResourceTypes.bind(this)
    this.clearSearchFilters = this.clearSearchFilters.bind(this)
    this.clearSearchStatus = this.clearSearchStatus.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeMap.bind(this));

    this.resizeMap();
    if(this.props.match.path == '/:locale/search/:in/:place/:near/:for/:filter/:sort') {
      localStorage.setItem('lastSearch', this.props.history.location.pathname)
    }
  }

  componentWillMount() {
    //window.addEventListener('popstate', this.reparseURL.bind(this));
  }
  componentWillUnmount() {
    //window.removeEventListener('popstate', this.reparseURL.bind(this))
    window.removeEventListener('resize', this.resizeMap.bind(this));
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.match.path == '/:locale/resource/:id' && 
      (this.props.match.path != '/:locale/resource/:id'
        || (this.props.match.params 
            && nextProps.match.params
            && this.props.match.params.id != nextProps.match.params.id
            && this.props.match.path == '/:locale/resource/:id'
            ))
    ) {
      this.setSelectedResource(this.getCachedResource(nextProps.match.params.id));
    }
    if(nextProps.match.path == '/:locale/resource/:id/service/:serviceId' && 
      (this.props.match.path != '/:locale/resource/:id/service/:serviceId'
        || (this.props.match.params 
            && nextProps.match.params
            && this.props.match.params.serviceId != nextProps.match.params.serviceId
            && this.props.match.path == '/:locale/resource/:id/service/:serviceId'
            ))
    ) {
      this.setSelectedResource(this.getCachedResource(nextProps.match.params.id));
    }
    if(nextProps.match.path == '/:locale/search/:in/:place/:near/:for/:filter/:sort') {
      localStorage.setItem('lastSearch', nextProps.history.location.pathname)
    }
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

  clearResourceTypes(ev) {
    if(ev) {
      ev.preventDefault();
    }
    
    this.setState({
      selectedResourceTypes: []
    });
  }

  getCachedResource(slug) {
    let resourceIndex = this.state.searchResultSlugs.indexOf(slug.toLowerCase());
    if(resourceIndex > -1) {
      return this.findResource(slug);
    } else if(typeof this.recentResourceCache[slug.toLowerCase()] !== 'undefined') {
      return this.recentResourceCache[slug.toLowerCase()];
    }
    return null;
  }

  getInfographic() {
    let { nearLatLng } = this.parseParams(this.props.match.params);
    const center = nearLatLng;
    if(center) {
      return infograph.fetchNearestInfographic(center.lat, center.lng);
    } else if(this.props.match && this.props.match.path === '/') {
      return infograph.getDefaultInfographic(this.props.locale);
    } else {
      return null;
    }
  }

  handleResourceBackButton() { console.log(this, this.state)
    let lastSearch = localStorage.getItem('lastSearch');
    if(lastSearch) {
      this.props.history.push(lastSearch);
    } else {
      this.props.history.push('/');
    }
  }

  handlePlaceSelect(address) {
    this.setState({
      nearLatLng: null
    });
    this.props.handleAddressChange(address)
  }

  handlePlaceChange(address) {
    this.setState({
      nearLatLng: null
    });
    this.props.handleAddressChange(address)
  }

  handleResourceTypeSelect(event, checked) { 
    var index;
    const target = event.target;
    var selectedResourceTypes = this.state.selectedResourceTypes.slice();
    
    if(checked && selectedResourceTypes.indexOf(target.value) < 0) {
      selectedResourceTypes.push(target.value);
      selectedResourceTypes.sort();
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
      selectedFilters.sort();
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

  handlePrintClick() {
    var self = this;
    if(typeof this.queryOneDegree !== 'undefined' && !this.state.searching && !this.queryOneDegree.areAllResultsReturned()) {
      this.queryOneDegree.nextPage();
      this.setState({
        searching: true,
        searchDisabled: true,
        printDisabled: true
      });
      this.queryOneDegree.fetchOrganizations({
        callback: (results) => {
          self.processSearchResults(results)
          window.print();
          this.setState({
            searchDisabled: false,
            printDisabled: false
          });
        }
      });
    } else {
      window.print();
    }
  }

  handleSearchButtonClick() {    

    this.setState({
      searchDisabled: true
    });

    const redirect = ({latLng, state}) => {
      var resourceTypes = encodeURIComponent(this.state.selectedResourceTypes.length ? this.state.selectedResourceTypes.join(',') : 'any');
      var inState = encodeURIComponent(state.long_name);
      var nearAddress = encodeURIComponent(this.props.nearAddress);
      var nearLatLng = encodeURIComponent(latLng.lat + ',' + latLng.lng);
      var filters = encodeURIComponent(this.state.selectedFilters.length ? this.state.selectedFilters.join(',') : 'all');
      var sort = encodeURIComponent(this.state.selectedSort);
      this.props.history.push('/'+this.props.locale+'/search/'+inState+'/'+nearAddress+'/'+nearLatLng+'/'+resourceTypes+'/'+filters+'/'+sort);
      this.setState({
        searchStatus: 'refresh',
        nearLatLng: latLng,
        inState: state,
        searchDisabled: false
      });
    }

    if(this.state.nearLatLng == null) {
      geocodeByAddress(this.props.nearAddress)
        .then(results => {
          //console.log(results);
          let state = {};
          if(results.length && results[0].address_components) {
            results[0].address_components.map((piece) => {
              if(piece.types && piece.types.indexOf('administrative_area_level_1') >= 0) {
                state = piece;
              }
            });
          }
          //console.log(getLatLng(results[0]))
          return getLatLng(results[0]).then((latLng) => ({latLng, state}));
        })
        .then(redirect)
        .catch(error => {
          this.props.handleMessageNew("Unable to find your location, please try entering your city, state in the box above.");
          //console.error('Error', error)
          this.setState({
            searchDisabled: false
          });
          
        })
    } else {
      redirect({latLng: this.state.nearLatLng, state: this.state.inState});
    }
  }

  resizeMap(){

    const node = ReactDOM.findDOMNode(this.ACMap);
    if(node && node.getBoundingClientRect) {
      const nodeDimensions = node.getBoundingClientRect();
      let width = document.body.clientWidth - nodeDimensions.x;
      this.setState({mapWidth: width + "px"});
    }
  }

  fetchSearchResults() {
    let { inState, nearAddress, nearLatLng, selectedResourceTypes, selectedFilters, selectedSort, updated, stringified } = this.checkForURLUpdates();
    if(updated && nearLatLng !== null) {
      this.props.handleAddressChange(nearAddress);
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
        .setState(inState.long_name)
        .setFilters(selectedFilters)
        .setOrder(selectedSort)
        .fetchOrganizations({
          callback: this.processSearchResults
        });
    }
  }

  fetchNextSearchResultsPage() {
    if(typeof this.queryOneDegree !== 'undefined' && !this.state.searching && !this.queryOneDegree.areAllResultsReturned()) {
      if(this.queryOneDegree.nextPage()) {
        this.setState({
          searchDisabled: true,
          printDisabled: true,
          searching: true
        });
        this.queryOneDegree.fetchOrganizations({
          callback: this.processSearchResults
        });
      }
    }
  }

  findResource(slug) {
    const searchResults = this.state.searchResults.slice();
    for(let i = 0; i < this.state.searchResults.length; i ++) {
      if(searchResults[i].slug == slug) {
        return searchResults[i];
      }
    }
    return null;
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

    this.setState((prevState) => ({
      searchResultsIndex: prevState.searchResultsIndex.concat(newOrgIds),
      searchResultSlugs: prevState.searchResultSlugs.concat(newOrgSlugs),
      searchResults: prevState.searchResults.concat(newOrgs),
      searchDisabled: false,
      printDisabled: false,
      searching: false
    }));
  }

  setSelectedResource(resource) {
    if(resource) {
      this.recentResourceCache[resource.slug.toLowerCase()] = resource;
    }
    this.setState({
      selectedResource: resource
    });
  }

  setSelectedService(service) {
    this.setState({
      selectedService: service
    });
  }

  parseParams(params) {
    var inState = {}, nearAddress = '', nearLatLng = null, selectedResourceTypes = [], selectedFilters = [], selectedSort = 'best';
    if(params.in) {
      inState = {long_name: decodeURIComponent(params.in)}
    }

    if(params.place) {
      nearAddress = decodeURIComponent(params.place)
    }

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

    return {selectedResourceTypes, inState, nearAddress, nearLatLng, selectedFilters, selectedSort};
  }

  checkForURLUpdates(ev) { 
    let { inState, nearAddress, nearLatLng, selectedResourceTypes, selectedFilters, selectedSort } = this.parseParams(this.props.match.params);
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
    return { inState, nearAddress, nearLatLng, selectedResourceTypes, selectedFilters, selectedSort, updated, stringified };
  }

  render() {
    var mapResources = [];
    if(this.state.searchResults || this.state.selectedResource || this.state.selectedService) {
      switch(this.props.match.path) {
        case '/:locale/resource/:id':
          mapResources = (this.state.selectedResource ? [this.state.selectedResource] : [])
        break;
        case '/:locale/resource/:id/service/:serviceId':
          mapResources = (this.state.selectedService ? [this.state.selectedService] : [])
        break;
        default:
          mapResources = this.state.searchResults;
        break;
      }
    }

    const isMobile = this.props.width < breakpoints['sm'];
    const infographic = this.getInfographic();

    const selectedResourceTypes = typeof this.state.selectedResourceTypes !== 'undefined' && this.state.selectedResourceTypes.length ? this.state.selectedResourceTypes : [];
    //on the search results, enforce a distance limitation of 100 miles
    const mapMaxDistance = this.props.match.path == '/:locale/search/:in/:place/:near/:for/:filter/:sort' ? 100 : null;
    return (
        <div className={"container--map "+this.props.classes.containerMap}> 
          <Grid container spacing={0} alignItems='stretch'>
            <Grid item xs={12} sm={8}>
              <div className="container--search">
                <Switch>
                  <Route exact path="/" render={props => <SearchFormContainer {...props} {...this.props} {...this.state}
                    clearResourceTypes={this.clearResourceTypes}
                    handlePlaceSelect={this.handlePlaceSelect} 
                    handlePlaceChange={this.handlePlaceChange}
                    handleSearchButtonClick={this.handleSearchButtonClick}
                    handleResourceTypeSelect={this.handleResourceTypeSelect}
                    infographic={infographic}
                    nearAddress={this.props.nearAddress}
                    searchDisabled={this.state.searchDisabled}
                    classes={null}
                     />} />
                    }
                  <Route path="/:locale/search/:in/:place/:near/:for/:filter/:sort" render={ props => (
                    <SearchResultsContainer {...props} {...this.state}
                      clearResourceTypes={this.clearResourceTypes}
                      clearSearchFilters={this.clearSearchFilters}
                      clearSearchStatus={this.clearSearchStatus}
                      country={this.props.country}
                      fetchNextSearchResultsPage={this.fetchNextSearchResultsPage}
                      fetchSearchResults={this.fetchSearchResults}
                      handleListAddFavorite={this.props.handleListAddFavorite}
                      handleListRemoveFavorite={this.props.handleListRemoveFavorite}
                      handleListNew={this.props.handleListNew}
                      handleLogOut={this.props.handleLogOut}
                      handleMessageNew={this.props.handleMessageNew}
                      handlePlaceSelect={this.handlePlaceSelect} 
                      handlePlaceChange={this.handlePlaceChange}
                      handlePrintClick={this.handlePrintClick}
                      handleSearchButtonClick={this.handleSearchButtonClick}
                      handleResourceTypeSelect={this.handleResourceTypeSelect}
                      handleRequestOpen={this.props.handleRequestOpen}
                      handleFilterSelect={this.handleFilterSelect}
                      handleSortSelect={this.handleSortSelect}
                      infographic={isMobile && infographic}
                      lists={this.props.lists}
                      locale={this.props.locale}
                      mapResources={mapResources}
                      mapMaxDistance={mapMaxDistance}
                      nearAddress={this.props.nearAddress}
                      printDisabled={this.state.printDisabled}
                      searchDisabled={this.state.searchDisabled}
                      searchCenter={this.state.nearLatLng}
                      session={this.props.session}
                      showWalkinCheckbox={(false && selectedResourceTypes.filter(item => {return (typeof ResourceTypes.resourceCategoryIndex[item] !== 'undefined' && ResourceTypes.resourceCategoryIndex[item].category == 'Legal')}).length > 0)}
                      t={this.props.t}
                      user={this.props.user}
                    />)}
                  />
                  {/*<Route path="/resource/:id/service/:serviceId" render={ props => (
                    <Service {...props}
                      handleListAddFavorite={this.props.handleListAddFavorite}
                      handleListRemoveFavorite={this.props.handleListRemoveFavorite}
                      handleListNew={this.props.handleListNew}
                      handleLogOut={this.props.handleLogOut}
                      handleMessageNew={this.props.handleMessageNew}
                      handleRequestOpen={this.props.handleRequestOpen}
                      lists={this.props.lists}
                      mapResources={mapResources}
                      resource={this.getCachedResource(props.match.params.id)}
                      setSelectedResource={this.setSelectedResource}
                      service={props.match.params.serviceId}
                      setSelectedService={this.setSelectedService}
                      session={this.props.session}
                      user={this.props.user}
                    />)}
                  />*/}
                  <Route path="/:locale/resource/:id" render={ props => (
                    <Detail {...props}
                      handleListAddFavorite={this.props.handleListAddFavorite}
                      handleListRemoveFavorite={this.props.handleListRemoveFavorite}
                      handleListNew={this.props.handleListNew}
                      handleLogOut={this.props.handleLogOut}
                      handleMessageNew={this.props.handleMessageNew}
                      handleRequestOpen={this.props.handleRequestOpen}
                      handleResourceBackButton={this.handleResourceBackButton}
                      lists={this.props.lists}
                      locale={this.props.locale}
                      mapResources={mapResources}
                      resource={this.getCachedResource(props.match.params.id)}
                      service={this.state.selectedService}
                      setSelectedResource={this.setSelectedResource}
                      setSelectedService={this.setSelectedService}
                      session={this.props.session}
                      t={this.props.t}
                      user={this.props.user}
                    />)}
                  />
                </Switch>
              </div>
            </Grid>
            {isMobile ? null :
            <Grid item xs={12} sm={4} className="hide--on-print">
              <Sticky>
                <div>
                  <AsylumConnectMap
                    containerElement={<div style={{ width: this.state.mapWidth,height: window.innerHeight+"px" }} />}
                    country={this.props.country}
                    history={this.props.history}
                    infographic={this.props.match.path == "/:locale/search/:in/:place/:near/:for/:filter/:sort" && infographic}
                    loadingElement={<div style={{ width:"100%", height: window.innerHeight+"px" }} />}
                    locale={this.props.locale}
                    mapElement={<div style={{ width:this.state.mapWidth,height: window.innerHeight+"px" }} />} 
                    mapMaxDistance={mapMaxDistance}
                    ref={(el) => this.ACMap = el}
                    resources={mapResources}
                    searchCenter={this.state.nearLatLng}
                    t={this.props.t}
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
