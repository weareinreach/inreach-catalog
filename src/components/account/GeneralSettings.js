import React from 'react';
import MaskedInput from 'react-text-mask';

import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsPassword from './GeneralSettingsPassword';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import breakpoints from '../../theme/breakpoints';

import Typography from 'material-ui/Typography';

import fetch from 'node-fetch';
import config from '../../config/config.js';

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
    color: theme.palette.primary[500]
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
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }
  
  handleDelete() {
    return "Delete"
  }

  updateEmail(newEmail){
    var jwt = localStorage.getItem("jwt");
    const {handleMessageNew} = this.props;
    
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/user`;
    const { user } = this.state;
    user.email = newEmail;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: jwt,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body:  JSON.stringify({user})
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 200) {
          response.json().then((res) => {
            if (res.message === 'User updated') {
              this.setState({ user: res.user, isEmailUpdated:true })
              handleMessageNew('Your email has been updated.');
            }
          });
        } else {
          this.setState({ user: res.user, isEmailUpdated: false })
          handleMessageNew('The email you entered was incorrect.');
        }
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong. Error: '+ error);
      });
  }

  updatePassword(currentPassword, newPassword){
    var jwt = localStorage.getItem("jwt");
    const {handleMessageNew} = this.props;

    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/passwords/change_password`;
    const payload = JSON.stringify({
      "change_password": {
        "current_password": currentPassword,
        "password": newPassword,
        "password_confirmation": newPassword
      }
    })
    const options = {
      method: 'PUT',
      headers: {
        Authorization: jwt,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload
    };
    fetch(url, options)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isPasswordUpdated: true })
          handleMessageNew('Password has been updated.')
        } else {
          this.setState({ isPasswordUpdated: false })
          handleMessageNew('The password you entered was incorrect.')
        }
      })
      .catch(error => {
        handleMessageNew('Oops! Something went wrong. Error: '+ error )
      });
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
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(GeneralSettings);