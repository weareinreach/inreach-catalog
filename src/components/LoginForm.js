import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import {breakpoints} from '../theme';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  link: {
    color: theme.palette.secondary[500],
    cursor: 'pointer',
  },
  paddingAbove: {paddingTop: theme.spacing(5)},
  paddingVertical: {
    padding: theme.spacing(5, 10),
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    paddingVertical: {
      padding: theme.spacing(3, 0),
    },
  },
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
    <Typography variant="body1" className={classes.paddingVertical}>
      By clicking "Log In," you agree to AsylumConnect's{` `}
      <a
        href="https://asylumconnect.org/privacy"
        rel="noopener noreferrer"
        target="_blank"
      >
        Privacy Policy
      </a>
      {` `}and{` `}
      <a
        href="https://asylumconnect.org/terms-of-use"
        rel="noopener noreferrer"
        target="_blank"
      >
        Terms of&nbsp;Use
      </a>
      .
    </Typography>
    <AsylumConnectButton variant="primary">Log In</AsylumConnectButton>
    <div onClick={() => handleRequestOpen('forgot')}>
      <Typography className={classes.paddingAbove} variant="body1">
        <span className={classes.link}>Forgot Password?</span>
      </Typography>
    </div>
    <div onClick={() => handleRequestOpen('signup')}>
      <Typography variant="body1">
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
