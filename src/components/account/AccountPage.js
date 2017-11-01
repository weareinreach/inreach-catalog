import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import OrgSettings from './OrgSettings';
import GeneralSettings from './GeneralSettings';

import Typography from 'material-ui/Typography';

import fetch from 'node-fetch';
import config from '../../config/config.js';

const styles = theme => ({
  root: {
    padding: '5% 0 5% 0',
    display: 'flex',
    flexDirection: 'column',
    '& > h1': {
      textAlign: 'center'  
    }
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  }
});

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliation: null
    }
  }
  componentDidMount(){
    var jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      console.log("There is no available jwt");
      return
    }
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}/api/account/affiliation`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: jwt,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      }
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 200) {
          response.json().then(({affiliation}) => {
              this.setState({ affiliation })
          });
        } else {
          console.log('Unauthorized');
        }
      })
      .catch(error => {
        console.log('Oops! Something went wrong.');
      });
  }
  render() {
    const { classes } = this.props;
    const { affiliation } = this.state;
    return (
      <div className={classes.root}>
        <Typography type="display1">Your Account</Typography>
        <Typography type="display2">Organization</Typography>
        <div className={classes.formRow}>
        { affiliation ? (
          <OrgSettings />
        ):('')}          
          <GeneralSettings />
        </div>
      </div>
  )}
}

AccountPage.propTypes = {
};

export default withStyles(styles)(AccountPage);
