import React from 'react';

import Typography from 'material-ui/Typography';
import SearchForm from './SearchForm';

class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props)
    //this.state = { dialog: 'none' };
  }

  render() {
    return (
      <div>
        <Typography type="title">
          Welcome to the AsylumConnect catalog!
        </Typography>
        <Typography type="subheading">
          Search for LGBTQ- and asylum-friendly resources near you
        </Typography>
        <SearchForm />
      </div>
    );
  }
};

export default SearchFormContainer;
