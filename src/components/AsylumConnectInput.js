import React from 'react';

import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';

// Define a custom style for button
const styles = theme => ({
  input: {
    border: 'none',
    boxShadow: '0px 0px 50px -10px rgba(0,0,0,0.45)',
    padding: '1.3rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize
  },
});

// Custom Button component with variant property
function AsylumConnectInput(props) {
  const { classes, className } = props;

  return (
    <Input {...props} disableUnderline={true} inputClassName={classNames(
        classes.input,
        className,
      )}
      
    />
  );
}

AsylumConnectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

// Inject style to Custom Input component
export default withStyles(styles)(AsylumConnectInput);
