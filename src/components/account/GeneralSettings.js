import React from 'react';
import MaskedInput from 'react-text-mask';

import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsPassword from './GeneralSettingsPassword';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import breakpoints from '../../theme/breakpoints';

import Typography from 'material-ui/Typography';

import 'whatwg-fetch';
import config from '../../config/config.js';
import {
  deleteUser,
  updateUserEmail,
  updateUserPassword,
} from '../../helpers/odasRequests';

function TextMaskCustom(props) {
  return (
    <MaskedInput
      {...props}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const styles = theme => ({
  root: {
    width: '33%',
    padding: '0 5% 0 5%'
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]:{
    root: {
      width: 'auto',
      padding: '0'
    },
    formType: {
      margin: '2% 0 2% 0'
    }
  },
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "\"Open Sans\", sans-serif",
    letterSpacing: "-.02em",
    color: theme.palette.primary[500],
    cursor: 'pointer'
  },
});

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      errorMessage: '',
      isPasswordUpdated: null,
      isEmailUpdated: null,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOdasError = this.handleOdasError.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }
  
  handleDelete() {    
    var jwt = localStorage.getItem("jwt");
    const {handleMessageNew, user} = this.props;
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/user`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Basic ZGVtbzoxNm1pc3Npb24=',
        'Demo-Authorization': 'Bearer '+jwt,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 200) {
          response.json().then((res) => {
            if (res.message === 'User deleted') {
              handleMessageNew('Your account has been deleted.');
            }
          });
        } else {
          handleMessageNew('Oops! Something went wrong');
        }
      })
  }

  handleOdasError(error) {
    const {handleLogOut, handleMessageNew, handleRequestOpen} = this.props;
    if (error.response && error.response.status === 401) {
      handleMessageNew('Your session has expired. Please log in again.');
      handleLogOut();
    } else if (error.response && error.response.status === 403) {
      handleRequestOpen('password');
    } else {
      handleMessageNew('Oops! Something went wrong.');
    }
  }

  updateEmail(newEmail){
    const {handleMessageNew, session} = this.props;
    const payload = Object.assign(
      {},
      this.state.user,
      {email: newEmail},
    );
    updateUserEmail(payload, session)
      .then(data => {
        this.setState({ user: data.user, isEmailUpdated:true })
        handleMessageNew('Your email has been updated.');
      })
      .catch(error => this.handleOdasError(error));
  }

  updatePassword(currentPassword, newPassword){
    const {handleMessageNew, session} = this.props;
    const payload = {
      'change_password': {
        'current_password': currentPassword,
        'password': newPassword,
        'password_confirmation': newPassword,
      }
    };
    updateUserPassword(payload, session)
      .then(data => {
        this.setState({ isPasswordUpdated: true })
        handleMessageNew('Password has been updated.')
      })
      .catch(error => this.handleOdasError(error));
  }

  render() {
    const { classes, handleMessageNew, user } = this.props;
    const { isPasswordUpdated, isEmailUpdated } = this.state;
    let email = user? user.email:''
    return (
      <div className={classes.root}>
        <Typography type="display3" className={classes.formType}>Your Account</Typography>
        <div>
          <GeneralSettingsEmail 
            currentEmail={email} 
            handleUpdateEmail={this.updateEmail} 
            isEmailUpdated={isEmailUpdated}
            handleMessageNew={handleMessageNew}
          />
          <GeneralSettingsPassword 
            handleUpdatePassword={this.updatePassword} 
            isPasswordUpdated={isPasswordUpdated} 
            handleMessageNew={handleMessageNew}
          />
          <div><div onClick={this.handleDelete} className={classes.settingsTypeFont}>
            <span>Delete Account</span>
          </div></div>
        </div>
      </div>
    )
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(GeneralSettings);
