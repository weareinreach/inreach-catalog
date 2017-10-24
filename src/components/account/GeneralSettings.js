import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Typography from 'material-ui/Typography';

// Define a custom style
const styles = theme => ({
});

const OrgSettings = (props) => {
  const classes = props.classes;
  return (
    <div>
      <Typography type="display3">Your Account</Typography>
    </div>
  );
}

export default withStyles(styles)(OrgSettings);
