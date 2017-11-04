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
      isAuthenticated: false,
      affiliation: null
    }
  }
  componentDidMount(){
    var jwt = localStorage.getItem("jwt");
    const {handleMessageNew} = this.props;
    
    if (!jwt) {
      handleMessageNew('You need to log in to view your account.')
    } else {
      const apiDomain = config[process.env.NODE_ENV].odas;
      const url = `${apiDomain}api/user`;    
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
          response.json().then(({user}) => {
            this.setState({ isAuthenticated: true });
            if (user.affiliation){
              this.setState({ affiliation: user.affiliation })
            }
          });
        } else {
          this.setState({ isAuthenticated: false })
          handleMessageNew('Sorry, please try logging in again');
        }
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong. Error:' + error);
      });
    }   
  }
  render() {
    const { classes, handleMessageNew } = this.props;
    const { isAuthenticated, affiliation } = this.state;
    let settings;
    if (isAuthenticated && affiliation) {
      settings = (
        <div className={classes.formRow}>
          <OrgSettings handleMessageNew={handleMessageNew} affiliation={affiliation}/>        
          <GeneralSettings handleMessageNew={handleMessageNew}/>
        </div>
      )
    } else if (isAuthenticated && !affiliation){
      settings = (
        <div className={classes.formRow}>
          <GeneralSettings handleMessageNew={handleMessageNew}/>
        </div>
      )
    } else {
      settings = (
        <div>Hello! You need to log in and refresh the page.</div>
      )
    }
    return (
      <div className={classes.root}>
        <Typography type="display1">Your Account</Typography>
        <Typography type="display2">Organization</Typography>
        {settings}
      </div>
  )}
}

AccountPage.propTypes = {
};

export default withStyles(styles)(AccountPage);
