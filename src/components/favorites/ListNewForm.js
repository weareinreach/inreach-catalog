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
    textAlign: 'center',
  },
  spacingAbove: {marginTop: '3rem'},
});

const ListNewForm = ({classes, handleChange, handleSubmit, name, password}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Typography type="body1">
      Your favorites lists are only visible to you and anyone you share them
      with.
    </Typography>
    <TextField
      id="name"
      label="List name"
      margin="normal"
      helperText="You could name your list by category, by day of the week, or by the name of whoever this list is for."
      name="name"
      onChange={handleChange}
      required
      value={name}
    />
    <AsylumConnectButton className={classes.spacingAbove} variant="secondary">
      Create New List
    </AsylumConnectButton>
  </form>
);

ListNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListNewForm);
