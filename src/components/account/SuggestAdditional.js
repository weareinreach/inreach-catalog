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
import ResourceTypeSelector from '../search/ResourceTypeSelector';

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
  modifiedSelector: {
    '&>div': {
      '&>div:first-child': {
        height: 0,
        backgroundColor: 'white',
        boxShadow: 'none',
        padding: 0,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "\"Open Sans\", sans-serif",
        letterSpacing: "-.02em",
        color: theme.palette.common.lightBlack,
        '&>div': {
          display: 'flex'
        }
      }
    },
    '& svg': {
      float: 'none'
    }
  }
});

class SuggestAdditional extends React.Component {
  constructor(props) {
    super(props);
    const {schedule} = this.props
    this.state = {
      open: true,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this)
  }
  handleToggleDropDown() {
    this.setState({ open: !this.state.open });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.props.onChange('schedule', name, value)
  }
  render() {
    const { classes, schedule, selectedDays, onSelect } = this.props;
    console.log(selectedDays)
    return (
      <div className={classes.root}>
        <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
            <span>Feature</span>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <div>
            {/* To Do Change to Feature Options*/}
          <AsylumConnectCheckbox 
              label='Infants (0-3)' 
              value='infants'
              onChange={(ref)=>{return ref}}
              checked={false} />
            <AsylumConnectCheckbox 
              label='Kids (4-12)' 
              value='kids'
              onChange={(ref)=>{return ref}}
              checked={false} />
            <AsylumConnectCheckbox 
              label='Infants (0-3)' 
              value='infants'
              onChange={(ref)=>{return ref}}
              checked={false} />
            <AsylumConnectCheckbox 
              label='Teens (13-17)' 
              value='teens'
              onChange={(ref)=>{return ref}}
              checked={false} />
            <AsylumConnectCheckbox 
              label='Young Adults (18-24)' 
              value='youth'
              onChange={(ref)=>{return ref}}
              checked={false} />
          </div>
        </Collapse>
        <FormControl className={classes.modifiedSelector}>
              <ResourceTypeSelector onChange={this.handleResourceTypeSelect} selectedResources={this.state.selectedResources} />
            </FormControl>
            <TextField
              className={classes.inputLabel}
              label='Additional Information:'
              defaultValue={''}
              multiline={true}
              name='notes'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              placeholder='List anything else you would like to share about this resource'
            />
      </div>
    )
  }
}

SuggestAdditional.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuggestAdditional);