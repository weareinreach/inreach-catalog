import React from 'react';

import { withStyles } from 'material-ui/styles';
import SearchBar from './SearchBar';
import ResourceListItem from './ResourceListItem';

const styles = theme => ({
  formRow: {
    marginBottom: '2.5rem'
  },
});

class SearchResultsContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
    props.clearSearchStatus();
  }

  render() {
    //this.props.fetchSearchResults();
    return (
      <div>
        <SearchBar {...this.props} classes={null} />
        <ResourceListItem />
      </div>);
  }
    
}


export default withStyles(styles)(SearchResultsContainer);