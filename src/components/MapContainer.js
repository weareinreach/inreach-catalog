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

const styles = (theme) => ({
  searchArea: {
    padding: '2rem',
  }
});

const SearchForm = () => (
  <div>
    <h2>Main Search Form</h2>
  </div>
);
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

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SearchFormContainer}/>
      <Route path="/search/:near/:for/:filter/:sort" component={SearchResultsContainer}/>
      <Route path="/resource/:id" component={Resource}/>
    </Switch>
  </Router>
);

class MapContainer extends React.Component {
  render() {
    const { classes } = this.props
    const { searchArea } = classes;

    return (
      <div className="map-container"> 
        {/* TODO: Adjust this to the Material UI Tab Components for Mobile */}
        <Grid container>
          <Grid item xs={12} md={7}>
            <div className={searchArea}>
              <Routes />
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