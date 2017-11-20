import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import { withStyles } from 'material-ui/styles';
import breakpoints from '../../theme/breakpoints';
import Typography from 'material-ui/Typography';

import OrgSettingsInfo from './OrgSettingsInfo';
import OrgSettingsHour from './OrgSettingsHour';
import OrgSettingsAdditional from './OrgSettingsAdditional';

import AsylumConnectButton from '../AsylumConnectButton';

import fetch from 'node-fetch';
import config from '../../config/config.js';
import fetchJsonp from 'fetch-jsonp';

const styles = theme => ({
  root: {
    width: '43%',
    padding: '0 5% 0 5%'
  },
  formType: {
    marginTop: '10%'
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]:{
    root: {
      width: 'auto',
      padding: '0'
    },
    formType: {
      margin: '2% 0 2% 0'
    }
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
  note: {
    backgroundColor: '#fff3c6',
    padding: '10px',
    marginTop: '10px'
  }
});

const defaultSchedule = {
  monday_start: '', monday_end: '',
  tuesday_start: '', tuesday_end: '',
  wednesday_start: '', wednesday_end: '',
  thursday_start: '', thursday_end: '',
  friday_start: '', friday_end: '',
  saturday_start: '', saturday_end: '',
  sunday_start: '', sunday_end: '',
}

class OrgSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitial: true,
      isScheduleRequested: false,
      isInfoRequested: false,
      isAdditionalRequested: false,
      isPendingSubmission: false,
      orgData: null,
      schedule: null,
      info: null,
      additional: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.collectHourData = this.collectHourData.bind(this)
    this.collectInfoData = this.collectInfoData.bind(this)
    this.submitOrgData = this.submitOrgData.bind(this)
  }

  componentDidMount(){    
    var jwt = localStorage.getItem("jwt");
    const { user } = this.props;
    const apiDomain = config[process.env.OD_API_ENV].odrs;
    const url = `${apiDomain}organizations/${user.affiliation.fetchable_id}.jsonp?`;
    const apiKeyParam = `api_key=${config[process.env.OD_API_ENV].odApiKey}`;
    
    fetchJsonp(url + apiKeyParam)
      .then(response => response.json())
      .then(orgData => {
        console.log(orgData)
        let isPendingSubmission = orgData.has_pending_submission
        let info = {
          name: orgData.name,
          description: orgData.description,
          website: orgData.website,
          address: orgData.locations ? orgData.locations[0].address:'',
          region: orgData.region,
          city: orgData.locations? orgData.locations[0].city:'',
          state: orgData.locations? orgData.locations[0].state:'',
          phone: orgData.phones ? orgData.phones[0].digits : '',
        };
        let schedule = orgData.locations && orgData.locations[0].schedule ? orgData.locations[0].schedule : defaultSchedule;
        let additional = {
          resource: orgData.tag
        }
        this.setState({ orgData, isPendingSubmission, info, schedule, additional})
      })
      .then(error => {
        console.log(error)
      })
  }

  handleClick(){
    // start collecting data
    this.setState({isInitial: false, isScheduleRequested: true, isInfoRequested: true})    
  }
  collectHourData(schedule){
    this.setState({schedule})
    this.setState({isScheduleRequested:false})
  }
  collectInfoData(info){
    this.setState({info})
    this.setState({isInfoRequested:false})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.schedule !== this.state.schedule && prevState.isScheduleRequested){  
      this.setState({isScheduleRequested:false})
    } else if (prevState.info !== this.state.info && prevState.isInfoRequested){  
      this.setState({isInfoRequested:false})
    } else if (prevState.additional !== this.state.additional && prevState.isAdditionalRequested){  
      this.setState({isAdditionalRequested:false})
    } else if(
              !this.state.isScheduleRequested && 
              !this.state.isInfoRequested && 
              !this.state.isAdditionalRequested &&
              !this.state.isInitial) {
      this.submitOrgData();
    }
  }
  submitOrgData(){
    const {orgData, info, schedule, additional} = this.state;
    const {user} = this.props;
    const content = {
      "name": orgData.name,
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
              "unit": orgData.locations[0].unit,
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
        "resource_id": orgData.id,
        "resource_type": "Organization",
        "client_user_id": user.id, // Arbitrary
        "content": JSON.stringify(content),
        "submitter_type": "PublicForm"  // Arbitrary
      }
    }
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
        console.log('Submitted')
        return response.json()
      }      
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error)
    })
    this.setState({isInitial: true})
  }
  render() {
    const { classes } = this.props;
    const { isInfoRequested, isScheduleRequested , isAdditionalRequested, isPendingSubmission, info, schedule, additional } = this.state;
    return (
      <div className={classes.root}>
        <Typography type="display3" className={classes.formType}>Your Organization</Typography>
        {isPendingSubmission? (
          <div className={classes.note}><Typography type='body1'>We are still reviewing your recent edits. Below reflects your latest changes, and once we confirm them, they will be live on the site in 1-3 days.</Typography></div>
        ):('')}
        {info? (
          <OrgSettingsInfo initialData={info} isRequested={isInfoRequested} handleCollectInfoData={this.collectInfoData}/>
          ):(' ')
        }
        {schedule? (
          <OrgSettingsHour initialData={schedule} isRequested={isScheduleRequested} handleCollectHourData={this.collectHourData}/>
          ):(' ')
        }
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

// 
// {additional? (
//   <OrgSettingsAdditional isRequested={isAdditionalRequested}  handleCollectAdditionalData={this.collectAdditionaldata}/>
// ):(' ')
// } 