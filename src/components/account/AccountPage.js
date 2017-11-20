import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import OrgSettings from './OrgSettings';
import GeneralSettings from './GeneralSettings';

import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import fetch from 'node-fetch';
import config from '../../config/config.js';

import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

const styles = theme => ({
  root: {
    padding: '5% 0 5% 0',
    marginBottom: '70px',
    display: 'flex',
    flexDirection: 'column',
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]:{
    root: {
      padding: '5% 10%',
    },
    marginBottom: {
      marginBottom: '5%'
    }
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  textAlignCenter: {
    textAlign: 'center'
  }
});

function TabContainer(props) {
  return <div style={{ marginTop: 50 }}>{props.children}</div>;
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isAuthenticated: false,
      user: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    var jwt = localStorage.getItem("jwt");
    const {handleMessageNew, handleLogout} = this.props;
    
    if (!jwt) {
      this.props.history.push('/');
      handleMessageNew('You need to log in to view your account.')
    } else {
      const apiDomain = config[process.env.OD_API_ENV].odas;
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
            this.setState({ isAuthenticated: true, user: user });
          });
        } else {
          this.setState({ isAuthenticated: false })
          handleLogout()
          handleMessageNew('Sorry, please try logging in again');
        }
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong. Error:' + error);
      });
    }   
  }
  handleChange(event, value){
    this.setState({ value });
  };
  render() {
    const { classes, handleMessageNew } = this.props;
    const { isAuthenticated, user, value } = this.state;
    const isMobile = this.props.width < breakpoints['sm'];
    let settings;
    if (isAuthenticated && user.affiliation) {
      console.log(user.affiliation)
      settings = isMobile ? (
        <div>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary"
              fullWidth>
              <Tab label="Your Account" />
              <Tab label="Your Org" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><GeneralSettings handleMessageNew={handleMessageNew} user={user}/></TabContainer>}
          {value === 1 && <TabContainer><OrgSettings handleMessageNew={handleMessageNew} user={user}/></TabContainer>}
        </div>
      ):(
        <div>
          <Typography type="display2" className={classes.textAlignCenter}>Organization</Typography>
          <div className={classes.formRow}>
            <OrgSettings handleMessageNew={handleMessageNew} user={user}/>
            <GeneralSettings handleMessageNew={handleMessageNew} user={user}/>
          </div>
        </div>
      )
    } else if (isAuthenticated && !user.affiliation){
      settings = (
        isMobile ? (
          <div>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} indicatorColor="primary"
                fullWidth>
                <Tab label="Your Account" />
                <Tab label="Your Org" disabled />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><GeneralSettings handleMessageNew={handleMessageNew} user={user}/></TabContainer>}
          </div>
        ):(
        <div>
          <Typography type="display2" className={classes.textAlignCenter}>Organization</Typography>
          <div className={classes.formRow}>
            <GeneralSettings handleMessageNew={handleMessageNew} user={user}/>
          </div>
        </div>
        )
      )
    } else {
      settings = (
        <div>Hello! You need to log in and refresh the page.</div>
      )
    }
    return (
      <div className={classes.root}>
        <Typography type="display1" className={[classes.marginBottom, classes.textAlignCenter].join(' ')}>Your Account</Typography>
        {settings}
      </div>
  )}
}

AccountPage.propTypes = {
};

export default withStyles(styles)(withWidth(AccountPage));
