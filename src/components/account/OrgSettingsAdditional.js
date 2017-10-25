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

const styles = theme => ({
  root: {
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > div': {
      margin: '15px 0 15px 0'
    }
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  inputLabel: {
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: '20px'
    },
    '& input': theme.custom.inputText
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    '& label': theme.custom.inputLabel,
    '& div': {
      marginTop: 0,
      '& input': theme.custom.inputText
    },
  },
  settingsTypeFont: {
    marginRight: '20px',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    letterSpacing: "-.02em",
    color: theme.palette.common.lightBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
});

class OrgSettingsAdditional extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      capacity: false
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleCapacity = this.handleToggleCapacity.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleToggleCapacity(e) {
    const { name } = e.target;
    this.setState({
      [name]: !this.state[name],
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <TextField
            className={classes.inputLabel}
            label='Additional Information:'
            InputLabelProps={{
              shrink: true,
            }}
            placeholder='Additional Info'
          />
          <FormControl className={classes.formControl}>
            <div>
              <div className={classes.settingsTypeFont}>
                <span>Mark my organization as at capacity:</span>
              </div>
            </div>
            <FormControlLabel 
              control={
                <Radio
                  name='capacity'
                  checked={this.state.capacity}
                  value={this.state.capacity?'on':'off'}
                  onClick={this.handleToggleCapacity}
                />
              }
              label='Yes'
            />
          </FormControl>
          <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
            <span>Resource Type</span>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </form>
      </div>
    )
  }
}

OrgSettingsAdditional.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgSettingsAdditional);