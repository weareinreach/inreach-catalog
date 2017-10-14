import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/Textfield';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import config from '../../config/config.js';
import AsylumConnectButton from '../AsylumConnectButton';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  paddingAbove: { paddingTop: '2.5rem' },
  paddingVertical: { padding: '2.5rem 6rem' },
});

const LoginForm = ({
  classes,
  email,
  handleChange,
  handleSubmit,
  password,
}) => (
  <form className={classes.container}>
    <TextField
      required
      id="email"
      label="Email"
      name="email"
      value={email}
      onChange={handleChange}
      margin="normal"
    />
    <TextField
      required
      id="password"
      label="Password"
      name="password"
      value={password}
      onChange={handleChange}
      margin="normal"
      type="password"
    />
    <Typography type="body1" className={classes.paddingVertical}>
      By clicking "Log In," you agree to One Degree's{` `}
      <a href="https://www.1degree.org/privacy" target="_blank">
        Privacy Policy
      </a>
      {` `}and{` `}
      <a href="https://www.1degree.org/terms-of-use" target="_blank">
        Terms of Use
      </a>
      .
    </Typography>
    <AsylumConnectButton
      onClick={handleSubmit}
      variant="secondary"
    >
      Log In
    </AsylumConnectButton>
    <Typography type="body1" className={classes.paddingAbove}>
      Forgot Password?
    </Typography>
  </form>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

export default withStyles(styles)(LoginForm);
