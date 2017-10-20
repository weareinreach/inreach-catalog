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
  spacingVertical: { margin: '2.5rem 0' },
  link: {
    color: theme.palette.primary[500],
    cursor: 'pointer',
  },
});

const ForgotForm = ({
  classes,
  email,
  handleChange,
  handleRequestOpen,
  handleSubmit,
  password,
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Typography type="body1">
      We'll send you an email to reset your password.
    </Typography>
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
    <AsylumConnectButton
      className={classes.spacingVertical}
      variant="secondary"
    >
      Send
    </AsylumConnectButton>
    <div onClick={() => handleRequestOpen('login')} >
      <Typography type="body1" >
        <span className={classes.link}>Back</span>
      </Typography>
    </div>
  </form>
);

ForgotForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ForgotForm);
