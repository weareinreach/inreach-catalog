import React from 'react';
import MaskedInput from 'react-text-mask';
import update from 'react-addons-update';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Radio from 'material-ui/Radio';

import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import AsylumConnectCheckbox from '../AsylumConnectCheckbox';

function TextMaskCustom(props) {
  return (
    <MaskedInput
      {...props}
      mask={[/[0-1]/,/[0-9]/,':',/[0-5]/, /[0-9]/ ,'-',/[0-1]/,/[0-9]/,':',/[0-5]/, /[0-9]/ ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const styles = theme => ({
  root: {
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > div': {
      margin: '15px 0 15px 0',
    },
    '& label': {
      width: '30%'
    }
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: 0,
      width: '70%',
      '& input': theme.custom.inputText
    },
    
  },
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    letterSpacing: "-.02em",
    color: theme.palette.primary[500],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  }
});

class OrgSettingsHour extends React.Component {
  constructor(props) {
    super(props);
    const {initialData} = this.props
    this.state = {
      open: true,
      monday: (initialData && (initialData.monday_start || initialData.monday_end))? true:false,
      tuesday: (initialData && (initialData.tuesday_start || initialData.tuesday_end))? true:false,
      wednesday: (initialData && (initialData.wednesday_start || initialData.wednesday_end))? true:false,
      thursday: (initialData && (initialData.thursday_start || initialData.thursday_end))? true:false,
      friday: (initialData && (initialData.friday_start || initialData.friday_end))? true:false,
      saturday: (initialData && (initialData.saturday_start || initialData.saturday_end))? true:false,
      sunday: (initialData && (initialData.sunday_start || initialData.sunday_end))? true:false,
      hourTextMask: '  :  -  :  ',
      hourData: {        
        monday: initialData.monday_start + initialData.monday_end,        
        tuesday:  initialData.tuesday_start + initialData.tuesday_end ,        
        wednesday:  initialData.wednesday_start + initialData.wednesday_end ,  
        thursday:  initialData.thursday_start + initialData.thursday_end ,   
        friday:  initialData.friday_start + initialData.friday_end ,        
        saturday:  initialData.saturday_start + initialData.saturday_end ,  
        sunday:  initialData.sunday_start + initialData.sunday_end ,
      }      
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this)
    this.handleToggleDay = this.handleToggleDay.bind(this)
  }
  handleToggleDropDown() {
    this.setState({ open: !this.state.open });
  }
  handleToggleDay(e) {
    const { value } = e.target;
    console.log(e.target)
    this.setState({
      [value]: !this.state[value],
    })
  }
  handleChange(e) {
    const { name, value } = e.target;
    const newHourData = update(this.state.hourData, {$merge:{[name]: value.replace(/[-]/g,'')}});
    this.setState({hourData: newHourData})
    if(value=='  :  -  :  '){
      this.setState({[name]: false})
    } else {
      this.setState({[name]: true})
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.isRequested) {
      let schedule = {'note':''};
      let currentHourData = this.state.hourData;
      for (let eachDay in currentHourData) {
        if(typeof currentHourData[eachDay] == 'string'){
          currentHourData[eachDay] = currentHourData[eachDay].split('-')
        }
        if (currentHourData.hasOwnProperty(eachDay) && currentHourData[eachDay][0] && currentHourData[eachDay][1]) {      
          schedule[`${eachDay}_start`] = currentHourData[eachDay][0].trim();
          schedule[`${eachDay}_end`] = currentHourData[eachDay][1].trim();
        } else {
          schedule[`${eachDay}_start`] = '';
          schedule[`${eachDay}_end`] = '';
        }
      }
      this.props.handleCollectHourData(schedule)
    }
  }
  render() {
    const { classes } = this.props;
    const { hourData, hourTextMask } = this.state;
    for(let eachDay in hourData){
      if (hourData.hasOwnProperty(eachDay)){
        if (Array.isArray(hourData[eachDay])){
          hourData[eachDay] = hourData[eachDay][0]
        }        
      } 
    }
    return (
      <div className={classes.root}>
        <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
            <span>Hour</span>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <form className={classes.form}>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Monday' value='monday' onChange={this.handleToggleDay} checked={this.state.monday} />
              <Input
                name='monday'
                value={hourData.monday? hourData.monday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Tuesday' value='tuesday' onChange={this.handleToggleDay} checked={this.state.tuesday} />
              <Input
                name='tuesday'
                value={hourData.tuesday? hourData.tuesday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Wednesday' value='wednesday' onChange={this.handleToggleDay} checked={this.state.wednesday} />
              <Input
                name='wednesday'
                value={hourData.wednesday? hourData.wednesday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.formControl}>
            <AsylumConnectCheckbox label='Thursday' value='thursday' onChange={this.handleToggleDay} checked={this.state.thursday} />
              <Input
                name='thursday'
                value={hourData.thursday? hourData.thursday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.formControl}>
            <AsylumConnectCheckbox label='Friday' value='friday' onChange={this.handleToggleDay} checked={this.state.friday} />
              <Input
                name='friday'
                value={hourData.friday? hourData.friday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.formControl}>
            <AsylumConnectCheckbox label='Saturday' value='saturday' onChange={this.handleToggleDay} checked={this.state.saturday} />
              <Input
                name='saturday'
                value={hourData.saturday? hourData.saturday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.formControl}>
            <AsylumConnectCheckbox label='Sunday' value='sunday' onChange={this.handleToggleDay} checked={this.state.sunday} />
              <Input
                name='sunday'
                value={hourData.sunday? hourData.sunday: hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </div>
          </form>
        </Collapse>
      </div>
    )
  }
}

OrgSettingsHour.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCollectHourData: React.PropTypes.func
};

export default withStyles(styles)(OrgSettingsHour);