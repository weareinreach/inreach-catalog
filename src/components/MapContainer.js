import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import SearchFormContainer from './SearchFormContainer';
import SearchResultsContainer from './SearchResultsContainer';
import OneDegreeResourceQuery from '../helpers/OneDegreeResourceQuery';
var queryOneDegree = new OneDegreeResourceQuery();
//require('./MapContainer.scss');

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
  constructor(props, context) {
    super(props, context)
    //this.state = { dialog: 'none' };
    //
    let { nearLatLng, selectedResources } = this.parseParams(props.match.params);
    this.state = {
      nearAddress: '',
      nearLatLng,
      searchStatus: false,
      errorMessage: false,
      selectedResources
    }

    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.clearSearchStatus = this.clearSearchStatus.bind(this)
    this.Routes = this.Routes.bind(this)
  }

  componentWillMount() {
    this.clearErrors();
  }
  
  clearErrors() {
    this.setState({
      errorMessage: false
    });
  }

  clearSearchStatus() {
    this.setState({
      searchStatus: false
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
      this.setState({
        searchStatus: "error",
        errorMessage: "Unable to find your location, please try entering your city, state in the box above."
      });
      return;
    } 

    if(this.state.selectedResources.length == 0) {
      this.setState({
        searchStatus: "error",
        errorMessage: "Please select at least one resource type from the dropdown"
      });
      return;
    } 
    
    this.setState({
      searchStatus: 'redirect'
    });
  }

  fetchSearchResults() {
    queryOneDegree
      .addTags(this.state.selectedResources)
      .setLocation(this.state.nearLatLng)
      .fetch({
        callback: (res) => { console.log(res) } 
      });
  }

  parseParams(params) {
    var nearLatLng = null, selectedResources = [];
    if(params.near) {
      var latLng = decodeURIComponent(params.near).split(',')
      nearLatLng = {
        lat: latLng[0],
        lng: latLng[1]
      }
    }

    if(params.for) {
      selectedResources = decodeURIComponent(params.for).split(',');
    }

    return {selectedResources, nearLatLng};
  }

  Routes() {
    return  (
      <Router>
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
            />} />
          <Route path="/resource/:id" component={Resource}/>
        </Switch>
      </Router>
    );
  }

  render() {
    //const { classes } = this.props
    //const { searchArea } = classes;
    const addedProps = this.state;

    return (
      <div className="container--map"> 
        {/* TODO: Adjust this to the Material UI Tab Components for Mobile */}
        <Grid container spacing={0}>
          <Grid item xs={12} md={7}>
            <div className="container--search">
              <Grid container alignItems='center' justify='center' spacing={0} className={this.props.classes.container}>
                <Grid item md={10} lg={9} sm={12}>
                  {this.Routes()}
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={5} >
            {/* Map Component */}
            <GoogleMap/>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default withStyles(styles)(MapContainer);