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

function TextMaskCustom(props) {
  return (
    <MaskedInput
      {...props}
      mask={[/[0-1]/,/[0-9]/, ':', /[0-5]/, /[0-9]/ ,' ', '-', ' ',/[0-1]/,/[0-9]/, ':', /[0-5]/, /[0-9]/ ]}
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
    this.state = {
      open: true,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      hourData: {        
        monday: this.props.initialData ? (this.props.initialData.monday_start + this.props.initialData.monday_end) : '  :   -   :  ',        
        tuesday: this.props.initialData ? (this.props.initialData.tuesday_start + this.props.initialData.tuesday_end) : '  :   -   :  ',        
        wednesday: this.props.initialData ? (this.props.initialData.wednesday_start + this.props.initialData.wednesday_end) : '  :   -   :  ',        
        thursday: this.props.initialData ? (this.props.initialData.thursday_start + this.props.initialData.thursday_end) : '  :   -   :  ',        
        friday: this.props.initialData ? (this.props.initialData.friday_start + this.props.initialData.friday_end) : '  :   -   :  ',        
        saturday: this.props.initialData ? (this.props.initialData.saturday_start + this.props.initialData.saturday_end) : '  :   -   :  ',        
        sunday: this.props.initialData ? (this.props.initialData.sunday_start + this.props.initialData.sunday_end) : '  :   -   :  ',
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
    const { name } = e.target;
    this.setState({
      [name]: !this.state[name],
    })
  }
  handleChange(e) {
    const { name, value } = e.target;
    const newHourData = update(this.state.hourData, {$merge:{[name]: value}});
    this.setState({hourData: newHourData})
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.isRequested) {
      let schedule = {'note':''};
      const currentHourData = this.state.hourData;
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
    return (
      <div className={classes.root}>
        <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
            <span>Hour</span>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <form className={classes.form}>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='monday'
                    checked={this.state.monday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Monday'
              />
              <Input
                name='monday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='tuesday'
                    checked={this.state.tuesday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Tuesday'
              />
              <Input
                name='tuesday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='Wednesday'
                    checked={this.state.wednesday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Wednesday'
              />
              <Input
                name='wednesday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='thursday'
                    checked={this.state.thursday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Thursday'
              />
              <Input
                name='thursday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='friday'
                    checked={this.state.friday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Friday'
              />
              <Input
                name='friday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='saturday'
                    checked={this.state.saturday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Saturday'
              />
              <Input
                name='saturday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Radio
                    name='sunday'
                    checked={this.state.sunday}
                    value={this.state.monday?'on':'off'}
                    onClick={this.handleToggleDay}
                  />
                }
                label='Sunday'
              />
              <Input
                name='sunday'
                value={this.state.hourTextMask}
                inputComponent={TextMaskCustom}
                onChange={this.handleChange}
              />
            </FormControl>
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