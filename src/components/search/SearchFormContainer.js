import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import SearchForm from './SearchForm';

const styles = theme => ({
  title: {
    marginBottom: '0.7rem'
  },
  subheading: {
    marginBottom: '4rem'
  }
});

class SearchFormContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { title, subheading } = this.props.classes;
    
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography type="title" className={title}>
            Welcome to the AsylumConnect catalog!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography type="subheading" className={subheading}>
            Search for LGBTQ- and asylum-friendly resources near you
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchForm {...this.props} classes={null}/>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles)(SearchFormContainer);
