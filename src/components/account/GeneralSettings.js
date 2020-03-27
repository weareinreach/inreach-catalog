import React from 'react';
import MaskedInput from 'react-text-mask';

import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsOrganization from './GeneralSettingsOrganization';
import GeneralSettingsPassword from './GeneralSettingsPassword';
import AsylumConnectDialog from '../dialog/AsylumConnectDialog';

import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import breakpoints from '../../theme/breakpoints';

import Typography from 'material-ui/Typography';

import 'whatwg-fetch';
import config from '../../config.js';
import {updateUserEmail, updateUserPassword} from '../../helpers/odasRequests';

function TextMaskCustom(props) {
  return (
    <MaskedInput
      {...props}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const styles = theme => ({
  root: {
    width: '50%',
    padding: '0 5% 0 5%'
  },
  formType: {
    margin: '10% 0 10% 0'
  },
  [`@media (max-width: ${breakpoints['md']}px)`]: {
    root: {
      width: '75%',
      padding: '0 5% 0 5%'
    }
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
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
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '-.02em',
    color: theme.palette.secondary[500],
    cursor: 'pointer'
  }
});

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      errorMessage: '',
      isPasswordUpdated: null,
      isEmailUpdated: null,
      dialog: 'none'
    };
    this.handleOdasError = this.handleOdasError.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
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

  updateEmail(newEmail) {
    const {handleMessageNew, session} = this.props;
    const payload = Object.assign({}, this.state.user, {email: newEmail});
    updateUserEmail(payload, session)
      .then(data => {
        this.setState({user: data.user, isEmailUpdated: true});
        handleMessageNew('Your email has been updated.');
      })
      .catch(error => this.handleOdasError(error));
  }

  updatePassword(currentPassword, newPassword) {
    const {handleMessageNew, session} = this.props;
    const payload = {
      change_password: {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPassword
      }
    };
    updateUserPassword(payload, session)
      .then(data => {
        this.setState({isPasswordUpdated: true});
        handleMessageNew('Password has been updated.');
      })
      .catch(error => this.handleOdasError(error));
  }

  render() {
    const {
      classes,
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      handleUserUpdate,
      history,
      locale,
      session,
      user: {affiliation, is_professional: isProfessional, email}
    } = this.props;
    const {isPasswordUpdated, isEmailUpdated, dialog} = this.state;
    return (
      <div className={classes.root}>
        {affiliation && (
          <Typography variant="display3" className={classes.formType}>
            Your Account
          </Typography>
        )}
        {isProfessional && (
          <GeneralSettingsOrganization
            handleMessageNew={handleMessageNew}
            handleUserUpdate={handleUserUpdate}
            affiliation={affiliation}
            locale={locale}
            session={session}
          />
        )}
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
        <div
          onClick={() => {
            history.push('/');
            handleMessageNew('Logout successful.');
            handleLogOut();
          }}
          className={classes.settingsTypeFont}
        >
          <span>Logout</span>
        </div>
        <div
          onClick={() => handleRequestOpen('deleteAccount')}
          className={classes.settingsTypeFont}
        >
          <span>Delete Account</span>
        </div>
      </div>
    );
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleUserUpdate: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  user: PropTypes.shape({
    affiliation: PropTypes.shape({}),
    is_professional: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(GeneralSettings);
