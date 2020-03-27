import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import config from '../../config/config.js';
import AsylumConnectButton from '../AsylumConnectButton';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  spacingAbove: {marginTop: '3rem'}
});

const ShareForm = ({classes, email, handleChange, handleSubmit, shareType}) => (
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
    <AsylumConnectButton className={classes.spacingAbove} variant="primary">
      Share {shareType === 'collection' ? 'List' : 'Resource'}
    </AsylumConnectButton>
  </form>
);

ShareForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(ShareForm);
