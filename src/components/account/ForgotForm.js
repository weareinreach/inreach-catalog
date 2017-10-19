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
      required
      id="email"
      label="Email"
      name="email"
      value={email}
      onChange={handleChange}
      margin="normal"
    />
    <AsylumConnectButton
      variant="secondary"
    >
      Send
    </AsylumConnectButton>
    <div onClick={() => handleRequestOpen('login')}>
      <Typography
        className={classes.paddingAbove}
              type="body1"
      >
        <a>Back</a>
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
