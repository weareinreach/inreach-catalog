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
      open: false,
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
    const {handleMessageNew} = this.props;
    const { currentPassword, newPassword, confirmedPassword } = this.state
    if (!currentPassword || !newPassword || !confirmedPassword) {
      handleMessageNew('Missing password input')
    }
    if (currentPassword && newPassword && confirmedPassword) {
      if (newPassword === confirmedPassword) {
        this.props.handleUpdatePassword(currentPassword, newPassword)
      } else {
        handleMessageNew('Your new password is not matching confirmed password.')
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.isPasswordUpdated !== null) {
      this.setState({
        currentPassword: '',
        newPassword: '',
        confirmedPassword: ''
      })
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
              label='Enter Old Password:'
              type='password'
              error={currentPassword.length > 0 && currentPassword.length < 8}
              helperText={currentPassword.length > 0 && currentPassword.length < 8 ? 'Password must be at least 8 characters.' : null}
              
              value={currentPassword}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Password must be at least 8 characters.'
              onChange={this.handleChange}
              required
            />
            <TextField
              className={classes.inputLabel}
              name='newPassword'
              label='Enter New Password:'
              type='password'
              error={newPassword.length > 0 && newPassword.length < 8}
              helperText={newPassword.length > 0 && newPassword.length < 8 ? 'Password must be at least 8 characters.' : null}
              
              value={newPassword}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Password must be at least 8 characters.'
              onChange={this.handleChange}
              required
            />
            <TextField
              className={classes.inputLabel}
              name='confirmedPassword'
              label='Confirm New Password:'
              type='password'
              error={confirmedPassword.length > 0 && confirmedPassword.length < 8}
              helperText={confirmedPassword.length > 0 && confirmedPassword.length < 8 ? 'Password must be at least 8 characters.' : null}
              
              value={confirmedPassword}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Password must be at least 8 characters.'
              onChange={this.handleChange}
              required
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
