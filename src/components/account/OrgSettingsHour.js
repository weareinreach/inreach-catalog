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
    color: theme.palette.primary[500],
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
      hourData: {        
        monday_start: initialData.monday_start, 
        monday_end: initialData.monday_end,        
        tuesday_start:  initialData.tuesday_start,
        tuesday_end: initialData.tuesday_end ,        
        wednesday_start:  initialData.wednesday_start,
        wednesday_end: initialData.wednesday_end ,  
        thursday_start:  initialData.thursday_start,
        thursday_end: initialData.thursday_end ,   
        friday_start:  initialData.friday_start,
        friday_end: initialData.friday_end ,        
        saturday_start:  initialData.saturday_start,
        saturday_end: initialData.saturday_end ,  
        sunday_start:  initialData.sunday_start,
        sunday_end: initialData.sunday_end ,
        notes: initialData && initialData.notes ? initialData.notes:'',
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
    const newHourData = update(this.state.hourData, {$merge:{[name]: value}});
    console.log(newHourData)
    this.setState({hourData: newHourData})
    if(value=='  :  -  :  '){
      this.setState({[name]: false})
    } else {
      this.setState({[name]: true})
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.isRequested) {
      this.props.handleCollectHourData(this.state.hourData)
    }
  }
  render() {
    const { classes } = this.props;
    const { hourData } = this.state;
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
              <div className={classes.textField}>
                <TextField
                  type="time"
                  name="monday_start"
                  defaultValue={hourData.monday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
                <TextField
                  type="time"
                  name="monday_end"
                  defaultValue={hourData.monday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Tuesday' value='tuesday' onChange={this.handleToggleDay} checked={this.state.tuesday} />
              <div className={classes.textField}>
                <TextField
                  type="time"
                  name="tuesday_start"
                  defaultValue={hourData.tuesday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
                <TextField
                  type="time"
                  name="tuesday_end"
                  defaultValue={hourData.tuesday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Wednesday' value='wednesday' onChange={this.handleToggleDay} checked={this.state.wednesday} />
              <div className={classes.textField}>
              <TextField
                type="time"
                name="wednesday_start"
                defaultValue={hourData.wednesday_start}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
              />
              <TextField
                type="time"
                name="wednesday_end"
                defaultValue={hourData.wednesday_end}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
              />
            </div>
            </div>
            <div className={classes.formControl}>
            <AsylumConnectCheckbox label='Thursday' value='thursday' onChange={this.handleToggleDay} checked={this.state.thursday} />
            <div className={classes.textField}>
            <TextField
              type="time"
              name="thursday_start"
              defaultValue={hourData.thursday_start}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
            <TextField
              type="time"
              name="thursday_end"
              defaultValue={hourData.thursday_end}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
          </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Friday' value='friday' onChange={this.handleToggleDay} checked={this.state.friday} />
              <div className={classes.textField}>
                <TextField
                  type="time"
                  name="friday_start"
                  defaultValue={hourData.friday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
                <TextField
                  type="time"
                  name="friday_end"
                  defaultValue={hourData.friday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Saturday' value='saturday' onChange={this.handleToggleDay} checked={this.state.saturday} />
              <div className={classes.textField}>
                <TextField
                  type="time"
                  name="saturday_start"
                  defaultValue={hourData.saturday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
                <TextField
                  type="time"
                  name="saturday_end"
                  defaultValue={hourData.saturday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <AsylumConnectCheckbox label='Sunday' value='sunday' onChange={this.handleToggleDay} checked={this.state.sunday} />
              <div className={classes.textField}>
                <TextField
                  type="time"
                  name="sunday_start"
                  defaultValue={hourData.sunday_start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
                <TextField
                  type="time"
                  name="sunday_end"
                  defaultValue={hourData.sunday_end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <TextField
              className={classes.inputLabel}
              label='Additional Information:'
              defaultValue={hourData.notes}
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

OrgSettingsHour.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCollectHourData: React.PropTypes.func
};

export default withStyles(styles)(OrgSettingsHour);