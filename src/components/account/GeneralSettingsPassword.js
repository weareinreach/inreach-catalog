import React from 'react';
import MaskedInput from 'react-text-mask';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  root: {
    width: '30%',
    padding: '0 5% 0 5%'
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
  }
});

class GeneralSettingsPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneTextMask: '(  )   -   ',
      open: true,
      currentPassword: '',
      newPassword: '',
      confirmedPassword: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  
  handleToggleDropDown() {
    this.setState({ open: !this.state.open });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { currentPassword, newPassword, confirmedPassword } = this.state
    if (!currentPassword || !newPassword || !confirmedPassword) {
      console.log("Missing password input")
    }

    if (currentPassword && newPassword && confirmedPassword) {
      if (newPassword === confirmedPassword) {
        this.props.handleUpdatePassword(currentPassword, newPassword)
      }
    }
  }
  
  render() {
    const { classes } = this.props;
    const { currentPassword, newPassword, confirmedPassword } = this.state;
    return (
      <div>
        <div onClick={this.handleToggleDropDown} className={classes.settingsTypeFont}>
          <span>Change Password</span>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              className={classes.inputLabel}
              name='currentPassword'
              label='*Enter Old Password:'
              value={currentPassword}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'
              onChange={this.handleChange}
            />
            <TextField
              className={classes.inputLabel}
              name='newPassword'
              label='*Enter New Password:'
              value={newPassword}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'
              onChange={this.handleChange}
            />
            <TextField
              className={classes.inputLabel}
              name='confirmedPassword'
              label='*Confirm New Password:'
              value={confirmedPassword}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Hint text'
              onChange={this.handleChange}
            />
            <div><AsylumConnectButton variant="primary">Change Password</AsylumConnectButton></div>
          </form>
        </Collapse>
      </div>
    )
  }
}

GeneralSettingsPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralSettingsPassword);