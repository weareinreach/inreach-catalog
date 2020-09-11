import React from 'react';
import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsOrganization from './GeneralSettingsOrganization';
import GeneralSettingsPassword from './GeneralSettingsPassword';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {breakpoints} from '../theme';

import Typography from '@material-ui/core/Typography';

import {updateUser, updateUserPassword} from '../utils/api';

const styles = (theme) => ({
  root: {
    width: '50%',
    padding: '0 5% 0 5%',
  },
  formType: {
    margin: '10% 0 10% 0',
  },
  [`@media (max-width: ${breakpoints['md']}px)`]: {
    root: {
      width: '75%',
      padding: '0 5% 0 5%',
    },
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    root: {
      width: 'auto',
      padding: '0',
    },
    formType: {
      margin: '2% 0 2% 0',
    },
  },
  settingsTypeFont: {
    padding: '15px 0 25px 0',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '-.02em',
    color: theme.palette.secondary[500],
    cursor: 'pointer',
  },
});

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      errorMessage: '',
      isPasswordUpdated: null,
      isEmailUpdated: null,
      dialog: 'none',
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
    updateUser(this.state.userData, {email: newEmail})
      .then((data) => {
        this.setState({userData: data.user, isEmailUpdated: true});
        this.props.handleMessageNew('Your email has been updated.');
      })
      .catch((error) => this.handleOdasError(error));
  }

  updatePassword(currentPassword, newPassword) {
    updateUserPassword(this.state.userData, newPassword)
      .then((data) => {
        this.setState({isPasswordUpdated: true});
        this.props.handleMessageNew('Password has been updated.');
      })
      .catch((error) => this.handleOdasError(error));
  }

  render() {
    const {
      affiliation,
      classes,
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      handleUserUpdate,
      locale,
      session,
      userData,
      userData: {isProfessional, email},
    } = this.props;
    const {isPasswordUpdated, isEmailUpdated} = this.state;

    return (
      <div className={classes.root}>
        {affiliation && (
          <Typography variant="h5" className={classes.formType}>
            Your Account
          </Typography>
        )}
        {isProfessional && (
          <GeneralSettingsOrganization
            affiliation={affiliation}
            handleMessageNew={handleMessageNew}
            handleUserUpdate={handleUserUpdate}
            locale={locale}
            session={session}
            userData={userData}
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
  userData: PropTypes.shape({
    affiliation: PropTypes.shape({}),
    is_professional: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(GeneralSettings);
