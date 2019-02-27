import React from 'react';
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
    
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    '& label': theme.custom.inputLabel,
    '&>div': {
      width: '70%'      
    },
    '& label': {
      width: '30%'
    }
  },
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    letterSpacing: "-.02em",
    color: theme.palette.secondary[500],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  textField: {
    display: 'flex',
    flexDirection: 'row',
    '& div': {
      flex: 1
    },
    '& input': theme.custom.inputText
  },
  inputLabel: {
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: '20px'
    },
    '& input': theme.custom.inputText
  },
});

class SuggestHour extends React.Component {
  constructor(props) {
    super(props);
    const {schedule} = this.props
    this.state = {
      open: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this)
  }
  handleToggleDropDown() {
    this.setState({ open: !this.state.open });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.props.handleChange(name, value)
  }
  render() {
    const { classes, schedule, selectedDays, handleDaySelect } = this.props;
    return (
      <div className={classes.root}>
        <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
            <span>Hour</span>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <form className={classes.form}>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Monday' 
                value='monday'
                onChange={ref => handleDaySelect('select', ref.target.value, schedule.monday_start, schedule.monday_end)} 
                checked={selectedDays.monday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="monday_start"
                  defaultValue={schedule.monday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect', ref.target.name, schedule.monday_start, schedule.monday_end)}
                />
                <TextField
                  type= 'time'
                  name="monday_end"
                  defaultValue={schedule.monday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect', ref.target.name, schedule.monday_start, schedule.monday_end)}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Tuesday'
                value='tuesday'
                onChange={ref => handleDaySelect('select', ref.target.value, schedule.tuesday_start, schedule.tuesday_end)} 
                checked={selectedDays.tuesday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="tuesday_start"
                  defaultValue={schedule.tuesday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.tuesday_start, schedule.tuesday_end)}
                />
                <TextField
                  type= 'time'
                  name="tuesday_end"
                  defaultValue={schedule.tuesday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.tuesday_start, schedule.tuesday_end)}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Wednesday'
                value='wednesday'
                onChange={ref => handleDaySelect('select', ref.target.value, schedule.wednesday_start, schedule.wednesday_end)} 
                checked={selectedDays.wednesday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="wednesday_start"
                  defaultValue={schedule.wednesday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.wednesday_start, schedule.wednesday_end)}
                />
                <TextField
                  type= 'time'
                  name="wednesday_end"
                  defaultValue={schedule.wednesday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.wednesday_start, schedule.wednesday_end)}
                />
            </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Thursday'
                value='thursday'
                onChange={ref => handleDaySelect('select', ref.target.value, schedule.thursday_start, schedule.thursday_end)} 
                checked={selectedDays.thursday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="thursday_start"
                  defaultValue={schedule.thursday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.thursday_start, schedule.thursday_end)}
                />
                <TextField
                  type= 'time'
                  name="thursday_end"
                  defaultValue={schedule.thursday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.thursday_start, schedule.thursday_end)}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Friday'
                value='friday'
                onChange={ref => handleDaySelect('select', ref.target.value, schedule.friday_start, schedule.friday_end)} 
                checked={selectedDays.friday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="friday_start"
                  defaultValue={schedule.friday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.friday_start, schedule.friday_end)}
                />
                <TextField
                  type= 'time'
                  name="friday_end"
                  defaultValue={schedule.friday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.friday_start, schedule.friday_end)}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Saturday'
                value='saturday'
                onChange={ref => handleDaySelect('select', ref.target.value, schedule.saturday_start, schedule.saturday_end)} 
                checked={selectedDays.saturday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="saturday_start"
                  defaultValue={schedule.saturday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect', ref.target.name, schedule.saturday_start, schedule.saturday_end)}
                />
                <TextField
                  type= 'time'
                  name="saturday_end"
                  defaultValue={schedule.saturday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.saturday_start, schedule.saturday_end)}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox 
                label='Sunday'
                value='sunday'
                onChange={ref => handleDaySelect('select',ref.target.value, schedule.sunday_start, schedule.sunday_end)} 
                checked={selectedDays.sunday} />
              <div className={classes.textField}>
                <TextField
                  type= 'time'
                  name="sunday_start"
                  defaultValue={schedule.sunday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.sunday_start, schedule.sunday_end)}
                />
                <TextField
                  type= 'time'
                  name="sunday_end"
                  defaultValue={schedule.sunday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  onKeyUp={ref => handleDaySelect('autoSelect',ref.target.name, schedule.sunday_start, schedule.sunday_end)}
                />
              </div>
            </div>
            <TextField
              className={classes.inputLabel}
              label='Additional Information:'
              defaultValue={schedule.notes}
              multiline={true}
              name='notes'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              placeholder='i.e: closed on holidays.'
            />
          </form>
        </Collapse>
      </div>
    )
  }
}

SuggestHour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuggestHour);