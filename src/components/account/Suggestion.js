import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update'; 

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import SuggestInfo from './SuggestInfo';
import SuggestHour from './SuggestHour';
import SuggestAdditional from './SuggestAdditional';

import AsylumConnectButton from '../AsylumConnectButton';

import 'whatwg-fetch';
import config from '../../config/config.js';

const styles = theme => ({
  root: {
    padding: '0 15% 0 15%'
  },
  formType: {
    margin: '5% 0 5% 0'
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

const defaultSchedule = {
  monday_start: '',  monday_end: '',
  tuesday_start: '',  tuesday_end: '',
  wednesday_start: '',  wednesday_end: '',
  thursday_start: '',  thursday_end: '',
  friday_start: '',  friday_end: '',
  saturday_start: '',  saturday_end: '',
  sunday_start: '',  sunday_end: '',
  notes:''
}

const defaultResource = {
  "name": "",
  "website": "",
  "region": "",
  "description": "",
  "tags": [],
  "emails":[
    {
      "title": "",
      "first_name": "",
      "last_name": "",
      "email": "",
    }
  ],
  "properties": [
      {
          "name": "approval-asylumconnect",
          "value": "false"
      }
  ],
  "locations": [
      {
          "name": "",
          "address": "",
          "unit": "",
          "city": "",
          "state": "",
          "zip_code": "",
          "is_primary": true,
          "phones": [
              {
                  "digits": "",
                  "phone_type": "Office",
                  "is_primary": true
              }
          ],
          "schedule": {
              "monday_start": "",
              "monday_end": "",
              "tuesday_start": "",
              "tuesday_end": "",
              "wednesday_start": "",
              "wednesday_end": "",
              "thursday_start": "",
              "thursday_end": "",
              "friday_start": "",
              "friday_end": "",
              "saturday_start": "",
              "saturday_end": "",
              "sunday_start": "",
              "sunday_end": "",
              "notes": ""
          }
      }
  ],
  "phones": [
      {
          "digits": "",
          "phone_type": "Office",
          "is_primary": true
      }
  ]
}

class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:null,
      affiliation: null,
      isSent:false,
      selectedDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      resourceData: defaultResource,
      nonEngServices: [],
      address: '',
      feature: [],
      requirement: []
    }
    this.handleChangeGeneralInfo = this.handleChangeGeneralInfo.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleSelectAddress = this.handleSelectAddress.bind(this)
    this.handleSelectNonEngServices = this.handleSelectNonEngServices.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChangeSchedule = this.handleChangeSchedule.bind(this)
    this.handleTagSelect = this.handleTagSelect.bind(this);
  }
  componentDidMount(){
    const jwt = localStorage.getItem('jwt')
    const { handleMessageNew } = this.props
    // detect if user is authorized
    if (jwt) {
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
              // user is authorized              
              this.setState({user: user, affiliation: user.affiliation})
            });
          } else {
            handleMessageNew('Your email or password is incorrect.');
          }
        })
        .catch(error => {
          console.log('Oops! Something went wrong.');
        });
    } else {
      // if user not sign in, redirect asking to sign in
      this.setState({user:null})
    }
  }
  handleChangeGeneralInfo(name, value){
    const { resourceData } = this.state;
    let updatedResourceData;
    updatedResourceData = update(resourceData, {$merge:{[name]: value}})
    this.setState({ resourceData: updatedResourceData })
  }
  handleChangePhone(name, value){
    console.log(name, value)
    const { resourceData } = this.state;
    let updatedResourceData1, updatedResourceData2;
    updatedResourceData1 = update(resourceData,{phones: {0: {$merge:{[name]: value}}}})
    updatedResourceData2 = update(updatedResourceData1,{locations: { 0: {phones: {0: {$merge:{[name]: value}}}}}})
    console.log(updatedResourceData2)
    this.setState({ resourceData: updatedResourceData2 })
  }
  handleSelectAddress(address){
    const { resourceData } = this.state;
    let updatedResourceData;
    this.setState({address})
    const locationItems = address.split(',')
    const stateZipcode = locationItems[2] ? locationItems[2].trim().split(' '): ''
    if (stateZipcode.length > 1) {
      locationItems[4] = stateZipcode[0]
      locationItems[5] = stateZipcode[1]
    } else {
      locationItems[4] = stateZipcode[0]
      locationItems[5] = ''
    }
    console.log(stateZipcode)
    updatedResourceData = update(resourceData, 
      {locations : 
        { 0: 
          {
            address: {$set: locationItems[0] ? locationItems[0].trim(): ''},
            city: {$set: locationItems[1] ? locationItems[1].trim(): ''},
            state: {$set: locationItems[4]},
            zip_code: {$set: locationItems[5]}
          },
        }
      }
    )
    console.log(updatedResourceData)
    this.setState({resourceData: updatedResourceData})
  }
  handleSelectNonEngServices(action, nonEngService, index){
    const { resourceData, nonEngServices } = this.state
    let updatedNonEngServices, requestService, updatedResourceData;
     
    if (action=='add'){
      // Add selected service to nonEngServices state
      updatedNonEngServices = update(nonEngServices, {$push: [nonEngService]})
      // Add selected service to request resource Data
      requestService = {'name':'lang-' + nonEngService.split(' ').join('-'), 'value': 'true'}
      updatedResourceData = update(resourceData, {properties: {$push:[requestService]}})
    } else {
      // Remove selected service from nonEngServices
      updatedNonEngServices = update(nonEngServices, {$splice: [[index,1]]})      
      // Remove select service from request resourceData
      requestService = 'lang-' + nonEngService.split(' ').join('-')
      // Find index of the select service in resourceData.properties array
      let indexResource = resourceData.properties.findIndex(p => p.name == requestService)
      if (indexResource >= 0) {
        updatedResourceData = update(resourceData, {properties: {$splice: [[indexResource,1]]}})
      }      
    }
    this.setState({nonEngServices: updatedNonEngServices, resourceData: updatedResourceData})
    
    
  }
  handleSelect(select, value, startValue, endValue) {
    const { selectedDays } = this.state;
    let updatedSelectedDays;
    if (select === 'select') {
      updatedSelectedDays = update(selectedDays,{$merge:{[value]: !selectedDays[value]}})
    } else {
      updatedSelectedDays = update(selectedDays,{$merge:{[value.split('_')[0]]: true}})
    }
    this.setState({ selectedDays: updatedSelectedDays})
  }
  handleChangeSchedule (name, value) {
    const { resourceData } = this.state;
    let updatedResourceData = update(resourceData, {locations: { 0: {schedule: {$merge: { [name]:value }}}}})
    console.log(updatedResourceData)
    this.setState({ resourceData: updatedResourceData})
  }
  handleTagSelect(event, checked) {
    var index;
    const target = event.target;
    var selectedResourceTypes = this.state.tags.slice();
    
    if(checked && selectedResourceTypes.indexOf(target.value) < 0) {
      selectedResourceTypes.push(target.value)
      this.setState({
        tags: selectedResourceTypes
      });
    } else if(!checked && (index = selectedResourceTypes.indexOf(target.value)) >= 0) {
      selectedResourceTypes.splice(index, 1)
      this.setState({
        tags: selectedResourceTypes
      });
    }
  }

  handleClick(){
    const {resourceData, selectedDays} = this.state;
    const {user, handleMessageNew} = this.props;
    // Remove unselected time in schedule object
    let { schedule } = resourceData.locations[0]
    let updatedResourceData;
    for (let timeKey in schedule ) {
      let day = timeKey.split('_')[0]
      if (!selectedDays[day]){
        schedule = update(schedule,{$merge:{[timeKey]: ''}})
      }
    }
    updatedResourceData = update(resourceData, {locations: { 0: {schedule: {$merge: schedule} }}})
    // Submit
    const payload = {
      "api_key": config[process.env.OD_API_ENV].odApiKey,
      "submission": {
        "resource_id": 0,
        "resource_type": "Organization",
        "client_user_id": client_user_id,
        "content": JSON.stringify(updateResourceData),
        "submitter_type": "PublicForm"
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
        this.setState({isSent: true})
        handleMessageNew('Your information has been submitted for reviewing.');
      } else {
        handleMessageNew('Oops! Something went wrong.');
      }
    })
  }

  render() {
    const { classes } = this.props;
    const { user, selectedDays, isSent, resourceData, nonEngServices, address, features, requirements } = this.state;
    const { name, website, locations, description, emails, phones, properties, tags } = resourceData;
    console.log(resourceData)
    return (
      <div className={classes.root}>
      {user? (
        <div>
          <Typography type="display2" className={classes.formType}>Suggest New Resource</Typography>
          <Typography type='body1'>
            Thank you for your interest in contributing to the AsylumConnect resource catalog! Use this form to suggest a resource you think should be included. It's ok if you do not have all of the information the form asks for - just fill in what you know, and we'll do the rest! We appreciate your submission and thank you for helping to connect asylum seekers to helpful services. All suggested resources are subject to review by AsylumConnect staff before being published.
          </Typography>
          <SuggestInfo 
            digits={phones[0].digits}
            description={description}
            address={address}
            website={website}
            name={name}
            email={emails[0].email}
            nonEngServices={nonEngServices}
            handleChangeGeneralInfo={this.handleChangeGeneralInfo}
            handleChangePhone={this.handleChangePhone}
            handleSelectAddress={this.handleSelectAddress}
            handleSelectNonEngServices={this.handleSelectNonEngServices}/>

          <SuggestHour 
            schedule={defaultSchedule}
            selectedDays={selectedDays}
            handleChange={this.handleChangeSchedule}
            onSelect={this.handleSelect}
            />

          <SuggestAdditional
            features={features}
            requirements={requirements}
            handleTagSelect={this.handleTagSelect}
            selectedTags={tags}
          />
        
        {!isSent  ? (
          <div>
            <AsylumConnectButton variant='primary' onClick={this.handleClick}>suggest resource</AsylumConnectButton>
            <Typography type='body1' className={classes.extraMargin}>All organization changes are subject to review by AsylumConnect before publication</Typography>
          </div>
        ):(
          <div className={classes.settingsTypeFont}>
            <span>Thank you for your request! All changes will be review by the AsylumConnect team and verification permitting, published as soon as possible. Question? Please email <a href="mailto:catalog@asylumconnect.org" className={classes.boldFont}>catalog@asylumconnect.org</a>.</span>
          </div>
        )}
        </div>
      ):('')}        
      </div>
    )
  }
}

Suggestion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestion);