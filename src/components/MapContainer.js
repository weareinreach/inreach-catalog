import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import SearchFormContainer from './SearchFormContainer';
//require('./MapContainer.scss');

const styles = (theme) => ({
  searchArea: {
    padding: '2rem',
  }
});

const SearchResultsContainer = ( props ) => {
  console.log(props);
  return (
    <div>
      <h2>Search Results Form Followed By Search Results</h2>
    </div>
  );
}
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
    this.state = {
      nearAddress: '',
      nearLatLng: null,
      searchStatus: false,
      errorMessage: false,
      selectedResources: []
    }


    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handlePlaceChange = this.handlePlaceChange.bind(this)
    this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
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
          <Route path="/search/:near/:for/:filter/:sort" component={SearchResultsContainer}/>
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
              {this.Routes()}
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