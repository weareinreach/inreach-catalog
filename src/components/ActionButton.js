import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

// Define a custom style for button
const styles = theme => ({
  button: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '2em',
    fontWeight: 'bold',
    background: 'none',
    border: 'none'
  }
});

// Custom Button component with variant property
function ActionButton(props) {
  const {children, classes, onClick} = props;

  return (
    <Button className={classes.button} onClick={onClick}>
      {children}
    </Button>
  );
}

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

// Inject style to Custom Button component
export default withStyles(styles)(ActionButton);
