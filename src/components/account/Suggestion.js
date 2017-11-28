import React from 'react';
import PropTypes from 'prop-types';

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
      tags: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
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
  handleChange(parent, name, value){
    const { orgData } = this.state;
    let updatedOrgData;
    if (parent === 'schedule') {
      updatedOrgData = update(orgData, {locations: { 0: {schedule: {$merge:{[name]: value}} }}})
      this.setState({ orgData: updatedOrgData })
    } else if (parent === 'address') {
      updatedOrgData = update(orgData, {locations: { 0: {$merge:{[name]: value}} }})
      this.setState({ orgData: updatedOrgData })
    } else if (parent === 'phones'){
      updatedOrgData = update(orgData, {locations: { 0: {phones: { 0: {$merge:{[name]: value}} }}}})
      this.setState({ orgData: updatedOrgData })
    } else {
      updatedOrgData = update(orgData,{$merge:{[name]: value}})
      this.setState({ orgData: updatedOrgData })
    }
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
    const {orgData, selectedDays} = this.state;
    const {user, handleMessageNew} = this.props;
    // Remove unselected time in schedule object
    let { schedule } = orgData.locations[0]
    let updatedOrgData;
    for (let timeKey in schedule ) {
      let day = timeKey.split('_')[0]
      if (!selectedDays[day]){
        schedule = update(schedule,{$merge:{[timeKey]: ''}})
      }
    }
    updatedOrgData = update(orgData, {locations: { 0: {schedule: {$merge: schedule} }}})
    console.log(updatedOrgData)
    // Submit
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
    const { user, selectedDays, isSent } = this.state;
    const feature = ''
    const requirement = ''
    const additionalInfo = ''
    console.log(defaultSchedule)
    return (
      <div className={classes.root}>
      {user? (
        <div>
          <Typography type="display2" className={classes.formType}>Suggest New Resource</Typography>
          <Typography type='body1'>
            Thank you for your interest in contributing to the AsylumConnect resource catalog! Use this form to suggest a resource you think should be included. It's ok if you do not have all of the information the form asks for - just fill in what you know, and we'll do the rest! We appreciate your submission and thank you for helping to connect asylum seekers to helpful services. All suggested resources are subject to review by AsylumConnect staff before being published.
          </Typography>
          <SuggestInfo onChange={this.handleChange}/>

          <SuggestHour 
            schedule={defaultSchedule}
            selectedDays={selectedDays}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            />

          <SuggestAdditional
            feature={feature}
            requirement={requirement}
            additionalInfo={additionalInfo}
            handleTagSelect={this.handleTagSelect}
            selectedTags={this.state.tags}
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