import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import OrgSettingsInfo from './OrgSettingsInfo';
import OrgSettingsHour from './OrgSettingsHour';
import OrgSettingsAdditional from './OrgSettingsAdditional';

import AsylumConnectButton from '../AsylumConnectButton';

import fetch from 'node-fetch';
import config from '../../config/config.js';

const styles = theme => ({
  root: {
    width: '43%',
    padding: '0 5% 0 5%'
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  extraMargin: {
    margin: '20px 0 20px 0'
  },
  settingsTypeFont: {
    marginRight: '20px',
    lineHeight: '1.6',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    color: theme.palette.common.lightBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
});

class OrgSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:null,
      affiliation: null,
      affiliation: null,
      isInitial: true,
      isScheduleRequested: false,
      isInfoRequested: false,
      isAdditionalRequested: false,
      schedule: null,
      info: null,
      additional: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.collectHourData = this.collectHourData.bind(this)
    this.collectInfoData = this.collectInfoData.bind(this)
    this.submitOrgData = this.submitOrgData.bind(this)
  }
  handleClick(){
    const jwt = localStorage.getItem('jwt')
    console.log(jwt)
    // if user already signed in
    if (jwt) {
      // get affiliation
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
              // setState affiliation
              
              this.setState({user: user, affiliation: user.affiliation})
            });
          } else {
            console.log('Unauthorized');
          }
        })
        .catch(error => {
          console.log('Oops! Something went wrong.');
        });
    } else {
      // if user not sign in
      this.setState({user:null})
    }
    // start collecting data
    this.setState({isInitial: false, isScheduleRequested: true, isInfoRequested: true})
    
  }
  collectHourData(schedule){
    this.setState({schedule})    
  }
  collectInfoData(info){
    this.setState({info})    
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.schedule !== this.state.schedule && prevState.isScheduleRequested){  
      this.setState({isScheduleRequested:false})
    } else if (prevState.info !== this.state.info && prevState.isInfoRequested){  
      this.setState({isInfoRequested:false})
    } else if (prevState.additional !== this.state.additional && prevState.isAdditionalRequested){  
      this.setState({isAdditionalRequested:false})
    } else if(!this.state.isScheduleRequested && 
              !this.state.isInfoRequested && 
              !this.state.isAdditionalRequested &&
              !this.state.isInitial) {
      this.submitOrgData();
    }
  }
  submitOrgData(){
    // if user signed in
    const {user} = this.state;
    console.log(this.state)
    const client_user_id = user ? user.id : 0
    const {info, schedule, additional} = this.state;
    
    const content = {
      "name": info.name,
      "website": info.website,
      "region": info.region,
      "description": info.description,
      "tags": [
      ],
      "properties": [
        {
            "name": "approval-asylumconnect",
            "value": "false"
        },
        {
            "name": "source-name",
            "value": "asylumconnect"
        },
        {
            "name": "community-asylum-seeker",
            "value": "true"
        },
        {
            "name": "community-lgbt",
            "value": "true"
        }
      ],
      "locations": [
          {
              "name": "Primary Location",
              "address": info.address,
              "unit": '',
              "city": info.city,
              "state": info.state,
              "zip_code": info.zip_code,
              "is_primary": true,
              "phones": [
                  {
                      "digits": info.phone,
                      "phone_type": "Office",
                      "is_primary": true
                  }
              ],
              "schedule": schedule
          }
      ],
      "phones": [
          {
              "digits": info.phone,
              "phone_type": "Office",
              "is_primary": true
          }
      ]
    }
    const payload = {
      "api_key": config[process.env.OD_API_ENV].odApiKey,
      "submission": {
        "resource_id": 0,
        "resource_type": "Organization",
        "client_user_id": client_user_id,
        "content": JSON.stringify(content),
        "submitter_type": "PublicForm"
      }
    }
    console.log(payload)
    console.log(content)
    fetch(window.location.origin+'/api/submissions', 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }      
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error)
    })
    console.log('let s fetch')
    this.setState({isInitial: true})
  } 
  
  render() {
    const { classes } = this.props;
    const { isInfoRequested, isScheduleRequested , isAdditionalRequested } = this.state;
    return (
      <div className={classes.root}>
        <Typography type='display3' className={classes.formType}>Your Organization</Typography>
        <OrgSettingsInfo isRequested={isInfoRequested} handleCollectInfoData={this.collectInfoData} isSuggestion={true}/>
        <OrgSettingsHour isRequested={isScheduleRequested} handleCollectHourData={this.collectHourData}/>
        <OrgSettingsAdditional isRequested={isAdditionalRequested}  handleCollectAdditionalData={this.collectAdditionaldata}/>
        <AsylumConnectButton variant='primary' onClick={this.handleClick}>request change</AsylumConnectButton>
        <Typography type='body1' className={classes.extraMargin}>All organization changes are subject to review by AsylumConnect before publication</Typography>
        <div className={classes.settingsTypeFont}>
          <span>Thank you for your request! All changes will be review by the AsylumConnect team and verification permitting, published as soon as possible. Question? Please email <a>catalog@asylumconnect.org</a>.</span>
        </div>
      </div>
    )
  }
}

OrgSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgSettings);