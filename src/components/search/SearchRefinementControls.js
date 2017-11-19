import React from 'react';

import Grid from 'material-ui/Grid';
import SearchFilterSelector from './SearchFilterSelector';
import SearchOrderSelector from './SearchOrderSelector';

class SearchRefinementControls extends React.Component {

  render() {
    return (
      <Grid container spacing={0} style={{marginBottom: '1.5rem'}}>
        <Grid item xs={12} md={8} >
          <SearchFilterSelector onChange={this.props.handleFilterSelect} selectedFilters={this.props.selectedFilters} />
          <SearchOrderSelector onChange={this.props.handleSortSelect} selectedSort={this.props.selectedSort} />
        </Grid>
      </Grid>
    )
  }
}

export default SearchRefinementControls;