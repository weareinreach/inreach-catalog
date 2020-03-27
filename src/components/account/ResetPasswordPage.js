import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

import AsylumConnectButton from '../AsylumConnectButton';
import {resetPassword} from '../../helpers/odasRequests';
import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

const styles = theme => ({
  container: {
    minHeight: '50%'
  },
  bottomSpacing: {
    marginBottom: '0.9rem'
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      minHeight: '100%',
      paddingBottom: '91px'
    }
  }
});

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      submitted: false
    };
    this.token = null;
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    const {
      handleMessageNew,
      handleLogOut,
      session,
      location,
      history
    } = this.props;
    if (session) {
      handleLogOut();
    }
    let query = queryString.parse(location.search);

    if (query && (query.token || query.t)) {
      this.token = query.token || query.t;
    } else {
      handleMessageNew('Invalid password reset token.');
      history.push('/');
    }
  }
  componentDidMount() {}
  handleChangePassword(event, value) {
    this.setState({
      password: event.target.value
    });
  }
  handleChangeConfirmPassword(event, value) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  handleSubmit(event) {
    const {handleMessageNew, history} = this.props;
    //console.log('submitted!');
    event.preventDefault();

    //check token
    if (!this.token) {
      handleMessageNew('Missing token');
      history.push('/');
    }

    //confirm passwords match
    if (this.state.password !== this.state.confirmPassword) {
      handleMessageNew('Passwords do not match. Please try again.');
      this.setState({
        password: '',
        confirmPassword: ''
      });
      return;
    }

    //submit request
    let payload = {
      reset_token: this.token,
      password: this.state.password,
      password_confirmation: this.state.confirmPassword
    };
    resetPassword(payload)
      .then(response => {
        let submitted = false;
        if (response) {
          handleMessageNew('Failed to reset password, please try again.');
        } else {
          submitted = true;
        }
        this.setState({
          password: '',
          confirmPassword: '',
          submitted: submitted
        });
      })
      .catch(error => {
        handleMessageNew(
          'Failed to reset password, please request a new reset link.'
        );
      });
  }

  render() {
    const {classes, handleLogOut, handleMessageNew, session} = this.props;
    const {password, confirmPassword, submitted} = this.state;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid
        container
        spacing={0}
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        {!submitted ? (
          <Grid item xs={11} sm={8} md={5}>
            <form onSubmit={this.handleSubmit}>
              <Typography variant="display1" style={{textAlign: 'center'}}>
                Reset Your Password
              </Typography>
              <TextField
                error={password.length > 0 && password.length < 8}
                helperText={
                  password.length > 0 && password.length < 8
                    ? 'Password must be at least 8 characters.'
                    : null
                }
                id="password"
                label="Password"
                margin="normal"
                name="password"
                onChange={this.handleChangePassword}
                required
                value={password}
                type="password"
                placeholder="New password"
                fullWidth
              />
              <TextField
                error={password.length >= 8 && password !== confirmPassword}
                helperText={
                  password.length >= 8 && password !== confirmPassword
                    ? 'Confirmation does not match password.'
                    : null
                }
                id="confirmPassword"
                label="Confirm Password"
                margin="normal"
                name="confirmPassword"
                onChange={this.handleChangeConfirmPassword}
                required
                value={confirmPassword}
                type="password"
                placeholder="Confirm new password"
                fullWidth
                className={classes.bottomSpacing}
              />
              <AsylumConnectButton variant="primary">
                Reset Password
              </AsylumConnectButton>
            </form>
          </Grid>
        ) : (
          <Grid item xs={11} sm={8} md={5}>
            <Typography
              variant="display1"
              style={{textAlign: 'center'}}
              className={classes.bottomSpacing}
            >
              Password Reset!
            </Typography>
            <Typography variant="body2">
              Your password has reset. You can now login again using your new
              password.
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  }
}

ResetPasswordPage.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  session: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth(ResetPasswordPage));
