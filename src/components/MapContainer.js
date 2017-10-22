import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import SearchFormContainer from './SearchFormContainer';
//require('./MapContainer.scss');

const styles = (theme) => ({
  searchArea: {
    padding: '2rem',
  }
});

const SearchResultsContainer = () => (
  <div>
    <h2>Search Results Form Followed By Search Results</h2>
  </div>
);
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
      searchStatus: false,
      errorMessage: false,
      selectedResources: []
    }


    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
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
    this.setState({
      nearAddress: address,
    })

  }

  handleResourceTypeSelect(event, checked) { 
    var index;
    const target = event.target;
    var selectedResources = this.state.selectedResources.slice();
    
    if(checked && selectedResources.indexOf(target.value) < 0) {
      selectedResources.push(target.value)
      this.setState({
        selectedResources: selectedResources
      });
    } else if(!checked && (index = selectedResources.indexOf(target.value)) >= 0) {
      selectedResources.splice(index, 1)
      this.setState({
        selectedResources: selectedResources
      });
    }
  }

  handleSearchButtonClick() {
    this.clearErrors();
    
    if(this.state.nearAddress == null || this.state.nearAddress == '') {
      this.setState({
        searchStatus: "error",
        errorMessage: "Unable to find your location, please try entering your city, state in the box above."
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