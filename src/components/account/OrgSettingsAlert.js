import React from 'react';
import MaskedInput from 'react-text-mask';

import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, {InputLabel} from 'material-ui/Input';

const styles = theme => ({
  root: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > div': {
      margin: '15px 0 15px 0'
    }
  },
  formType: {
    marginTop: '10%'
  },
  inputLabel: {
    '& label': theme.custom.inputLabel,
    '&>div': {
      marginTop: '20px'
    },
    '& input': theme.custom.inputText
  }
});

class OrgSettingsAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //   handleChange(e) {
  //
  //   }

  render() {
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <TextField
            className={classes.inputLabel}
            label="COVID-19 Alert Message:"
            name="alertMessage"
            value={this.state.alertMessage}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Currently providing service remotely due to coronavirus"
            onChange={this.handleChange}
            newAlertMessage={this.state.alertMessage}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(OrgSettingsAlert);
