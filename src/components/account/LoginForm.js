import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import breakpoints from '../../theme/breakpoints';

import config from '../../config/config.js';
import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  link: {
    color: theme.palette.primary[500],
    cursor: 'pointer',
  },
  paddingAbove: {paddingTop: '2.5rem'},
  paddingVertical: {padding: '2.5rem 6rem'},
  [`@media (max-width: ${breakpoints['sm']}px)`]:{
    paddingVertical: {
      padding: '1.5rem 0',
    }
  }
});

const LoginForm = ({
  classes,
  email,
  handleChange,
  handleRequestOpen,
  handleSubmit,
  password,
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <TextField
      id="email"
      label="Email"
      margin="normal"
      name="email"
      onChange={handleChange}
      required
      type="email"
      value={email}
    />
    <TextField
      id="password"
      label="Password"
      margin="normal"
      name="password"
      onChange={handleChange}
      required
      type="password"
      value={password}
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
    <AsylumConnectButton variant="secondary">Log In</AsylumConnectButton>
    <div onClick={() => handleRequestOpen('forgot')}>
      <Typography className={classes.paddingAbove} type="body1">
        <span className={classes.link}>Forgot Password?</span>
      </Typography>
    </div>
    <div onClick={() => handleRequestOpen('signup')}>
      <Typography type="body1">
        <span className={classes.link}>Don't have an account?</span>
      </Typography>
    </div>
  </form>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

export default withStyles(styles)(LoginForm);
