import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from 'material-ui/TextField';

// Define a custom style for button
const styles = theme => ({
  input: {
    border: 'none',
    boxShadow: '0px 0px 50px -10px rgba(0,0,0,0.45)',
    padding: '1.3rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize
  },
  primaryLabel: {
    color: theme.palette.primary[500]
  },
  primaryUnderline: {
    backgroundColor: theme.palette.primary[500]
  },
  secondaryLabel: {
    '&:focused': {
      color: theme.palette.secondary[500]+' !important'
    }
  },
  secondaryUnderline: {
    '&:after': {
      backgroundColor: theme.palette.secondary[500]
    }
  }
});

// Custom Button component with variant property
function AsylumConnectTextField(props) {
  const { classes, className } = props;
  let properties = Object.assign({}, props); console.log(properties);
  properties.classes = null;
  properties.children = null;

  return (
    <TextField {...properties} />
  );
}

AsylumConnectTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

// Inject style to Custom Input component
export default withStyles(styles)(AsylumConnectTextField);
