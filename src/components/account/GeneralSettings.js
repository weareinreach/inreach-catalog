import React from 'react';
import MaskedInput from 'react-text-mask';

import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsPassword from './GeneralSettingsPassword';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

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
    width: '30%',
    padding: '0 5% 0 5%'
  },
  formType: {
    margin: '10% 0 10% 0'
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
      user: null,
      message: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.updateAccount = this.updateAccount.bind(this)
  }
  
  handleDelete() {
    return "Delete"
  }

  updateAccount(newEmail){
    var jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      console.log("There is no available jwt");
      return
    }
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/user`;
    const { user } = this.state;
    user.email = newEmail;
    console.log(user)
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
              this.setState({ user: res.user})
            }
          });
        } else {
          console.log('Unauthorized');
        }
      })
      .catch(error => {
        console.log('Oops! Something went wrong.');
      });
  }

  updatePassword(currentPassword, newPassword){
    var jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      console.log("There is no available jwt");
      return
    }
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/passwords/change_password`;
    const payload = JSON.stringify({
      "current_password": currentPassword,
      "password": newPassword,
      "password_confirmation": newPassword
    })
    console.log(payload)
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
      .then(response => {
        if (response.status === 200) {
          response.json().then((res) => {
            console.log(res)
          });
        } else {
          console.log('Unauthorized');
        }
      })
      .catch(error => {
        console.log('Oops! Something went wrong.');
      });
  }

  componentDidMount(){
    var jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      console.log("There is no available jwt");
      return
    }
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/user`;    
    const options = {
      method: 'GET',
      headers: {
        Authorization: jwt,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      }
    };
    fetch(url, options)
      .then(response => {
        if (response.status === 200) {
          response.json().then(({user}) => {
            this.setState({user: user})
          });
        } else {
          console.log('Unauthorized');
        }
      })
      .catch(error => {
        console.log('Oops! Something went wrong.');
      });
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    console.log(user)
    let email;
    email = user ? this.state.user.email : '';
    return (
      <div className={classes.root}>
        <Typography type="display3" className={classes.formType}>Your Account</Typography>
        <div>
          <GeneralSettingsEmail currentEmail={email} handleUpdateAccount={this.updateAccount} user={this.state}/>
          <GeneralSettingsPassword handleUpdatePassword={this.updatePassword}/>
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
};

export default withStyles(styles)(GeneralSettings);