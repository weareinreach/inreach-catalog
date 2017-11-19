import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

import AsylumConnectButton from '../AsylumConnectButton';
import SearchBar from './SearchBar';
import SearchStatusHandler from './SearchStatusHandler';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';

const styles = theme => ({
  formRow: {
    marginBottom: '2.5rem'
  },
  [theme.breakpoints.down('sm')]: {
    searchButton: {
      textAlign: "center"
    }
  }
});

class SearchForm extends React.Component {
  render() {
    const { formRow, searchButton } = this.props.classes;
    const variant = this.props.width < breakpoints['sm'] ? "primary" : "secondary";
    return (
      <div>
        <SearchStatusHandler {...this.props} />
        <SearchBar {...this.props} classes={null} />
        <Grid container spacing={0}>
          <Grid item xs={12} className={formRow}>
            {/*<FormControlLabel
              control={
                <Checkbox
                  value="checkedA"
                />
              }
            label="Include remote resources"
            className={formRow}
            />*/}
          </Grid>
          <Grid item xs={12} className={searchButton}>
            <AsylumConnectButton variant={variant} onClick={this.props.handleSearchButtonClick} >
              Search
            </AsylumConnectButton>
          </Grid>
        </Grid>
        
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(SearchForm));
