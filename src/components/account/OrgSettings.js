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
    this.state = {
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
  // to-do: load initial Org settings data. Work with Jeremy implement making API call from Node
  componentDidMount(){    
    var jwt = localStorage.getItem("jwt");
    const { affiliation } = this.props;
    const apiDomain = config[process.env.NODE_ENV].odrs;
    const url = `${apiDomain}organizations/${affiliation.fetchable_id}`;
    console.log(url)
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
          response.json().then((res) => {
            console.log(res)
          });
        } else {
          console.log('Unauthorized');
        }
      })
      .catch(error => {
        console.log(error)
        console.log('Oops! Something went wrong.');
      });    
  }
  handleClick(){
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
  // to-do: matching body content with required body from doc
  submitOrgData(){
    const { schedule, info, additional } = this.state
    const { affiliation } = this.props;
    const apiDomain = config[process.env.NODE_ENV].odrs;
    const url = `${apiDomain}/v1/organizations/${affiliation.id}`;
    const body = {
      "website": info.website,
      "description": info.about,
      "updated_at": Date().now,
      "locations": [
          {             
            schedule
          }
      ],
      "phones": [
          {
              "id": 4,
              "digits": info.phone
          }
      ]
    }
    console.log(body)
    // const options = {
    //   method: 'PUT',
    //   headers: {
    //     Authorization: 'Basic ZGVtbzoxNm1pc3Npb24=',
    //     'Content-Type': 'application/json',
    //     OneDegreeSource: 'asylumconnect',
    //   },
    //   body:  JSON.stringify(body)
    // };
    // fetch(url, options)
    //   .then(response => {
    //     if (response.status === 200) {
    //       response.json().then((res) => {
    //         console.log(res)
    //       });
    //     } else {
    //       console.log('Unauthorized');
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     console.log('Oops! Something went wrong.');
    //   });    
    console.log(this.state)
    console.log('let s fetch')
    this.setState({isInitial: true})
  }
  // to-do: make sure each OrgSetting component can serve both parent Suggestion and OrgSetting
  // Suggestion does not have initial data to load
  // OrgSetting does have initial data to load
  render() {
    console.log(this.props)
    const { classes } = this.props;
    const { isInfoRequested, isScheduleRequested , isAdditionalRequested } = this.state;
    return (
      <div className={classes.root}>
        <Typography type='display3' className={classes.formType}>Your Organization</Typography>
        <OrgSettingsInfo isRequested={isInfoRequested} handleCollectInfoData={this.collectInfoData}/>
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