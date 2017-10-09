import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    borderRight: "1px solid",
    borderColor: theme.palette.text.divider
  },
  lowercaseText: {
    textTransform: 'capitalize'
  }
});

const Account = ({classes, handleRequestOpen}) => (
  <div>
    <Button
      className={classes.divider}
      onClick={() => handleRequestOpen('login')}
    >
      <Typography type="body1" className={classes.lowercaseText}>
        Log In
      </Typography>
    </Button>
    <Button>
      <Typography type="body1" className={classes.lowercaseText}>
        Sign Up
      </Typography>
    </Button>
  </div>
);

Account.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
}

export default withStyles(styles)(Account);
