import React from 'react';
import MaskedInput from 'react-text-mask';

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
      hourTextMask: '  :   -   :  ',
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
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
    this.setState({
      [name]: value,
    })
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
                name='hourTextMask'
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
                name='hourTextMask'
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
                name='hourTextMask'
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
                name='hourTextMask'
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
                name='hourTextMask'
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
                name='hourTextMask'
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
                name='hourTextMask'
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
};

export default withStyles(styles)(OrgSettingsHour);