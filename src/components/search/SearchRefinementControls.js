import React from 'react';

import Grid from 'material-ui/Grid';
import SearchFilters from './SearchFilters';

class SearchRefinementControls extends React.Component {

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={4}>
          <SearchFilters onChange={this.props.handleFilterSelect} selectedFilters={this.props.selectedFilters} />
        </Grid>
      </Grid>
    )
  }
}

export default SearchRefinementControls;