import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5 0'
  },
  accountLinks: {
    padding: '5 5 5'
  },
  divider: {
    borderRight: "1px solid",
    borderColor: theme.palette.text.divider
  },
  lowercaseText: {
    textTransform: 'capitalize',
    'cursor': 'pointer'
  },
  cursor: {
    cursor: 'pointer'
  }
});

const AccountNav = ({
  classes,
  session,
  handleLogOut,
  handleRequestOpen,
}) => (
  <div>

    {session && (
      <div className={classes.root}>
        <a
          className={[classes.divider, classes.accountLinks].join(' ')}
          href='/account'
        >
          <Typography type='body1' className={classes.lowercaseText}>
             Account Settings
          </Typography>
        </a>
        <a
          className={classes.accountLinks}
          href='/'
          onClick={handleLogOut}
        >
          <Typography type='body1' className={classes.lowercaseText} >
            Log Out
          </Typography>
        </a>
      </div>
    )}

    {!session && (
      <div className={classes.root}>
        <a
          className={[classes.divider, classes.accountLinks, classes.cursor].join(' ')}
          onClick={() => handleRequestOpen('login')}
        >
          <Typography type='body1' className={classes.lowercaseText}>
            Log In
          </Typography>
        </a>
        <a
          className={[classes.accountLinks, classes.cursor].join(' ')}
          onClick={() => handleRequestOpen('signup')}
        >
          <Typography type='body1' className={classes.lowercaseText} >
            Sign Up
          </Typography>
        </a>
      </div>
    )}

  </div>
);

AccountNav.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
};

export default withStyles(styles)(AccountNav);
