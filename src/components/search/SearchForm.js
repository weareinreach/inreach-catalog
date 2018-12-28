import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Fa from 'react-fontawesome';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

import { Link } from 'react-router-dom';

import AsylumConnectButton from '../AsylumConnectButton';
import SearchBar from './SearchBar';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';

const styles = theme => ({
  formRow: {
    marginBottom: '1.5rem'
  },
  callout: {
    color: theme.palette.secondary[500]
  },
  underline: {
    textDecoration: 'underline'
  },
  [theme.breakpoints.down('sm')]: {
    searchButton: {
      textAlign: "center"
    },
    body2: {
      color: theme.palette.common.white
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'underline'
    }
  }
});

class SearchForm extends React.Component {
  render() {
    const { formRow, searchButton, body2, link, callout, underline } = this.props.classes;
    const variant = this.props.width < breakpoints['sm'] ? "primary" : "secondary";
    return (
      <div>
        <Grid container spacing={0} >
          <Grid item xs={12} className={formRow}>
            <Typography type="body2" className={body2+' '+callout}>
              Are you in Mexico waiting to seek LGBTQ asylum in the U.S.? <a href="/page/Mexico/#googtrans(es)" className={link+' '+callout+' '+underline}>Click here.</a>
            </Typography>
          </Grid>
          <Grid item xs={12} className={formRow}>
            <Typography type="body2" className={body2}>
              Are you outside of the United States and Canada? <Link to="/page/outside-US-and-Canada" className={link}>Click here.</Link>
            </Typography>
          </Grid>
        </Grid>
        <SearchBar {...this.props} classes={null} />
        <Grid container spacing={0}>
          {/*<Grid item xs={12} className={formRow}>
            <Typography type="body2" className={body2}>
              Are you outside of the United States and Canada? <Link to="/page/outside-US-and-Canada" className={link}>Click here.</Link>
            <FormControlLabel
              control={
                <Checkbox
                  value="checkedA"
                />
              }
            label="Include remote resources"
            className={formRow}
            />
            </Typography>
          </Grid>*/}
          <Grid item xs={12} className={searchButton}>
            <AsylumConnectButton variant={variant} onClick={this.props.handleSearchButtonClick} disabled={this.props.searchDisabled}>
              Search
              {this.props.searchDisabled ? <Fa name="spinner" spin style={{marginLeft: "0.5rem"}} /> : null}
            </AsylumConnectButton>
          </Grid>
        </Grid>
        
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(SearchForm));
